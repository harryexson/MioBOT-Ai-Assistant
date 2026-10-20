# Verification — 2026-10-19

- GitHub: fetched and pulled `origin/main`; already up to date at `dbda81b672ba260b0313ceaa4f22ccdcb5679edc`. Redesign changes are local and have not been pushed.
- Website: production Vite build passed after adding the prospective partner directory. The new `/providers` page was not visually rechecked in the browser in this pass because the local browser connection was unavailable.
- Interactions: primary demo CTA, suggested conversation, typed pizza request, save-to-collection, mobile menu, scenario tabs, and FAQ expansion verified in the in-app browser.
- Responsive: landing, pricing, and conversation views inspected at 390×844; landing and pricing did not overflow horizontally.
- Mobile: new preview entry point passed `tsc --noEmit`; iOS and Android JavaScript/Hermes exports compiled successfully with one Metro worker and no minification due to host memory pressure.
- Not performed: simulator/physical-device execution, signed APK/IPA creation, app-store submission, live backend/provider/payment integration, public deployment, conversion-rate measurement, comprehensive accessibility audit.

The low-memory bundle command is:

```sh
node --max-old-space-size=384 --max-semi-space-size=4 node_modules/expo/bin/cli export --platform ios --max-workers 1 --no-minify --output-dir <output-directory>
```

Repeat with `--platform android`. EAS configuration is included for subsequent signed builds using the owner's accounts.
