# Mio — everyday AI, thoughtfully designed

A redesigned React website and Expo / React Native preview for iOS and Android, based on the original MioBOT repository and supplied visual reference.

## Website

The original root package deliberately leaves platform-supplied dependencies empty. For a standalone checkout, install the local runtime manifest into the project root:

```powershell
node scripts/setup-local.mjs
npm run dev
npm run build
```

The setup script installs the packages listed in `package.local.json` without replacing the platform manifest. Node 22+ is recommended. The standalone Vite config replaces the original IONOS-only import and uses Lucide icons.

One homepage merges the preserved hero and motion with service modules, eight mobile journeys, voice/typed discovery, integrations, merchant/admin links, EasyTap, engine features and early access. See MERGE-REPORT.md.

Routes include /search, /voice, /signin, /dashboard, /commissions and /about alongside the existing previews. /onboarding and /widget mount their dedicated flows. /integrations and /partners redirect to the canonical /providers catalog.

The web app uses the MioBot PocketBase endpoint at `https://pb-mzj62.aibuilder.ionos.com` for accounts and application forms. Set `VITE_POCKETBASE_URL` to override it for another environment. Backend collection fields and access rules are in MERGE-REPORT.md. Discovery previews work without signing in.

The `/providers` page is a searchable, filterable directory of 31 prospective partner integrations. Its commission figures and audience metrics come from the planning brief and are illustrative only; partner agreements, API availability, rates, and eligibility are not verified. Saved shortlist selections stay in browser `localStorage`.

The app demo supports four sample scenario types, free-text prompts, saving/unsaving suggestions, a saved collection, and a new conversation action. Saved identifiers use browser localStorage; messages stay in memory. No AI or payment network calls are made by the new demo.

## Mobile

See `mobile/README.md`. The new default `mobile/App.tsx` is a self-contained preview that does not require Supabase or Stripe secrets. The original entry point is preserved as `mobile/LegacyApp.tsx`; legacy screens/services remain in `mobile/src` for future integration. They are not imported by the new preview.

## Design

Warm off-white surfaces, violet accents, DM Sans typography, custom hero photography, CSS product illustrations, an animated voice orb, floating conversation cards, responsive navigation, keyboard focus indicators, and reduced-motion support.

The hero image is AI-generated specifically for this project, inspired by the user’s supplied reference. It is not a customer testimonial. No unverified user counts, store ratings, or live partner relationships are claimed in the new marketing pages.

## Deployment and real-service work

This is a working product preview, not a live commerce service. Before public launch:
- Connect a server-side AI service, real provider APIs, and authenticated user storage.
- Validate all prices and inventory on the server; require an explicit confirmation for every real transaction.
- Configure Stripe server-side payment intents and webhooks; never ship secret keys to clients.
- Replace example dashboard data with authorized merchant data.
- Upgrade and audit the inherited Expo SDK before store release; test on real iOS and Android devices.
- Configure EAS project credentials, signing, store listings, support information, and final legal policies.

Website hosting must serve `index.html` for SPA routes. `index.html` currently uses a root base; adjust the base and Vite base together for a subdirectory deployment. The IONOS preview could not be fetched by the web reader; the GitHub source was used as the implementation baseline.

## Canonical workspace

The active unified project is this repository root, with one Home.jsx and one active native mobile/App.tsx. Start the current website with npm run dev; a separate local port may be used if another project occupies 5173. Preserved legacy mobile source is a reference, not a second running application.
