-- Apply this migration to existing projects that already ran the profiles migration.
reset role;

alter table public.profiles
  add column if not exists onboarding jsonb not null default '{}'::jsonb;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, first_name, last_name, country, onboarding)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'country',
    coalesce(new.raw_user_meta_data -> 'onboarding', '{}'::jsonb)
  )
  on conflict (id) do update set
    email = excluded.email,
    first_name = excluded.first_name,
    last_name = excluded.last_name,
    country = excluded.country,
    onboarding = excluded.onboarding,
    updated_at = now();
  return new;
end;
$$;
