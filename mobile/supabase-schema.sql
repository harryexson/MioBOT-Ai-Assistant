-- ────────────────────────────────────────────────────────────────────────────
-- Mio AI — Supabase Schema
--
-- Run this in your Supabase project:
--   Dashboard → SQL Editor → paste this → Run
-- ────────────────────────────────────────────────────────────────────────────

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Profiles ─────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id           uuid references auth.users on delete cascade primary key,
  full_name    text,
  avatar_url   text,
  phone        text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- Auto-create profile when user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ── User preferences ──────────────────────────────────────────────────────────
create table if not exists public.user_preferences (
  id               uuid default uuid_generate_v4() primary key,
  user_id          uuid references auth.users on delete cascade not null unique,
  interests        text[] default '{}',
  voice_enabled    boolean default true,
  default_currency text default 'USD',
  language         text default 'en',
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ── Addresses ─────────────────────────────────────────────────────────────────
create table if not exists public.addresses (
  id           uuid default uuid_generate_v4() primary key,
  user_id      uuid references auth.users on delete cascade not null,
  label        text not null, -- 'Home', 'Work', etc.
  line1        text not null,
  line2        text,
  city         text not null,
  state        text,
  postal_code  text,
  country      text not null default 'US',
  is_default   boolean default false,
  created_at   timestamptz default now()
);

-- ── Conversations ─────────────────────────────────────────────────────────────
create table if not exists public.conversations (
  id           uuid default uuid_generate_v4() primary key,
  user_id      uuid references auth.users on delete cascade not null,
  title        text,
  category     text not null default 'general',
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ── Messages ──────────────────────────────────────────────────────────────────
create table if not exists public.messages (
  id                uuid default uuid_generate_v4() primary key,
  conversation_id   uuid references public.conversations on delete cascade not null,
  role              text not null check (role in ('user', 'assistant')),
  content           text not null,
  metadata          jsonb,
  created_at        timestamptz default now()
);

-- ── Orders ────────────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id                uuid default uuid_generate_v4() primary key,
  user_id           uuid references auth.users on delete set null,
  merchant_id       uuid,
  type              text not null, -- 'food', 'product', 'hotel', 'flight', 'event', 'service'
  status            text not null default 'pending', -- 'pending', 'confirmed', 'processing', 'completed', 'cancelled'
  total_amount      numeric(10, 2) not null,
  currency          text not null default 'USD',
  stripe_payment_id text,
  metadata          jsonb,
  created_at        timestamptz default now(),
  updated_at        timestamptz default now()
);

-- ── Order items ───────────────────────────────────────────────────────────────
create table if not exists public.order_items (
  id           uuid default uuid_generate_v4() primary key,
  order_id     uuid references public.orders on delete cascade not null,
  name         text not null,
  quantity     integer not null default 1,
  unit_price   numeric(10, 2) not null,
  metadata     jsonb,
  created_at   timestamptz default now()
);

-- ── Merchant profiles ─────────────────────────────────────────────────────────
create table if not exists public.merchants (
  id           uuid default uuid_generate_v4() primary key,
  owner_id     uuid references auth.users on delete set null,
  name         text not null,
  type         text not null, -- 'restaurant', 'retail', 'hotel', 'service', etc.
  description  text,
  logo_url     text,
  address      text,
  lat          numeric(9, 6),
  lng          numeric(9, 6),
  nfc_tag_id   text unique,
  stripe_account_id text,
  is_active    boolean default true,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ── Row-level security ────────────────────────────────────────────────────────
alter table public.profiles            enable row level security;
alter table public.user_preferences    enable row level security;
alter table public.addresses           enable row level security;
alter table public.conversations       enable row level security;
alter table public.messages            enable row level security;
alter table public.orders              enable row level security;
alter table public.order_items         enable row level security;

-- Profiles: own row only
create policy "profiles_own" on public.profiles for all using (auth.uid() = id);

-- Preferences: own row only
create policy "prefs_own" on public.user_preferences for all using (auth.uid() = user_id);

-- Addresses: own rows only
create policy "addresses_own" on public.addresses for all using (auth.uid() = user_id);

-- Conversations: own rows only
create policy "conversations_own" on public.conversations for all using (auth.uid() = user_id);

-- Messages: accessible through conversation ownership
create policy "messages_own" on public.messages for all using (
  exists (select 1 from public.conversations c where c.id = messages.conversation_id and c.user_id = auth.uid())
);

-- Orders: own rows only
create policy "orders_own" on public.orders for all using (auth.uid() = user_id);

-- Order items: through order ownership
create policy "order_items_own" on public.order_items for all using (
  exists (select 1 from public.orders o where o.id = order_items.order_id and o.user_id = auth.uid())
);

-- ── Indexes ───────────────────────────────────────────────────────────────────
create index if not exists idx_conversations_user_id on public.conversations (user_id, updated_at desc);
create index if not exists idx_messages_conversation_id on public.messages (conversation_id, created_at asc);
create index if not exists idx_orders_user_id on public.orders (user_id, created_at desc);
create index if not exists idx_merchants_nfc_tag on public.merchants (nfc_tag_id);
