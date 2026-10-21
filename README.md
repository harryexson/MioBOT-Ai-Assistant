# Mio — everyday AI, thoughtfully designed

Mio brings the original assistant concept, mobile journeys, partner directory, EasyTap experience, merchant concepts, and animated violet-and-warm-white design into one web and Expo codebase.

## Run the website

Install dependencies with `npm install`. `npm run dev` starts the Vite website preview. Vite alone does not run Vercel API functions, so connected local account flows require the linked Vercel project and `npm run dev:vercel`.

For deployment, import this GitHub repository into Vercel. The project builds with `npm run build:prod`, serves `dist`, and includes server functions under `api/`. Follow [`VERCEL-SETUP.md`](VERCEL-SETUP.md) to connect Neon, apply the database schema, and set server environment variables.

## Features and service status

The landing page retains the Mio portrait and motion, ten service modules, eight mobile journeys, voice/typed discovery, integrations catalog, EasyTap, AI engine features, early access, and links to account and merchant concepts. Existing routes include `/search`, `/voice`, `/signin`, `/dashboard`, `/commissions`, `/providers`, `/merchant`, and `/admin`.

The provider directory contains prospective partners. Its displayed rates and audience metrics are illustrative and require partner approval and verification. Search results, order/checkout behavior, provider availability, AI responses, and merchant/admin dashboard figures remain sample concepts. Real payments, bookings, AI, and provider APIs are not connected.

## Shared web and mobile accounts

Web and iOS/Android signup use Better Auth with Vercel Functions and Neon Postgres. The API supports personal/business account labels, secure browser sessions, Expo SecureStore sessions, database-backed authentication limits, waitlist/contact submissions, provider application interest, and user-scoped account history reads. New Neon tables start empty; no data export from the old PocketBase hostname was available.

To use account flows, deploy the Vercel project, connect Neon, apply [`database/schema.sql`](database/schema.sql), and configure `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, and `BETTER_AUTH_TRUSTED_ORIGINS`. Use the Vercel deployment URL as `EXPO_PUBLIC_API_URL` in `mobile/.env`. Password reset and verified signup mail also require a verified sender and Resend settings.

## Expo apps

The active native app is `mobile/App.tsx`, with iOS and Android identifiers already set in `mobile/app.json`. See [`mobile/README.md`](mobile/README.md) for Expo Go and EAS steps. TypeScript and JS bundle export verify the app builds, but do not create installable APK/IPA files; EAS requires a reachable Expo account and configured deployment.

Keep database, email, payment, AI, and provider secrets on the server. Never commit `.env`, Vercel tokens, signing credentials, or API secrets.
