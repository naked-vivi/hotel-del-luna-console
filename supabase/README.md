# Roles, demo accounts and cabin details

Run once, after the Staff page setup below.

1. **Turn on pg_cron:** Database → Extensions → search `pg_cron` → enable.
2. **Create the two demo users:** Authentication → Users → Add user → Create new user.
   Tick **Auto Confirm User** for both.
   - `admin@hoteldelluna.com` · password `Demo1234$` (Admin, Viviana)
   - `staff@hoteldelluna.com` · password `Demo1234$` (Staff, Bubu)
3. **Reload the sample data:** run the app, then sidebar → Sample data → Everything.
   This becomes the demo baseline.
4. **Run the script:** SQL Editor → New query → paste and run
   `migrations/202610220002_roles_demo_and_cabin_details.sql`.

What it does:

- Every existing email-and-password account becomes `staff` unless it is already
  `admin`. Google sign-ins from the website stay customers with no role.
- Database rules: only staff and admins can see guests and bookings. Only admins
  add, edit or delete cabins, delete bookings or guests, and change settings.
  Customers can see their own guest record and their own bookings.
- Marks the two demo users. Demo accounts can't change their email or password,
  can't edit or delete staff, and see other people's emails masked.
- Adds photos, amenities, bed type and size to cabins, and fills them in for the
  sample cabins. Adds `source` to bookings (`front-desk` or `website`) and
  `userId` to guests.
- Staff list search by name or email, and a role filter. Customers never appear in it.
- Saves today's data as the demo baseline and resets to it every day at 00:05 UTC,
  with booking dates moved forward. Website reservations and website guests are kept.

To keep changes you make on purpose (for example new cabin photos), save them as
the new baseline in the SQL Editor:

```sql
select public.save_demo_snapshot();
```

## House rules: arrival times and website bookings

Run once, after the script above. SQL Editor → New query → paste and run
`migrations/202610230001_more_house_rules.sql`.

What it does:

- Adds check-in and check-out times, an on/off switch for website bookings and a
  booking window (how many days ahead guests can book online) to `settings`.
- `create_reservation` refuses website bookings while the switch is off, and
  arrivals further ahead than the booking window.
- Demo accounts can't change the website switch or the booking window.
- Records when the settings were last saved, keeps the new rules in the daily demo
  reset, and saves today's data as the demo baseline.

## For the website (Next.js)

The website shares this database. Customers sign in with Google first.

- Read `cabins` and `settings` directly. Anyone can read them.
- Booked dates for a cabin, without guest details:
  `supabase.rpc("get_cabin_availability", { p_cabin_id, p_from, p_to })`
  returns `{ start_date, end_date }[]`.
- Make a reservation (signed in):
  `supabase.rpc("create_reservation", { p_cabin_id, p_start_date, p_end_date, p_num_guests,
  p_has_breakfast, p_observations, p_nationality, p_country_code, p_national_id })`
  returns the new booking id. The database checks the dates are free and within
  the stay limits, works out the price, links the guest to the signed-in customer,
  and saves it as unconfirmed and unpaid with `source = 'website'`.
  Taken dates fail with error code `DL409`.
- A customer's own bookings: `supabase.from("bookings").select("*, cabins(*)")`
  returns only theirs.
- Customers can't insert or edit bookings directly, so prices can't be changed
  from the browser.

---


# Staff page setup

The Staff page lists every account in a table. Administrators can view details,
edit a person's name and role, delete an account, and add new staff.

## Staff page actions (run once, after the steps below)

1. Complete the one-time setup below first, so you have an admin account.
2. Open your Supabase project → SQL Editor → New query.
3. Paste and run `migrations/202610220001_staff_admin_actions.sql`.

It adds three admin-only database functions and upgrades the list:

- `list_user_accounts` also returns each person's photo, role and last sign-in.
- `update_user_account` changes a person's name and role (`admin` or `staff`).
- `delete_user_account` removes an account.

Each function checks the caller's admin role in `auth.users` on every call.
Admins cannot delete their own account or remove their own admin role, so no one
can lock themselves out. Until this script runs, the page shows a note saying the
action isn't set up yet.

---

# User accounts list setup

The account list below is the original read-only directory.
The database permits only administrators to read that list. It returns names,
emails, creation dates, and email-confirmation status. Existing accounts are
included automatically; no copying or backfill is needed.

## One-time Supabase setup

1. Open your Supabase project → SQL Editor → New query.
2. Paste and run `migrations/202610020001_user_accounts_directory.sql`.
3. Open Authentication → Users and copy the **User UID** of your own trusted
   administrator account.
4. In the SQL Editor, replace `ADMIN_USER_UUID` below with that UID, then run:

```sql
update auth.users
set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
  || '{"role":"admin"}'::jsonb
where id = 'ADMIN_USER_UUID'::uuid
returning id, email, raw_app_meta_data ->> 'role' as role;
```

Confirm the returned email is the intended administrator. This preserves other
app metadata. Do not use `raw_user_meta_data` for permissions: users can edit it.
The new directory checks the database on every request, so click Refresh on the
Users page after setup. No new Vercel environment variables or service-role key
are required.

This permission applies to viewing the directory only. The existing signup form
still follows the app's existing access rules.

## Verification

- As an administrator, visit `/users`: accounts appear below the form, newest first.
- Create a user through the existing form: the list refreshes. Pending confirmation
  means the email has not been confirmed; it is not a statement about whether the
  account is otherwise allowed to sign in.
- As a non-admin account, the list reports that you do not have permission.
- The function rejects anonymous callers and denies non-admin authenticated callers.
- Changing an account's `user_metadata.role` does not grant directory access.

To revoke directory access, remove the admin role in the SQL Editor:

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data - 'role'
where id = 'ADMIN_USER_UUID'::uuid;
```

The function uses an empty search path, explicitly qualified tables, bounded
pagination, and a fixed set of output fields. It does not grant browser clients
access to the `auth.users` table or require an admin secret in client code.

References: [Supabase database functions](https://supabase.com/docs/guides/database/functions),
[Supabase user management](https://supabase.com/docs/guides/auth/managing-user-data).
