begin;

do $$
begin
  if not exists (select 1 from pg_extension where extname = 'pg_cron') then
    raise exception 'Turn on pg_cron first: Database → Extensions → pg_cron.';
  end if;
end $$;

create table if not exists public.demo_accounts (
  email text primary key,
  full_name text not null,
  role text not null check (role in ('admin', 'staff'))
);

alter table public.demo_accounts enable row level security;
revoke all on public.demo_accounts from anon, authenticated;

delete from public.demo_accounts where true;
insert into public.demo_accounts (email, full_name, role) values
  ('admin@hoteldelluna.com', 'Viviana', 'admin'),
  ('staff@hoteldelluna.com', 'Bubu', 'staff');

do $$
begin
  if (select count(*) from auth.users as account join public.demo_accounts as demo on lower(account.email) = lower(demo.email))
     < (select count(*) from public.demo_accounts) then
    raise exception 'Create both demo users first: Authentication → Users → Add user.';
  end if;

  if not exists (select 1 from public.bookings) then
    raise exception 'Load the sample data first: sidebar → Sample data → Everything.';
  end if;
end $$;

update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"staff"}'::jsonb,
    updated_at = now()
where deleted_at is null
  and is_anonymous is not true
  and raw_app_meta_data ->> 'provider' = 'email'
  and coalesce(raw_app_meta_data ->> 'role', '') not in ('admin', 'staff');

update auth.users as account
set raw_app_meta_data = coalesce(account.raw_app_meta_data, '{}'::jsonb)
      || jsonb_build_object('role', demo.role, 'demo', true),
    raw_user_meta_data = coalesce(account.raw_user_meta_data, '{}'::jsonb)
      || jsonb_build_object('fullName', demo.full_name, 'avatar', ''),
    updated_at = now()
from public.demo_accounts as demo
where lower(account.email) = lower(demo.email);

grant execute on function public.is_console_admin() to authenticated;

create or replace function public.is_staff_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select auth.uid() is not null and exists (
    select 1 from auth.users as caller
    where caller.id = auth.uid()
      and caller.deleted_at is null
      and caller.raw_app_meta_data ->> 'role' in ('admin', 'staff')
  );
$$;

revoke all on function public.is_staff_member() from public, anon;
grant execute on function public.is_staff_member() to authenticated;

create or replace function public.is_demo_account()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select auth.uid() is not null and exists (
    select 1 from auth.users as caller
    where caller.id = auth.uid()
      and caller.raw_app_meta_data ->> 'demo' = 'true'
  );
$$;

revoke all on function public.is_demo_account() from public, anon;
grant execute on function public.is_demo_account() to authenticated;

create or replace function public.mask_email(p_email text)
returns text
language sql
immutable
set search_path = ''
as $$
  select case
    when p_email is null or position('@' in p_email) = 0 then coalesce(p_email, '')
    else left(split_part(p_email, '@', 1), 2) || '•••@' || split_part(p_email, '@', 2)
  end;
$$;

create or replace function public.protect_demo_accounts()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if coalesce(old.raw_app_meta_data ->> 'demo', '') = 'true'
     and (new.encrypted_password is distinct from old.encrypted_password
          or new.email is distinct from old.email) then
    raise exception 'Demo accounts cannot change their email or password.';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_demo_accounts on auth.users;
create trigger protect_demo_accounts
  before update on auth.users
  for each row execute function public.protect_demo_accounts();

alter table public.guests
  add column if not exists "userId" uuid references auth.users (id) on delete set null;

create unique index if not exists guests_user_id_key on public.guests ("userId") where "userId" is not null;

alter table public.bookings
  add column if not exists source text not null default 'front-desk';

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'bookings_source_check') then
    alter table public.bookings
      add constraint bookings_source_check check (source in ('front-desk', 'website'));
  end if;
end $$;

