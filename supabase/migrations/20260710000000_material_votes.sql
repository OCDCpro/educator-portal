create table public.material_votes (
  material_id text not null
    check (material_id ~ '^[A-Za-z0-9_-]{1,64}$'),
  user_id uuid not null default auth.uid()
    references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (material_id, user_id)
);

alter table public.material_votes enable row level security;

revoke all on table public.material_votes from anon, authenticated;
grant select, insert, delete on table public.material_votes to authenticated;

create policy "Users can read their own votes"
  on public.material_votes
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own votes"
  on public.material_votes
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own votes"
  on public.material_votes
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.get_material_vote_counts()
returns table (material_id text, vote_count bigint)
language sql
security definer
set search_path = ''
stable
as $$
  select votes.material_id, count(*)::bigint as vote_count
  from public.material_votes as votes
  group by votes.material_id;
$$;

revoke all on function public.get_material_vote_counts() from public;
grant execute on function public.get_material_vote_counts() to anon, authenticated;
