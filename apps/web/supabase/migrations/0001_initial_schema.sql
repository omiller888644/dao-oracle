create extension if not exists pgcrypto;

create table if not exists public.hexagrams (
  id uuid primary key default gen_random_uuid(),
  number integer not null unique check (number between 1 and 64),
  slug text not null unique,
  title_en text not null,
  title_zh text not null,
  core_en text not null,
  core_zh text not null,
  sections jsonb not null,
  question_lens jsonb not null,
  source_file text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists hexagrams_sections_gin_idx on public.hexagrams using gin (sections);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  question text not null check (char_length(question) between 20 and 800),
  question_type text not null check (
    question_type in ('love', 'career', 'money', 'wellbeing', 'life_path', 'general')
  ),
  hexagram_id uuid not null references public.hexagrams(id),
  hexagram_number integer not null check (hexagram_number between 1 and 64),
  cast_method text not null check (cast_method in ('six_line_tap', 'daily', 'manual_test')),
  lines jsonb not null,
  changing_lines jsonb not null,
  locale text not null default 'en',
  created_at timestamptz not null default now()
);

create index if not exists readings_created_at_idx on public.readings (created_at desc);
create index if not exists readings_question_type_idx on public.readings (question_type);
create index if not exists readings_hexagram_number_idx on public.readings (hexagram_number);

create table if not exists public.prompt_versions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  version integer not null,
  status text not null default 'draft' check (status in ('draft', 'active', 'archived')),
  system_prompt text not null,
  developer_prompt text not null,
  output_schema jsonb not null,
  model text not null,
  temperature numeric not null default 0.4,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (name, version)
);

create unique index if not exists prompt_versions_one_active_idx
  on public.prompt_versions ((status))
  where status = 'active';

create table if not exists public.reading_interpretations (
  id uuid primary key default gen_random_uuid(),
  reading_id uuid not null references public.readings(id) on delete cascade,
  prompt_version_id uuid references public.prompt_versions(id) on delete set null,
  model text not null,
  input_context jsonb not null,
  output jsonb not null,
  summary text not null,
  status text not null default 'generated' check (status in ('generated', 'failed', 'reviewed')),
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists reading_interpretations_reading_id_idx
  on public.reading_interpretations (reading_id);

create table if not exists public.user_feedback (
  id uuid primary key default gen_random_uuid(),
  reading_id uuid not null references public.readings(id) on delete cascade,
  interpretation_id uuid not null references public.reading_interpretations(id) on delete cascade,
  rating integer check (rating between 1 and 5),
  label text not null check (
    label in ('helpful', 'unclear', 'too_generic', 'inaccurate', 'too_mystical', 'other')
  ),
  comment text,
  created_at timestamptz not null default now()
);

create table if not exists public.seo_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  meta_description text not null,
  page_type text not null check (page_type in ('guide', 'reading_landing', 'hexagram', 'dao_oracle')),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  content jsonb not null,
  schema_json jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_hexagrams_updated_at on public.hexagrams;
create trigger set_hexagrams_updated_at
before update on public.hexagrams
for each row execute function public.set_updated_at();

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_prompt_versions_updated_at on public.prompt_versions;
create trigger set_prompt_versions_updated_at
before update on public.prompt_versions
for each row execute function public.set_updated_at();

drop trigger if exists set_seo_pages_updated_at on public.seo_pages;
create trigger set_seo_pages_updated_at
before update on public.seo_pages
for each row execute function public.set_updated_at();

alter table public.hexagrams enable row level security;
alter table public.profiles enable row level security;
alter table public.readings enable row level security;
alter table public.prompt_versions enable row level security;
alter table public.reading_interpretations enable row level security;
alter table public.user_feedback enable row level security;
alter table public.seo_pages enable row level security;

create policy "Public can read published hexagram content"
on public.hexagrams for select
using (true);

create policy "Public can read published seo pages"
on public.seo_pages for select
using (status = 'published');
