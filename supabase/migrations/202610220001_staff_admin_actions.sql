-- Apply in the Supabase SQL Editor as the project owner, after 202610020001_user_accounts_directory.sql.
-- Adds the Staff page actions: a richer account list, edit name and role, and delete.
-- Every function checks admin rights in auth.users on each call. No service-role key reaches the browser.
begin;

-- Is the caller an administrator? Read from the database, never from editable user metadata.
create or replace function public.is_console_admin()
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
      and caller.raw_app_meta_data ->> 'role' = 'admin'
  );
$$;

revoke all on function public.is_console_admin() from public, anon, authenticated;

-- One account as the Staff page sees it. Never returns passwords, tokens or other metadata.
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
    'email', coalesce(account.email, ''),
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

-- List: same signature as before, now with avatar, role and last sign-in.
create or replace function public.list_user_accounts(
  p_page integer default 1,
  p_page_size integer default 10
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
begin
  if not public.is_console_admin() then
    raise exception 'Only administrators may view user accounts.' using errcode = '42501';
  end if;

  if p_page is null or p_page < 1 or p_page_size is null
     or p_page_size < 1 or p_page_size > 100 then
    raise exception 'Invalid pagination parameters.' using errcode = '22023';
  end if;

  select count(*) into total_count
  from auth.users as account
  where account.deleted_at is null and account.is_anonymous is not true;

  current_page := least(p_page::bigint, greatest(1, (total_count + p_page_size - 1) / p_page_size))::integer;

  select coalesce(jsonb_agg(public.staff_account_json(account.id) order by account.created_at desc, account.id desc), '[]'::jsonb)
  into account_rows
  from (
    select id, created_at
    from auth.users
    where deleted_at is null and is_anonymous is not true
    order by created_at desc, id desc
    limit p_page_size offset ((current_page::bigint - 1) * p_page_size)
  ) as account;

  return jsonb_build_object('users', account_rows, 'count', total_count, 'page', current_page);
end;
$$;

revoke all on function public.list_user_accounts(integer, integer) from public, anon, authenticated;
grant execute on function public.list_user_accounts(integer, integer) to authenticated;

-- Edit: change a person's name and role ('admin' or 'staff').
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
      raw_app_meta_data = case
        when p_role = 'admin' then coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
        else coalesce(raw_app_meta_data, '{}'::jsonb) - 'role'
      end,
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

-- Delete: remove an account for good. Admins cannot delete themselves.
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

commit;
