# One Mio platform

Upstream: `origin/main` at `1a31af6`. Existing design saved in commit `2043700` before merging. Branch: `codex/unify-mio-platform`.

## Homepage parity restored

| Original element | Unified implementation |
|---|---|
| Broad service categories | Ten module tiles using the same data as `/features`; module deep links |
| Voice bot and product search | Homepage voice/typed discovery; `/search` and `/voice` share one sample catalog and speech-input hook |
| Onboarding and app-screen galleries | Eight scrollable journeys: welcome, shopping, travel, checkout, interests, invoices, food, services |
| Merchant dashboard details | Capability list, merchant and platform-admin entry points, existing chart preview |
| NFC / in-store journey | Interactive four-step EasyTap presentation with dimensional phone and NFC puck |
| Integration/revenue model | Partner mosaic, three revenue streams, one searchable provider catalog |
| Partner applications | Provider detail/application dialog with inherited partner URLs and API capabilities |
| AI engine | Six feature groups plus account, developer, widget and commission workspace links |
| Early-access registration | Waitlist form with real submission only when the account backend is configured |
| About, sign-in and personal dashboard | Incoming modules incorporated into the shared navigation and routes |

## Consolidation

There is one homepage (`Home.jsx`). Existing hero portrait, typography, warm-white/violet design and motion are retained. `/integrations` and `/partners` redirect to `/providers`. Partner and service content is shared in `src/data/`. `/voice` shares `/search` instead of maintaining a second provider dataset. Legacy pricing and legal entry files delegate to the canonical pages. The existing mobile design and portrait are retained.

## Backend boundary

The previous PocketBase host could not be resolved. The new account architecture uses Better Auth on Vercel Functions and Neon Postgres. `database/schema.sql` defines the auth and app-data tables; Vercel project variables are documented in `VERCEL-SETUP.md`. Until a Vercel project and Neon database are linked and configured, live signup and durable writes cannot be exercised.

The Neon schema includes users, orders, searches, subscriptions, commissions, partner applications, and waitlist/contact submissions. API reads scope account data to the authenticated user. Order, subscription, and commission mutation endpoints are not exposed; trusted payment/provider services must own those writes. Admin routes remain sample dashboards and have no admin API or privileges. No administrative credentials belong in frontend environment variables.

Search and voice results remain static examples. Browser speech recognition is opt-in, aborts on unmount, and does not imply a live AI/provider connection. Commission figures are sample records when the backend is absent; a configured backend never falls back to sample earnings after an error.

The IONOS URL could not be read through the web reader. The fetched Git source was used for the comparison and merge.

## Verification

Production build passed. Browser checks passed for ten module links, eight mobile journeys, six engine groups, partner application dialog and Escape dismissal, canonical catalog aliases, price-filtered search, voice route, account redirect, commission filters, and the existing feature routes. No page errors were observed. Homepage widths 390, 820 and 1440 pixels had no horizontal overflow. Reduced motion disables ambient animation. Both portrait files retain SHA-256 DDB0DE0B929B5B99355EB357B1CC96EFC61AA86D35D26169B94DA230A5913AC9. Real microphone recognition, backend writes, partner connections, payments, and native device behavior were not exercised by these browser checks.
