# Mio backend setup

The web and Expo app share Better Auth on Vercel Functions with Neon Postgres. The Neon project `tiny-heart-31955546` (`MioBot AI Assistant`) and its default `production` branch are provisioned, and `database/schema.sql` has been applied and verified. A pooled connection URL and local auth secret are saved in the Git-ignored `.env.local`. The Vercel project is not linked yet, so deployed account services remain unavailable until its server environment is configured.

## Connect Vercel and Neon

1. Import this GitHub repository into Vercel and keep the Vite build command `npm run build:prod` with output directory `dist`.
2. Add the existing Neon pooled connection URL as `DATABASE_URL` in Vercel Preview and Production. The local `.env.local` already contains it; do not commit or paste it into chat.
3. The SQL schema is already applied to the Neon `production` branch. Reapplying [`database/schema.sql`](database/schema.sql) is safe because its statements are idempotent.
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
7. To enable live Mio chat, add `OPENAI_API_KEY` in Vercel. Optionally set `OPENAI_BASE_URL` and `OPENAI_MODEL` for an OpenAI-compatible API gateway. `AI_REQUESTS_PER_HOUR` defaults to 60 per signed-in account. These values stay server-side.

Generate a separate strong secret for Vercel with `node -e "console.log(require('node:crypto').randomBytes(32).toString('base64url'))"` and enter it directly in Vercel’s secret field. The local secret in `.env.local` is for local development. Do not paste secrets into chat, source files, or GitHub.

## Local development

Vercel Functions do not run under plain `vite`. After linking this checkout to the Vercel project, run `vercel env pull .env.local` only if you want Vercel’s development values to replace the current local settings, then run `npm run dev:vercel`. The current local database URL points to the production Neon branch, so local sign-ups and writes will create production records. For Expo Go on a physical device, set `EXPO_PUBLIC_API_URL` in `mobile/.env` to the deployed Vercel URL or an HTTPS tunnel to your local Vercel development server.

## Current backend scope

Email/password sign-up and sign-in support personal and business account labels, secure web sessions, Expo SecureStore sessions, and database-backed auth rate limits. Signed-in web and mobile users can use server-side AI chat when an AI key is configured; conversations are stored by account in Neon. The API also stores waitlist/contact messages, provider application interest, and authenticated search history. Account dashboards read only the signed-in user’s orders, searches, subscriptions, and commission records. Payment processing, live provider search and booking, admin actions, and merchant operations still require provider credentials and separate verified API implementations; product and commission results remain sample data until those are integrated.

The prior PocketBase hostname could not be resolved, so no old records were confirmed or migrated. Apply the new schema to an empty Neon database. If the original server becomes reachable and contains user data, export it and plan a separate safe migration before deleting that source.
