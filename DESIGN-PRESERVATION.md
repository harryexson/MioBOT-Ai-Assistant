# Mio design preservation

Retained: the existing warm-white and violet composition, portrait, hero headline, floating request and result cards, native welcome artwork, restored routes, and sample feature flows.

Portrait: `public/images/mio-portrait.png` and `mobile/assets/mio-portrait.png`
Both SHA-256: `DDB0DE0B929B5B99355EB357B1CC96EFC61AA86D35D26169B94DA230A5913AC9`

Preserved routes: `/`, `/app`, `/onboarding`, `/features`, `/providers`, `/easytap`, `/developers`, `/widget`, `/pricing`, `/business`, `/settings`, `/merchant`, `/admin`, `/checkout`, `/privacy`, `/terms`.

Web motion: `src/motion.css` and `src/components/useLandingMotion.js`. Progressive scroll reveals, shallow mouse perspective, layered glass cards, perspective product displays, and short press feedback. Content remains available when motion is paused, reduced motion is enabled, or IntersectionObserver is unsupported. No runtime libraries added.

Native: React Native Animated with the native driver. The dimensional orb performs one short arrival movement and settles. AccessibilityInfo disables it under reduced motion. Existing flows, saved items, settings, provider examples, and reset behavior remain in the active entry point.

Showcase: `brag-output/` contains the plan, actual UI captures, rendering source, verification results, share copy, and rendered outputs.
