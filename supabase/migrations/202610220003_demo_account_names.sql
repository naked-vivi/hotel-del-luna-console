begin;

update public.demo_accounts set full_name = 'Viviana' where email = 'admin@hoteldelluna.com';
update public.demo_accounts set full_name = 'Bubu' where email = 'staff@hoteldelluna.com';

update auth.users as account
set raw_user_meta_data = coalesce(account.raw_user_meta_data, '{}'::jsonb) || jsonb_build_object('fullName', demo.full_name),
    updated_at = now()
from public.demo_accounts as demo
where lower(account.email) = lower(demo.email);

with ordered as (
  select id, image, row_number() over (order by name) as position, count(*) over () as total
  from public.cabins
  where image is not null and image <> ''
)
update public.cabins as cabin
set images = array[current.image] || array(
  select other.image
  from ordered as other
  where other.position in ((current.position % current.total) + 1, ((current.position + 1) % current.total) + 1)
    and other.id <> current.id
  order by other.position
)
from ordered as current
where cabin.id = current.id
  and coalesce(cardinality(cabin.images), 0) <= 1;

select public.save_demo_snapshot();

commit;