alter table public.cabins
  add column if not exists images text[] default '{}',
  add column if not exists amenities text[] default '{}',
  add column if not exists "bedType" text,
  add column if not exists size integer;

update public.cabins
set images = array[image]
where image is not null and coalesce(cardinality(images), 0) = 0;

update public.cabins as cabin
set amenities = seed.amenities, "bedType" = seed.bed_type, size = seed.size
from (values
  ('001', array['wifi', 'fireplace', 'kitchen', 'hot-tub', 'private-deck', 'spa-bath', 'forest-view'], 'King', 35),
  ('002', array['wifi', 'fireplace', 'kitchen', 'hot-tub', 'private-deck', 'spa-bath', 'forest-view'], 'King', 38),
  ('003', array['wifi', 'fireplace', 'kitchen', 'hot-tub', 'private-deck', 'spa-bath'], 'King + twin beds', 55),
  ('004', array['wifi', 'fireplace', 'kitchen', 'hot-tub', 'private-deck', 'spa-bath', 'forest-view'], 'King + twin beds', 60),
  ('005', array['wifi', 'fireplace', 'kitchen', 'hot-tub', 'private-deck'], 'Multiple bedrooms', 80),
  ('006', array['wifi', 'fireplace', 'kitchen', 'hot-tub', 'private-deck', 'spa-bath'], 'Multiple bedrooms', 90),
  ('007', array['wifi', 'fireplace', 'kitchen', 'hot-tub', 'private-deck', 'forest-view', 'mountain-view'], 'Multiple bedrooms', 120),
  ('008', array['wifi', 'fireplace', 'kitchen', 'hot-tub', 'private-deck', 'spa-bath', 'dining-room', 'mountain-view'], 'Multiple bedrooms', 160)
) as seed(name, amenities, bed_type, size)
where cabin.name = seed.name and coalesce(cardinality(cabin.amenities), 0) = 0;

do $$
declare
  existing record;
begin
  for existing in
    select policyname, tablename from pg_policies
    where schemaname = 'public' and tablename in ('cabins', 'bookings', 'guests', 'settings')
  loop
    execute format('drop policy %I on public.%I', existing.policyname, existing.tablename);
  end loop;
end $$;

alter table public.cabins enable row level security;
alter table public.bookings enable row level security;
alter table public.guests enable row level security;
alter table public.settings enable row level security;

create policy "Anyone can read cabins" on public.cabins
  for select to anon, authenticated using (true);
create policy "Admins can add cabins" on public.cabins
  for insert to authenticated with check ((select public.is_console_admin()));
create policy "Admins can edit cabins" on public.cabins
  for update to authenticated using ((select public.is_console_admin())) with check ((select public.is_console_admin()));
create policy "Admins can delete cabins" on public.cabins
  for delete to authenticated using ((select public.is_console_admin()));

create policy "Anyone can read settings" on public.settings
  for select to anon, authenticated using (true);
create policy "Admins can change settings" on public.settings
  for update to authenticated using ((select public.is_console_admin())) with check ((select public.is_console_admin()));

create policy "Staff read all guests, customers read their own" on public.guests
  for select to authenticated
  using ((select public.is_staff_member()) or "userId" = (select auth.uid()));
create policy "Staff add guests, customers add their own" on public.guests
  for insert to authenticated
  with check ((select public.is_staff_member()) or "userId" = (select auth.uid()));
create policy "Staff edit guests, customers edit their own" on public.guests
  for update to authenticated
  using ((select public.is_staff_member()) or "userId" = (select auth.uid()))
  with check ((select public.is_staff_member()) or "userId" = (select auth.uid()));
create policy "Admins can delete guests" on public.guests
  for delete to authenticated using ((select public.is_console_admin()));

create policy "Staff read all bookings, customers read their own" on public.bookings
  for select to authenticated
  using (
    (select public.is_staff_member())
    or exists (
      select 1 from public.guests as guest
      where guest.id = bookings."guestId" and guest."userId" = (select auth.uid())
    )
  );
