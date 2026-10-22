-- More house rules: check-in and check-out times, website bookings and a booking window.
-- Run this whole file once in the Supabase SQL Editor.

begin;

alter table public.settings
  add column if not exists "checkInTime" text not null default '15:00',
  add column if not exists "checkOutTime" text not null default '11:00',
  add column if not exists "acceptOnlineBookings" boolean not null default true,
  add column if not exists "bookingWindowDays" integer not null default 365,
  add column if not exists "updatedAt" timestamptz not null default now();

alter table public.settings drop constraint if exists settings_check_in_time_format;
alter table public.settings drop constraint if exists settings_check_out_time_format;
alter table public.settings drop constraint if exists settings_check_out_before_check_in;
alter table public.settings drop constraint if exists settings_booking_window_range;

alter table public.settings
  add constraint settings_check_in_time_format check ("checkInTime" ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  add constraint settings_check_out_time_format check ("checkOutTime" ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  add constraint settings_check_out_before_check_in check ("checkOutTime" < "checkInTime"),
  add constraint settings_booking_window_range check ("bookingWindowDays" between 30 and 730);

create or replace function public.stamp_settings_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if public.is_demo_account() and (
    new."acceptOnlineBookings" is distinct from old."acceptOnlineBookings"
    or new."bookingWindowDays" is distinct from old."bookingWindowDays"
  ) then
    raise exception 'Website booking settings are turned off in the demo.' using errcode = 'DL403';
  end if;

  new."updatedAt" := now();
  return new;
end;
$$;

revoke all on function public.stamp_settings_update() from public, anon, authenticated;

drop trigger if exists stamp_settings_update on public.settings;
create trigger stamp_settings_update
  before update on public.settings
  for each row execute function public.stamp_settings_update();

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

  if not setting."acceptOnlineBookings" then
    raise exception 'Online bookings are paused right now. Please contact the hotel to reserve.' using errcode = 'DL503';
  end if;

  if p_start_date is null or p_end_date is null or p_start_date < current_date then
    raise exception 'Choose an arrival date from today onwards.' using errcode = '22023';
  end if;

  if p_start_date > current_date + setting."bookingWindowDays" then
    raise exception 'Bookings open % days ahead. Choose an arrival on or before %.', setting."bookingWindowDays", to_char(current_date + setting."bookingWindowDays", 'FMDD Mon YYYY') using errcode = '22023';
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
      "breakfastPrice" = excluded."breakfastPrice",
      "checkInTime" = excluded."checkInTime",
      "checkOutTime" = excluded."checkOutTime",
      "acceptOnlineBookings" = excluded."acceptOnlineBookings",
      "bookingWindowDays" = excluded."bookingWindowDays";

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

commit;
