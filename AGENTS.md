# Project Setup

Last updated: 2026-10-14

Factual state of this project, for the assistant's reference. Record project
state here only — structure, installed packages, active patterns. Keep it brief.

## Stack

A **Vite + React** single-page app (JSX), styled with **Tailwind CSS v4**. The
dev server runs with live reload, so edits appear in the preview immediately —
no build or restart needed to see a change.

The app is rendered inside **React StrictMode** in dev. StrictMode
intentionally double-invokes components, effects, and state updaters (mounting
each component twice on the first render) to surface unsafe side effects. Write
code that tolerates this: effects must clean up after themselves (return a
teardown from `useEffect`), and rendering, reducers, and state updaters must be
pure — no side effects, mutation, or one-off work outside an effect. Don't treat
the double render as a bug or try to suppress it; just write idempotent,
effect-safe code and it behaves correctly in production (where StrictMode adds
no double-invocation).

Provided by the platform (available at runtime — never add these to
`package.json`): React, react-dom, react-router, Vite, @vitejs/plugin-react,
lucide-react, pocketbase, `tailwind-merge`, and the Tailwind v4 engine itself.
This project has **no dependencies of its own** — `package.json` is empty and
there is no `node_modules`. Do not `npm install` anything for styling.

## Tailwind v4 notes

This is Tailwind **v4**, not v3. Almost all utilities are identical, but:

- The stylesheet entry is `@import "tailwindcss";` (not the three `@tailwind`
  directives). Already set up in `src/index.css`.
- **Theme customization goes in `tailwind.config.cjs`** (custom colors, fonts,
  spacing under `theme.extend`). It is wired in via `@config` in `index.css` —
  edit the config file as you would in v3. You may instead define tokens with a
  `@theme { --color-brand: …; }` block in `index.css`.
- **Never add `postcss.config`, `postcss`, or `autoprefixer`** — vendor
  prefixing is built into the v4 engine. Adding them breaks the build.
- A few renamed utilities vs v3: `shadow` → `shadow-sm`, `shadow-sm` →
  `shadow-xs`, `rounded` → `rounded-sm`, `outline-none` → `outline-hidden`,
  `flex-shrink-0` → `shrink-0`, and `bg-opacity-50` → the `bg-black/50` slash
  syntax. The default border color is now `currentColor` (set one explicitly,
  e.g. `border border-gray-200`).
- Arbitrary values (`w-[473px]`, `text-[#1da1f2]`, `grid-cols-[1fr_2fr]`) work
  exactly as in v3.

## Structure

```
src/
  App.jsx               # Root — sets up routes
  main.jsx              # Entry point
  index.css             # @import "tailwindcss" + @config + @theme tokens
  components/
    Nav.jsx             # Sticky navbar with mobile hamburger
    CategoryCard.jsx    # Service category grid card
    PhoneMockup.jsx     # Phone frame wrapper
  pages/
    Home.jsx              # Full landing page (hero, categories, mockups, dashboard, CTA)
    Features.jsx          # All 10 service modules, tabbed + core AI engine features (/features)
    Onboarding.jsx        # 5-step onboarding wizard (/onboarding)
    Pricing.jsx           # 3-tier pricing page (/pricing)
    MerchantDashboard.jsx # Business/merchant dashboard — orders, products, team, integrations (/merchant)
    AdminDashboard.jsx    # Platform admin — provider health, security events, merchant approvals (/admin)
    DeveloperPortal.jsx   # Developer portal — API reference, SDKs, guides, code samples (/developers)
    WidgetDemo.jsx        # Embeddable Mio widget live demo — shopping, food, travel scenarios (/widget)
    EasyTapGo.jsx         # NFC/EasyTap Go integration — scenarios, security, SDK setup (/easytap)
    Providers.jsx         # Prospective partner catalog — search, categories, commission estimates, saved shortlist (/providers)
    Checkout.jsx          # Checkout & payments flow — live demo, steps, trust features (/checkout)
    NotFound.jsx          # 404 page
public/
  favicon.svg           # Mio "M" mark in violet gradient
index.html              # Title: "Mio AI — Talk. Find. Book. Order. Pay."
```

