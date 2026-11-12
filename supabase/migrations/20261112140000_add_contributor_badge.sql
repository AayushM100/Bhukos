-- Migration: Add community_contributor_badge column
alter table public.profiles add column if not exists has_contributor_badge boolean default false;
