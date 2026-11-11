
-- ============================================
-- BHUKOS DATABASE SETUP
-- ============================================

-- Enable UUID generation
create extension if not exists pgcrypto;


-- ============================================
-- 1. PROFILES TABLE
-- ============================================

create table if not exists public.profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    username text unique,
    full_name text,
    avatar_url text,
    streak_count integer default 0,
    last_login timestamptz default now(),
    created_at timestamptz default now()
);


-- ============================================
-- 2. FOOD ITEMS TABLE
-- ============================================

create table if not exists public.food_items (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    brand text not null,
    category text,
    rarity text check (
        rarity in ('Common', 'Rare', 'Epic', 'Legendary')
    ),
    poster_url text,
    description text,
    flavors text[],
    quote text,
    created_at timestamptz default now()
);


-- ============================================
-- 3. FOOD LOGS TABLE
-- ============================================

create table if not exists public.logs (
    id uuid primary key default gen_random_uuid(),

    user_id uuid references public.profiles(id)
        on delete cascade,

    food_item_id uuid references public.food_items(id)
        on delete cascade,

    rating integer check (rating between 1 and 10),

    review text,

    created_at timestamptz default now()
);


-- ============================================
-- 4. WISHLIST TABLE
-- ============================================

create table if not exists public.wishlist (
    id uuid primary key default gen_random_uuid(),

    user_id uuid references public.profiles(id)
        on delete cascade,

    food_item_id uuid references public.food_items(id)
        on delete cascade,

    created_at timestamptz default now(),

    unique (user_id, food_item_id)
);


-- ============================================
-- 5. TRIVIA TABLE
-- ============================================

create table if not exists public.trivia (
    id uuid primary key default gen_random_uuid(),

    fact text not null,

    source text,

    active_date date unique,

    created_at timestamptz default now()
);


-- ============================================
-- 6. INDEXES
-- ============================================

create index if not exists idx_logs_user_id
on public.logs(user_id);

create index if not exists idx_logs_food_item_id
on public.logs(food_item_id);

create index if not exists idx_wishlist_user_id
on public.wishlist(user_id);

create index if not exists idx_food_items_name
on public.food_items(name);

create index if not exists idx_food_items_brand
on public.food_items(brand);


-- ============================================
-- 7. ENABLE ROW LEVEL SECURITY
-- ============================================

alter table public.profiles enable row level security;
alter table public.food_items enable row level security;
alter table public.logs enable row level security;
alter table public.wishlist enable row level security;
alter table public.trivia enable row level security;


-- ============================================
-- 8. REMOVE EXISTING POLICIES
-- ============================================

drop policy if exists "Profiles are viewable by everyone"
on public.profiles;

drop policy if exists "Users can update own profile"
on public.profiles;

drop policy if exists "Food items are viewable by everyone"
on public.food_items;

drop policy if exists "Logs are viewable by everyone"
on public.logs;

drop policy if exists "Users can insert own logs"
on public.logs;

drop policy if exists "Users can update own logs"
on public.logs;

drop policy if exists "Users can delete own logs"
on public.logs;

drop policy if exists "Users can manage own wishlist"
on public.wishlist;

drop policy if exists "Trivia is viewable by everyone"
on public.trivia;


-- ============================================
-- 9. PROFILES POLICIES
-- ============================================

create policy "Profiles are viewable by everyone"
on public.profiles
for select
using (true);

create policy "Users can update own profile"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);


-- ============================================
-- 10. FOOD ITEMS POLICIES
-- ============================================

create policy "Food items are viewable by everyone"
on public.food_items
for select
using (true);


-- ============================================
-- 11. LOGS POLICIES
-- ============================================

create policy "Logs are viewable by everyone"
on public.logs
for select
using (true);

create policy "Users can insert own logs"
on public.logs
for insert
with check (auth.uid() = user_id);

create policy "Users can update own logs"
on public.logs
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete own logs"
on public.logs
for delete
using (auth.uid() = user_id);


-- ============================================
-- 12. WISHLIST POLICIES
-- ============================================

create policy "Users can manage own wishlist"
on public.wishlist
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);


-- ============================================
-- 13. TRIVIA POLICIES
-- ============================================

create policy "Trivia is viewable by everyone"
on public.trivia
for select
using (true);


-- ============================================
-- 14. AUTOMATIC PROFILE CREATION
-- ============================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
    generated_username text;
begin

    generated_username :=
        lower(
            regexp_replace(
                coalesce(
                    new.raw_user_meta_data ->> 'username',
                    split_part(coalesce(new.email, 'foodie'), '@', 1)
                ),
                '[^a-zA-Z0-9_]',
                '',
                'g'
            )
        ) || '_' || substr(new.id::text, 1, 8);

    insert into public.profiles (
        id,
        username,
        full_name,
        avatar_url
    )
    values (
        new.id,
        generated_username,
        coalesce(
            new.raw_user_meta_data ->> 'full_name',
            new.raw_user_meta_data ->> 'name'
        ),
        new.raw_user_meta_data ->> 'picture'
    );

    return new;
end;
$$;


-- ============================================
-- 15. AUTH USER TRIGGER
-- ============================================

drop trigger if exists on_auth_user_created
on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();


-- ============================================
-- BHUKOS DATABASE SETUP COMPLETE
-- ============================================