create policy "Staff can add bookings" on public.bookings
  for insert to authenticated with check ((select public.is_staff_member()));
create policy "Staff can edit bookings" on public.bookings
  for update to authenticated using ((select public.is_staff_member())) with check ((select public.is_staff_member()));
create policy "Admins can delete bookings" on public.bookings
  for delete to authenticated using ((select public.is_console_admin()));

create or replace function public.get_cabin_availability(
  p_cabin_id bigint,
  p_from date default current_date,
  p_to date default current_date + 365,
  p_exclude_booking_id bigint default null
)
returns table (start_date date, end_date date)
language sql
stable
security definer
set search_path = ''
as $$
  select booking."startDate"::date, booking."endDate"::date
  from public.bookings as booking
  where booking."cabinId" = p_cabin_id
    and booking."startDate"::date < p_to
    and booking."endDate"::date > p_from
    and (p_exclude_booking_id is null or booking.id <> p_exclude_booking_id)
  order by booking."startDate";
$$;

revoke all on function public.get_cabin_availability(bigint, date, date, bigint) from public;
grant execute on function public.get_cabin_availability(bigint, date, date, bigint) to anon, authenticated;

create or replace function public.create_reservation(
  p_cabin_id bigint,
  p_start_date date,
  p_end_date date,
  p_num_guests integer,
  p_has_breakfast boolean default false,
  p_observations text default null,
  p_nationality text default null,
  p_country_code text default null,
  p_national_id text default null
)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  caller auth.users;
  cabin public.cabins;
  setting public.settings;
  nights integer;
  flag_url text;
  guest_id bigint;
  cabin_price numeric;
  extras_price numeric;
  booking_id bigint;
begin
  if auth.uid() is null then
    raise exception 'Sign in to make a reservation.' using errcode = '42501';
  end if;

  select * into caller from auth.users where id = auth.uid();

  select * into cabin from public.cabins where id = p_cabin_id;
  if not found then
    raise exception 'That cabin does not exist.' using errcode = 'P0002';
  end if;

  select * into setting from public.settings order by id limit 1;

  if p_start_date is null or p_end_date is null or p_start_date < current_date then
    raise exception 'Choose an arrival date from today onwards.' using errcode = '22023';
  end if;

  nights := p_end_date - p_start_date;

  if nights < setting."minBookingLength" or nights > setting."maxBookingLength" then
    raise exception 'Stays must be between % and % nights.', setting."minBookingLength", setting."maxBookingLength" using errcode = '22023';
  end if;

  if p_num_guests is null or p_num_guests < 1 or p_num_guests > least(cabin."maxCapacity", setting."maxGuestsPerBooking") then
    raise exception 'This cabin sleeps up to % guests.', least(cabin."maxCapacity", setting."maxGuestsPerBooking") using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(p_cabin_id);

  if exists (
    select 1 from public.bookings as booking
    where booking."cabinId" = p_cabin_id
      and booking."startDate"::date < p_end_date
      and booking."endDate"::date > p_start_date
  ) then
    raise exception 'Those dates are no longer available.' using errcode = 'DL409';
  end if;

  flag_url := case
    when p_country_code ~ '^[A-Za-z]{2}$' then 'https://flagcdn.com/' || lower(p_country_code) || '.svg'
  end;

  select id into guest_id from public.guests where "userId" = auth.uid();

  if guest_id is null then
    insert into public.guests ("fullName", email, nationality, "countryFlag", "nationalID", "userId")
    values (
      coalesce(caller.raw_user_meta_data ->> 'full_name', caller.raw_user_meta_data ->> 'name', caller.raw_user_meta_data ->> 'fullName', caller.email),
      caller.email,
      p_nationality,
      flag_url,
      p_national_id,
      auth.uid()
    )
    returning id into guest_id;
  else
    update public.guests
    set nationality = coalesce(p_nationality, nationality),
        "countryFlag" = coalesce(flag_url, "countryFlag"),
        "nationalID" = coalesce(p_national_id, "nationalID")
    where id = guest_id;
  end if;

  cabin_price := nights * (cabin."regularPrice" - coalesce(cabin.discount, 0));
  extras_price := case when coalesce(p_has_breakfast, false) then nights * setting."breakfastPrice" * p_num_guests else 0 end;

  insert into public.bookings (
    "cabinId", "guestId", "startDate", "endDate", "numNights", "numGuests",
    "cabinPrice", "extrasPrice", "totalPrice", "hasBreakfast", "isPaid", status, observations, source
  )
  values (
    p_cabin_id, guest_id, p_start_date, p_end_date, nights, p_num_guests,
    cabin_price, extras_price, cabin_price + extras_price, coalesce(p_has_breakfast, false), false, 'unconfirmed', p_observations, 'website'
  )
  returning id into booking_id;

  return booking_id;
