-- Roles are authorization data and must only be changed by the service-role API.
reset role;

revoke update on table public.profiles from authenticated;
grant update (email, first_name, last_name, country, onboarding, updated_at)
  on table public.profiles to authenticated;
