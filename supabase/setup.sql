-- UX Cookbook: Customer Service insight handoff
-- Run this entire file once in Supabase Dashboard → SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.cs_allowed_emails (
    email text primary key,
    role text not null check (role in ('cs', 'ux', 'admin')),
    created_at timestamptz not null default now()
);

create table if not exists public.cs_insights (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    created_by uuid references auth.users(id) on delete set null,
    issue text not null,
    business_goal text not null,
    frequency text not null,
    severity text not null,
    severity_reason text not null,
    quotation text,
    user_goal text,
    files jsonb not null default '[]'::jsonb
);

create index if not exists cs_insights_created_at_idx
    on public.cs_insights (created_at desc);

create or replace function public.is_cs_team_member()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select exists (
        select 1
        from public.cs_allowed_emails
        where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    );
$$;

revoke all on function public.is_cs_team_member() from public;
grant execute on function public.is_cs_team_member() to authenticated;

alter table public.cs_allowed_emails enable row level security;
alter table public.cs_insights enable row level security;

drop policy if exists "Team can read CS insights" on public.cs_insights;
create policy "Team can read CS insights"
    on public.cs_insights for select
    to authenticated
    using (public.is_cs_team_member());

drop policy if exists "Team can add CS insights" on public.cs_insights;
create policy "Team can add CS insights"
    on public.cs_insights for insert
    to authenticated
    with check (
        (
            public.is_cs_team_member()
            or coalesce(auth.jwt() ->> 'is_anonymous', 'false')::boolean
        )
        and created_by = auth.uid()
    );

drop policy if exists "Team can delete CS insights" on public.cs_insights;
create policy "Team can delete CS insights"
    on public.cs_insights for delete
    to authenticated
    using (public.is_cs_team_member());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'cs-evidence',
    'cs-evidence',
    false,
    26214400,
    array[
        'image/png',
        'image/jpeg',
        'image/webp',
        'image/gif',
        'image/heic',
        'image/heif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'text/plain',
        'text/csv'
    ]
)
on conflict (id) do update
set public = false,
    file_size_limit = 26214400,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Team can read CS evidence" on storage.objects;
create policy "Team can read CS evidence"
    on storage.objects for select
    to authenticated
    using (
        bucket_id = 'cs-evidence'
        and (
            public.is_cs_team_member()
            or (
                coalesce(auth.jwt() ->> 'is_anonymous', 'false')::boolean
                and (storage.foldername(name))[1] = auth.uid()::text
            )
        )
    );

drop policy if exists "Team can upload CS evidence" on storage.objects;
create policy "Team can upload CS evidence"
    on storage.objects for insert
    to authenticated
    with check (
        bucket_id = 'cs-evidence'
        and (
            public.is_cs_team_member()
            or coalesce(auth.jwt() ->> 'is_anonymous', 'false')::boolean
        )
        and (storage.foldername(name))[1] = auth.uid()::text
    );

drop policy if exists "Team can delete CS evidence" on storage.objects;
create policy "Team can delete CS evidence"
    on storage.objects for delete
    to authenticated
    using (
        bucket_id = 'cs-evidence'
        and (
            public.is_cs_team_member()
            or (
                coalesce(auth.jwt() ->> 'is_anonymous', 'false')::boolean
                and (storage.foldername(name))[1] = auth.uid()::text
            )
        )
    );

-- CS uploaders do not need accounts or email addresses.
insert into public.cs_allowed_emails (email, role)
values ('yani.wang@koreanskincare.com', 'ux')
on conflict (email) do update set role = excluded.role;
