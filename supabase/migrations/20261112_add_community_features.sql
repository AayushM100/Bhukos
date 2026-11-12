-- Create product_submissions table
create table if not exists public.product_submissions (
    id uuid primary key default gen_random_uuid(),
    submitted_by uuid references public.profiles(id) on delete cascade,
    name text not null,
    brand text not null,
    category text,
    description text,
    image_url text,
    status text default 'Pending' check (status in ('Pending', 'Approved', 'Rejected')),
    admin_notes text,
    reviewed_by uuid references public.profiles(id),
    reviewed_at timestamp with time zone,
    created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.product_submissions enable row level security;

-- Policies for submissions
create policy "Users can view own submissions" on public.product_submissions
for select using (auth.uid() = submitted_by);

create policy "Users can insert own submissions" on public.product_submissions
for insert with check (auth.uid() = submitted_by);

-- Create contributor_badges table
create table if not exists public.contributor_badges (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references public.profiles(id) on delete cascade unique,
    awarded_at timestamp with time zone default now()
);

alter table public.contributor_badges enable row level security;

create policy "Badges are viewable by everyone" on public.contributor_badges
for select using (true);

-- Add badge_awarded trigger function (to be called after approval)
create or replace function public.award_contributor_badge(target_user_id uuid)
returns void as $$
begin
    insert into public.contributor_badges (user_id)
    values (target_user_id)
    on conflict (user_id) do nothing;
end;
$$ language plpgsql security definer;