end;
$$;

revoke all on function public.create_reservation(bigint, date, date, integer, boolean, text, text, text, text) from public, anon;
grant execute on function public.create_reservation(bigint, date, date, integer, boolean, text, text, text, text) to authenticated;

create or replace function public.staff_account_json(p_user_id uuid)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'id', account.id,
    'fullName', coalesce(account.raw_user_meta_data ->> 'fullName', ''),
    'email', case
      when public.is_demo_account() and coalesce(account.raw_app_meta_data ->> 'demo', '') <> 'true'
        then public.mask_email(account.email)
      else coalesce(account.email, '')
    end,
    'avatar', coalesce(account.raw_user_meta_data ->> 'avatar', ''),
    'role', case when account.raw_app_meta_data ->> 'role' = 'admin' then 'admin' else 'staff' end,
    'createdAt', account.created_at,
    'lastSignInAt', account.last_sign_in_at,
    'emailConfirmed', account.email_confirmed_at is not null
  )
  from auth.users as account
  where account.id = p_user_id;
$$;

revoke all on function public.staff_account_json(uuid) from public, anon, authenticated;

drop function if exists public.list_user_accounts(integer, integer);

create or replace function public.list_user_accounts(
  p_page integer default 1,
  p_page_size integer default 10,
  p_search text default null,
  p_role text default null
)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  total_count bigint;
  current_page integer;
  account_rows jsonb;
  search_pattern text;
