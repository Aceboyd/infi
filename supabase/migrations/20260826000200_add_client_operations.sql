reset role;

alter table public.profiles add column if not exists role text not null default 'user'
  check (role in ('user', 'admin'));

create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles(id) on delete cascade,
  currency text not null default 'USD',
  available_balance numeric(14,2) not null default 0 check (available_balance >= 0),
  credit_limit numeric(14,2) not null default 0 check (credit_limit >= 0),
  kyc_status text not null default 'not_started' check (kyc_status in ('not_started', 'pending', 'verified', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null check (kind in ('deposit', 'withdrawal', 'kyc', 'loan', 'credit', 'card')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  amount numeric(14,2) check (amount is null or amount > 0),
  currency text not null default 'USD',
  details jsonb not null default '{}'::jsonb,
  admin_note text,
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.account_transactions (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references public.accounts(id) on delete cascade,
  request_id uuid unique references public.service_requests(id) on delete set null,
  direction text not null check (direction in ('credit', 'debit')),
  amount numeric(14,2) not null check (amount > 0),
  description text not null,
  created_at timestamptz not null default now()
);

alter table public.accounts enable row level security;
alter table public.service_requests enable row level security;
alter table public.account_transactions enable row level security;

revoke all on public.accounts, public.service_requests, public.account_transactions from anon, authenticated;
grant select on public.accounts, public.service_requests, public.account_transactions to authenticated;
grant select on public.profiles to authenticated;

create policy "Users can view their own account" on public.accounts for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can view their own service requests" on public.service_requests for select to authenticated using ((select auth.uid()) = user_id);
create policy "Users can view their own transactions" on public.account_transactions for select to authenticated using (account_id in (select id from public.accounts where user_id = (select auth.uid())));

create or replace function public.create_client_account()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.accounts (user_id) values (new.id) on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_profile_created on public.profiles;
create trigger on_profile_created after insert on public.profiles for each row execute procedure public.create_client_account();
insert into public.accounts (user_id) select id from public.profiles on conflict (user_id) do nothing;

create or replace function public.review_service_request(request_id uuid, decision text, note text default null, reviewer_id uuid default null)
returns public.service_requests language plpgsql security definer set search_path = '' as $$
declare req public.service_requests; acct public.accounts;
begin
  if decision not in ('approved', 'rejected') then raise exception 'Invalid decision'; end if;
  select * into req from public.service_requests where id = request_id for update;
  if not found then raise exception 'Request not found'; end if;
  if req.status <> 'pending' then raise exception 'Request has already been reviewed'; end if;
  select * into acct from public.accounts where user_id = req.user_id for update;
  if decision = 'approved' and req.kind = 'withdrawal' and (req.amount is null or acct.available_balance < req.amount) then raise exception 'Insufficient available balance'; end if;
  update public.service_requests set status = decision, admin_note = note, reviewed_by = reviewer_id, reviewed_at = now() where id = request_id returning * into req;
  if decision = 'approved' and req.kind = 'deposit' then
    update public.accounts set available_balance = available_balance + req.amount, updated_at = now() where id = acct.id;
    insert into public.account_transactions (account_id, request_id, direction, amount, description) values (acct.id, req.id, 'credit', req.amount, 'Approved deposit');
  elsif decision = 'approved' and req.kind = 'withdrawal' then
    update public.accounts set available_balance = available_balance - req.amount, updated_at = now() where id = acct.id;
    insert into public.account_transactions (account_id, request_id, direction, amount, description) values (acct.id, req.id, 'debit', req.amount, 'Approved withdrawal');
  elsif decision = 'approved' and req.kind = 'credit' then
    update public.accounts set credit_limit = coalesce(req.amount, 0), updated_at = now() where id = acct.id;
  elsif decision = 'approved' and req.kind = 'kyc' then
    update public.accounts set kyc_status = 'verified', updated_at = now() where id = acct.id;
  elsif decision = 'rejected' and req.kind = 'kyc' then
    update public.accounts set kyc_status = 'rejected', updated_at = now() where id = acct.id;
  elsif req.kind = 'kyc' then
    update public.accounts set kyc_status = 'pending', updated_at = now() where id = acct.id;
  end if;
  return req;
end;
$$;

revoke all on function public.review_service_request(uuid, text, text, uuid) from public, anon, authenticated;
grant execute on function public.review_service_request(uuid, text, text, uuid) to service_role;