## Design system

- **Typefaces:** Syne (display/headings) + DM Sans (body) via Google Fonts vite-ignore link
- **Palette:** Deep navy background (#06061a), violet/purple gradient (#7c3aed → #4f46e5)
- **Theme tokens:** `--font-display`, `--font-sans`, `--color-navy`, `--color-violet` in @theme
- **Utilities:** `.glass`, `.glass-light`, `.gradient-bg`, `.gradient-text`, `.glow-violet`, `.phone-mockup`
- **Animations:** float, pulse-glow, slide-up, wave (CSS keyframes in index.css)

## Routing & asset paths

The published `dist/` is served from more than one base path (the live site at
`/`, and read-only history snapshots under a longer prefix). The build uses a
relative asset base plus a `<base href>` in `index.html` so the same output
works from any of them — so two rules keep links and assets from breaking:

- **Never hardcode root-absolute URLs** (a leading `/`) for in-app assets or
  links — `/logo.png`, `/about`, `fetch("/data.json")`. Import assets
  (`import logo from "./logo.png"`) or reference them relatively; they then
  resolve against the base automatically.
  - **Exception — `/static/…`.** Files in the project's `static/` directory are
    served by the platform at the fixed absolute URL `/static/<filename>`, which
    resolves the same on every base path (live, preview, snapshots) because it's
    mapped outside the app, not bundled into `dist/`. Reference these **exactly**
    as `/static/<file>` (e.g. `<img src="/static/photo.jpg">`) — leading slash and
    all. This is the one allowed root-absolute path. Never copy a `static/` asset
    into the app (`public/`, `src/`) and never reach it with a relative `../`
    path. (The get-image skill saves design images into `static/` and prints the
    `/static/<file>` path to use verbatim.)
- **If you add a router**, set its basename from the document base, never a
  literal `/`:

  ```jsx
  import { createBrowserRouter } from "react-router";
  // strip the trailing slash; "/" becomes "" which react-router wants
  const basename = new URL(document.baseURI).pathname.replace(/\/$/, "");
  const router = createBrowserRouter(routes, { basename });
  ```

  (or `<BrowserRouter basename={basename}>`). This makes the app mount
  correctly whether served from `/` or a longer prefix.

## GitHub repo

Remote: https://github.com/harryexson/MioBOT-Ai-Assistant.git
Branch: dev
Note: Push requires GitHub credentials — provide a personal access token or SSH key to push.
## Standalone redesign (2026-10-18)
- Standalone Vite configuration and Lucide imports replace the IONOS-only runtime imports.
- `package.local.json` + `scripts/setup-local.mjs` install a local runtime without changing the platform dependency manifest.
- `Experience.jsx` implements `/app`, with in-memory sample conversations and localStorage saved item IDs.
- `Marketing.jsx` implements associated marketing, pricing, and preview disclosure pages.
- `mobile/App.tsx` is a credential-free React Native preview; the original entry is `mobile/LegacyApp.tsx`.
- Root website uses DM Sans, warm off-white and violet; custom imagery is in `public/images`.
- Active source and standalone runtime are in this repository root.

## Unified upstream merge (2026-10-20)
- One homepage retains the custom portrait and motion while exposing ten service modules, eight app journeys, voice/search, partner ecosystem, EasyTap and engine features.
- Shared content is in src/data; /integrations and /partners redirect to /providers; /voice shares Search and useSpeechInput.
- AuthProvider and incoming account modules use optional PocketBase configured by VITE_POCKETBASE_URL. Unconfigured write forms are unavailable; search and commission previews are explicitly sample data.
- MERGE-REPORT.md maps the upstream source and verification; scripts/verify-unified.mjs checks browser parity.