begin
  if not public.is_console_admin() then
    raise exception 'Only administrators may view user accounts.' using errcode = '42501';
  end if;

  if p_page is null or p_page < 1 or p_page_size is null
     or p_page_size < 1 or p_page_size > 100 then
    raise exception 'Invalid pagination parameters.' using errcode = '22023';
  end if;

  if p_role is not null and p_role not in ('admin', 'staff') then
    raise exception 'Choose a role: admin or staff.' using errcode = '22023';
  end if;

  search_pattern := case
    when nullif(trim(coalesce(p_search, '')), '') is null then null
    else '%' || replace(replace(replace(trim(p_search), '\', '\\'), '%', '\%'), '_', '\_') || '%'
  end;

  select count(*) into total_count
  from auth.users as account
  where account.deleted_at is null
    and account.is_anonymous is not true
    and account.raw_app_meta_data ->> 'role' in ('admin', 'staff')
    and (p_role is null or account.raw_app_meta_data ->> 'role' = p_role)
    and (search_pattern is null
         or coalesce(account.raw_user_meta_data ->> 'fullName', '') ilike search_pattern
         or coalesce(account.email, '') ilike search_pattern);

  current_page := least(p_page::bigint, greatest(1, (total_count + p_page_size - 1) / p_page_size))::integer;

  select coalesce(jsonb_agg(public.staff_account_json(account.id) order by account.created_at desc, account.id desc), '[]'::jsonb)
  into account_rows
  from (
    select id, created_at
    from auth.users as candidate
    where candidate.deleted_at is null
      and candidate.is_anonymous is not true
      and candidate.raw_app_meta_data ->> 'role' in ('admin', 'staff')
      and (p_role is null or candidate.raw_app_meta_data ->> 'role' = p_role)
      and (search_pattern is null
           or coalesce(candidate.raw_user_meta_data ->> 'fullName', '') ilike search_pattern
           or coalesce(candidate.email, '') ilike search_pattern)
    order by created_at desc, id desc
    limit p_page_size offset ((current_page::bigint - 1) * p_page_size)
  ) as account;

  return jsonb_build_object('users', account_rows, 'count', total_count, 'page', current_page);
end;
$$;

revoke all on function public.list_user_accounts(integer, integer, text, text) from public, anon, authenticated;
grant execute on function public.list_user_accounts(integer, integer, text, text) to authenticated;

create or replace function public.update_user_account(
  p_user_id uuid,
  p_full_name text,
  p_role text
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_id uuid;
begin
  if not public.is_console_admin() then
    raise exception 'Only administrators may edit staff accounts.' using errcode = '42501';
  end if;

  if public.is_demo_account() then
    raise exception 'Editing staff is turned off in the demo.' using errcode = 'DL403';
  end if;

  if p_full_name is null or length(trim(p_full_name)) = 0 or length(trim(p_full_name)) > 120 then
    raise exception 'Enter a full name of up to 120 characters.' using errcode = '22023';
  end if;

  if p_role is null or p_role not in ('admin', 'staff') then
    raise exception 'Choose a role: admin or staff.' using errcode = '22023';
  end if;

  if p_user_id = auth.uid() and p_role <> 'admin' then
    raise exception 'You cannot remove your own admin access.' using errcode = '22023';
  end if;

  update auth.users
  set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('fullName', trim(p_full_name)),
      raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', p_role),
      updated_at = now()
  where id = p_user_id and deleted_at is null
  returning id into updated_id;

  if updated_id is null then
    raise exception 'That account no longer exists.' using errcode = 'P0002';
  end if;

  return public.staff_account_json(updated_id);
end;
$$;

revoke all on function public.update_user_account(uuid, text, text) from public, anon, authenticated;
grant execute on function public.update_user_account(uuid, text, text) to authenticated;

create or replace function public.delete_user_account(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_console_admin() then
    raise exception 'Only administrators may delete staff accounts.' using errcode = '42501';
  end if;

  if public.is_demo_account() then
    raise exception 'Deleting staff is turned off in the demo.' using errcode = 'DL403';
  end if;

  if p_user_id = auth.uid() then
    raise exception 'You cannot delete your own account.' using errcode = '22023';
  end if;

  delete from auth.users where id = p_user_id;

  if not found then
    raise exception 'That account no longer exists.' using errcode = 'P0002';
  end if;
end;
$$;

revoke all on function public.delete_user_account(uuid) from public, anon, authenticated;
grant execute on function public.delete_user_account(uuid) to authenticated;

create table if not exists public.demo_snapshot (
  id integer primary key default 1 check (id = 1),
  taken_on date not null,
  cabins jsonb not null,
  guests jsonb not null,
  bookings jsonb not null,
  settings jsonb not null
);

alter table public.demo_snapshot enable row level security;
revoke all on public.demo_snapshot from anon, authenticated;

create or replace function public.save_demo_snapshot()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.demo_snapshot (id, taken_on, cabins, guests, bookings, settings)
  values (
    1,
    current_date,
    (select coalesce(jsonb_agg(to_jsonb(cabin)), '[]'::jsonb) from public.cabins as cabin),
    (select coalesce(jsonb_agg(to_jsonb(guest)), '[]'::jsonb) from public.guests as guest where guest."userId" is null),
    (select coalesce(jsonb_agg(to_jsonb(booking)), '[]'::jsonb) from public.bookings as booking where booking.source <> 'website'),
    (select coalesce(jsonb_agg(to_jsonb(setting)), '[]'::jsonb) from public.settings as setting)
  )
  on conflict (id) do update
  set taken_on = excluded.taken_on,
      cabins = excluded.cabins,
      guests = excluded.guests,
      bookings = excluded.bookings,
      settings = excluded.settings;
end;
$$;

revoke all on function public.save_demo_snapshot() from public, anon, authenticated;

create or replace function public.reset_demo_data()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  snapshot public.demo_snapshot;
  shift interval;
begin
  select * into snapshot from public.demo_snapshot where id = 1;
  if not found then
    return;
  end if;

  shift := make_interval(days => current_date - snapshot.taken_on);

  delete from public.bookings where source <> 'website';

  insert into public.settings overriding system value
    select * from jsonb_populate_recordset(null::public.settings, snapshot.settings)
  on conflict (id) do update
  set "minBookingLength" = excluded."minBookingLength",
      "maxBookingLength" = excluded."maxBookingLength",
      "maxGuestsPerBooking" = excluded."maxGuestsPerBooking",
      "breakfastPrice" = excluded."breakfastPrice";

  insert into public.cabins overriding system value
    select * from jsonb_populate_recordset(null::public.cabins, snapshot.cabins)
  on conflict (id) do update
  set name = excluded.name,
      "maxCapacity" = excluded."maxCapacity",
      "regularPrice" = excluded."regularPrice",
      discount = excluded.discount,
      description = excluded.description,
      image = excluded.image,
      images = excluded.images,
      amenities = excluded.amenities,
      "bedType" = excluded."bedType",
      size = excluded.size;

  insert into public.guests overriding system value
    select * from jsonb_populate_recordset(null::public.guests, snapshot.guests)
  on conflict (id) do update
  set "fullName" = excluded."fullName",
      email = excluded.email,
      nationality = excluded.nationality,
      "nationalID" = excluded."nationalID",
      "countryFlag" = excluded."countryFlag";

  delete from public.cabins as cabin
  where not exists (select 1 from jsonb_array_elements(snapshot.cabins) as item where (item ->> 'id')::bigint = cabin.id)
    and not exists (select 1 from public.bookings as booking where booking."cabinId" = cabin.id);

  delete from public.guests as guest
  where guest."userId" is null
    and not exists (select 1 from jsonb_array_elements(snapshot.guests) as item where (item ->> 'id')::bigint = guest.id)
    and not exists (select 1 from public.bookings as booking where booking."guestId" = guest.id);

  drop table if exists pg_temp.demo_reset_bookings;
  create temporary table demo_reset_bookings (like public.bookings) on commit drop;

  insert into pg_temp.demo_reset_bookings
    select * from jsonb_populate_recordset(null::public.bookings, snapshot.bookings);

  update pg_temp.demo_reset_bookings
  set "startDate" = "startDate" + shift,
      "endDate" = "endDate" + shift,
      created_at = created_at + shift;

  delete from pg_temp.demo_reset_bookings as candidate
  where exists (
    select 1 from public.bookings as kept
    where kept."cabinId" = candidate."cabinId"
      and kept."startDate" < candidate."endDate"
      and kept."endDate" > candidate."startDate"
  );

  insert into public.bookings overriding system value
    select * from pg_temp.demo_reset_bookings;

  update auth.users as account
  set raw_user_meta_data = coalesce(account.raw_user_meta_data, '{}'::jsonb)
        || jsonb_build_object('fullName', demo.full_name, 'avatar', '')
  from public.demo_accounts as demo
  where lower(account.email) = lower(demo.email);
end;
$$;

revoke all on function public.reset_demo_data() from public, anon, authenticated;

select public.save_demo_snapshot();

select cron.schedule('reset-demo-data', '5 0 * * *', 'select public.reset_demo_data()');

commit;
