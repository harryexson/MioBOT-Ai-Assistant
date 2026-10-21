-- Apply once in the Neon SQL editor before deploying the Vercel API.
-- Better Auth's table and field names intentionally match its PostgreSQL adapter.
create table if not exists "user" (
  id text primary key,
  name text not null,
  email text not null unique,
  "emailVerified" boolean not null default false,
  image text,
  plan text not null default 'personal' check (plan in ('personal', 'business')),
  role text not null default 'user' check (role in ('user', 'admin')),
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

create table if not exists "session" (
  id text primary key,
  "expiresAt" timestamptz not null,
  token text not null unique,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  "ipAddress" text,
  "userAgent" text,
  "userId" text not null references "user"(id) on delete cascade
);
create index if not exists session_user_id_idx on "session"("userId");

create table if not exists "account" (
  id text primary key,
  "accountId" text not null,
  "providerId" text not null,
  "userId" text not null references "user"(id) on delete cascade,
  "accessToken" text,
  "refreshToken" text,
  "idToken" text,
  "accessTokenExpiresAt" timestamptz,
  "refreshTokenExpiresAt" timestamptz,
  scope text,
  password text,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now(),
  unique ("providerId", "accountId")
);
create index if not exists account_user_id_idx on "account"("userId");

create table if not exists "verification" (
  id text primary key,
  identifier text not null,
  value text not null,
  "expiresAt" timestamptz not null,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);
create index if not exists verification_identifier_idx on "verification"(identifier);

create table if not exists "rateLimit" (
  id text primary key,
  key text not null unique,
  count integer not null,
  "lastRequest" bigint not null
);

create table if not exists mio_waitlist (
  id bigserial primary key,
  email text not null,
  name text not null default '',
  subject text not null default '',
  message text not null default '',
  type text not null default 'early-access',
  created_at timestamptz not null default now()
);
create index if not exists mio_waitlist_email_idx on mio_waitlist(lower(email));

create table if not exists mio_public_rate_limits (
  key text primary key,
  window_started timestamptz not null,
  request_count integer not null
);

create table if not exists mio_partner_signups (
  id bigserial primary key,
  user_id text references "user"(id) on delete set null,
  name text not null,
  email text not null,
  business text not null,
  partner_name text not null,
  category text not null,
  status text not null default 'applied',
  created_at timestamptz not null default now()
);

create table if not exists mio_searches (
  id bigserial primary key,
  user_id text not null references "user"(id) on delete cascade,
  query text not null,
  category text not null default '',
  results_count integer not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists mio_searches_user_created_idx on mio_searches(user_id, created_at desc);

create table if not exists mio_orders (
  id bigserial primary key,
  user_id text not null references "user"(id) on delete cascade,
  merchant_name text not null,
  category text not null default '',
  total_amount numeric(12,2) not null default 0,
  status text not null default 'pending',
  provider_reference text,
  created_at timestamptz not null default now()
);
create index if not exists mio_orders_user_created_idx on mio_orders(user_id, created_at desc);

create table if not exists mio_subscriptions (
  id bigserial primary key,
  user_id text not null references "user"(id) on delete cascade,
  plan text not null,
  status text not null,
  current_period_end timestamptz,
  provider_reference text,
  created_at timestamptz not null default now()
);
create index if not exists mio_subscriptions_user_created_idx on mio_subscriptions(user_id, created_at desc);

create table if not exists mio_commissions (
  id bigserial primary key,
  user_id text not null references "user"(id) on delete cascade,
  partner text not null,
  category text not null default '',
  order_value numeric(12,2) not null default 0,
  commission_earned numeric(12,2) not null default 0,
  status text not null default 'pending',
  provider_reference text,
  created_at timestamptz not null default now()
);
create index if not exists mio_commissions_user_created_idx on mio_commissions(user_id, created_at desc);
