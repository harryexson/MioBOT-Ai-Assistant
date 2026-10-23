# Mio API keys and environment variables

Use this as a checklist for Vercel Project Settings → Environment Variables. The values shown are placeholders, not working credentials. Keep private keys in Vercel or an ignored `.env.local`; never commit real keys or put secret values in Expo `EXPO_PUBLIC_*` variables.

## Needed for the backend that is implemented now

| Variable | Required for | Where to get it |
| --- | --- | --- |
| `DATABASE_URL` | Accounts, sessions, and saved app data | Neon Console → MioBot AI Assistant → `production` → Connect → pooled PostgreSQL URL |
| `BETTER_AUTH_SECRET` | Signing account sessions | Generate a unique random value of at least 32 characters; use a different value for each environment |
| `BETTER_AUTH_URL` | Canonical website origin for Better Auth | The Vercel preview or production domain |
| `BETTER_AUTH_TRUSTED_ORIGINS` | Web and Expo app origins allowed to use account APIs | Comma-separated Vercel domain(s), custom domain if used, and `mioai://` |
| `VITE_AUTH_ENABLED` | Showing the account UI in the website build | Set to `true` after the database and auth variables are set; this is a public build flag, not a secret |

`OPENAI_API_KEY` is required to make the current Mio chat endpoint return live AI answers. `OPENAI_BASE_URL` and `OPENAI_MODEL` are optional overrides for a compatible gateway/model.

`RESEND_API_KEY` and `EMAIL_FROM` are needed only when enabling verification or password-reset email. The sender address must belong to a domain verified with Resend. Keep `EMAIL_VERIFICATION_REQUIRED=false` until that sender is configured and tested.

For Expo builds, set `EXPO_PUBLIC_API_URL` to the deployed Mio website URL. That URL is public. Do not add Neon, Better Auth, OpenAI, Resend, Stripe secret, or affiliate credentials to Expo variables.

## Planned provider integrations

The extra provider variables in `.env.example` are reminders only. The corresponding commerce, booking, payment, maps, and affiliate connectors are not currently implemented as live API integrations, so adding keys alone will not activate them.

| Feature | Placeholder variables | Provider setup |
| --- | --- | --- |
| Payments | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `VITE_STRIPE_PUBLISHABLE_KEY`, `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Create test keys first; implement and test server-side checkout and webhook verification before using live keys. Only publishable keys may use the `VITE_`/`EXPO_PUBLIC_` prefixes. |
| Flights and travel | `AMADEUS_CLIENT_ID`, `AMADEUS_CLIENT_SECRET` | Register an Amadeus app and test in its test environment; production access and booking permissions require provider approval. |
| Events | `TICKETMASTER_API_KEY`, `EVENTBRITE_PRIVATE_TOKEN` | Create separate provider apps/tokens; each has its own scopes, rate limits, and commercial terms. |
| Places and maps | `GOOGLE_MAPS_API_KEY` | Create a restricted key with only the required APIs and website/app restrictions. |
| API aggregator | `RAPIDAPI_KEY` | Choose a specific RapidAPI provider/API; this key grants access only to subscribed APIs and does not replace partner-specific credentials. |
| Retail affiliate | `AMAZON_ACCESS_KEY_ID`, `AMAZON_SECRET_ACCESS_KEY`, `AMAZON_PARTNER_TAG`, `CJ_API_TOKEN`, `RAKUTEN_API_TOKEN` | Apply separately to each affiliate program; access, attribution, and commission rates depend on approval and the program agreement. |

Food delivery, rides, hotels, home services, and health providers often require a business application, production approval, and partner-specific credentials. Do not treat sample catalog cards or commission estimates as a live integration.

## Safe setup sequence

1. Deploy the public landing page as a Vercel preview; it does not need private API keys.
2. Link the repository to the Vercel project and add the core Neon and Better Auth variables to Preview first.
3. Test `/api/health`, account creation, sign-in, and sign-out against Preview.
4. Add OpenAI and Resend credentials only when those features are ready to test.
5. Add payment and provider credentials as each integration is implemented; use test/sandbox credentials before any live keys.
