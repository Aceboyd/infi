-- Public profile records are safe to view in the Supabase Table Editor.
-- Authentication credentials remain private in auth.users.
-- The Supabase SQL Editor may retain an application role such as `authenticated`.
-- Reset to its database-owner session role before applying this schema migration.
reset role;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text,
  last_name text,
  country text,
  onboarding jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

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

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- One-time backfill: this also adds users created before the trigger existed.
insert into public.profiles (id, email, first_name, last_name, country, onboarding)
select
  id,
  email,
  raw_user_meta_data ->> 'first_name',
  raw_user_meta_data ->> 'last_name',
  raw_user_meta_data ->> 'country',
  coalesce(raw_user_meta_data -> 'onboarding', '{}'::jsonb)
from auth.users
on conflict (id) do nothing;
