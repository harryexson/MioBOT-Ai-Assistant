# Mio backend setup

The web and Expo app now share Better Auth on Vercel Functions with Neon Postgres. The source is ready for this architecture, but accounts and durable data stay unavailable until the Vercel project, Neon database, and server environment are configured.

## Connect Vercel and Neon

1. Import this GitHub repository into Vercel and keep the Vite build command `npm run build:prod` with output directory `dist`.
2. In Vercel Marketplace, add Neon Postgres to the project. Use the pooled connection string as `DATABASE_URL` in Preview and Production.
3. Open Neon’s SQL Editor and run [`database/schema.sql`](database/schema.sql). This creates Better Auth users/sessions, durable rate limits, waitlist/contact submissions, provider interest, and account-scoped history tables.
4. Add these variables in Vercel Project Settings → Environment Variables:

   | Name | Value |
   | --- | --- |
   | `DATABASE_URL` | Neon pooled PostgreSQL connection string, including TLS settings |
   | `BETTER_AUTH_SECRET` | A unique random secret of at least 32 characters |
   | `BETTER_AUTH_URL` | The canonical deployed web URL, such as `https://your-project.vercel.app` |
   | `BETTER_AUTH_TRUSTED_ORIGINS` | Comma-separated canonical web URL, any custom domain, and `mioai://` |
   | `VITE_AUTH_ENABLED` | `true` after the database schema and auth settings are ready |

5. Redeploy Vercel after changing environment values. For password reset and email verification, configure a verified sender in Resend, set `RESEND_API_KEY` and `EMAIL_FROM`, then set `EMAIL_VERIFICATION_REQUIRED=true`.
6. Copy the deployed website URL into `mobile/.env` as `EXPO_PUBLIC_API_URL` before building the iOS or Android app. The public URL is safe in the mobile bundle; database, auth, email, and provider secrets are not.

Generate a strong secret locally with `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"` and paste it directly into Vercel’s secret field. Do not paste secrets into chat, source files, or GitHub.

## Local development

Vercel Functions do not run under plain `vite`. Link the local checkout to the Vercel project, pull its development environment with `vercel env pull .env.local`, then run `npm run dev:vercel`. For Expo Go on a physical device, set `EXPO_PUBLIC_API_URL` to the deployed Vercel URL or an HTTPS tunnel to your local Vercel development server.

## Current backend scope

Email/password sign-up and sign-in support personal and business account labels, secure web sessions, Expo SecureStore sessions, and database-backed auth rate limits. The API also stores waitlist/contact messages, provider application interest, and authenticated search history. Account dashboards read only the signed-in user’s orders, searches, subscriptions, and commission records. Payment processing, real orders, admin actions, AI requests, and provider search/booking integrations are not connected yet; current product and commission results remain sample data.

The prior PocketBase hostname could not be resolved, so no old records were confirmed or migrated. Apply the new schema to an empty Neon database. If the original server becomes reachable and contains user data, export it and plan a separate safe migration before deleting that source.
