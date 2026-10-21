# Mio API integration plan

Updated 21 October 2026. “Free” below means a sandbox, evaluation quota, or limited developer tier; it does not mean a production commercial entitlement, live booking rights, or affiliate commission.

## Best first integrations

| Provider | Useful Mio feature | What can be tested | What blocks production |
| --- | --- | --- | --- |
| Amadeus for Developers | Flight and hotel discovery | Self-Service APIs provide test data and a free monthly quota; live production has a free quota as well. | Create an Amadeus developer account, register an app, and move it to production. Test inventory is limited and differs from live inventory. Exceeding the production free quota can incur usage charges. |
| Ticketmaster Discovery API | Event search | Public event, venue, attraction and classification search; default quota is 5,000 calls/day and 2 requests/second. | Register an API key. Discovery is not ticket checkout; commerce APIs and affiliate monetization require partner access. |
| Square Sandbox | Test merchant catalog, orders and payment flow | Free isolated environment with unlimited sandbox calls and test payments. | Create a Square developer account/app. Production payments require seller onboarding and incur processing fees. Tokens stay server-side. |
| eBay Buy APIs | Product search and sandbox commerce | Developer accounts can test many Buy API functions in the Sandbox with test data and test money. | Production Buy API access is limited to approved partners. Affiliate links require eBay Partner Network membership; checkout methods need additional approval and contracts. |
| Yelp Places API | Local business discovery | Evaluation trial offers up to 5,000 calls over 30 days. | Yelp explicitly limits that trial to evaluation, not commercial deployment. Commercial use needs a paid/approved plan and must meet content display and caching rules. |
| OpenWeather | Weather-aware trip suggestions | Free tier includes current weather and forecast products with an API key and defined request limits. | Register for a key; protect it behind the server. Confirm the current licence, plan, and attribution requirements before commercial launch. |

## Named programs that require partner access

DoorDash Drive offers a sandbox and delivery simulator, but its APIs are limited-access and production access requires a review. The published docs currently say production access is restricted and have no certification timeline. DoorDash Drive is delivery logistics, not a general restaurant/menu/food marketplace API.

Booking.com Demand API requires a Managed Affiliate Partner account, partner-center access, an API token, and affiliate ID before using even the sandbox. Expedia Rapid requires partner approval and a site review before production credentials are enabled. Amazon's Creators API requires an Associates account and API eligibility; current docs say API eligibility requires 10 qualified sales in the trailing 30 days. None should be presented as an already connected integration.

## Architecture and secrets

The web app and Expo app are clients. Never place Amadeus client secrets, eBay client secrets, Square access tokens, payment secrets, or affiliate bearer tokens in either app, a `VITE_*` variable, or a public GitHub repository. Mio's active backend is being moved to Vercel Functions + Neon Postgres. The Vercel API authenticates account requests, stores account history and applications, and keeps provider credentials server-side. Provider search and commerce connectors are still not implemented; the interactive search and commission figures remain sample data.

The former PocketBase hostname (`pb-mzj62.aibuilder.ionos.com`) failed DNS resolution, so there is no confirmed live PocketBase export to migrate. New Neon tables start empty. A separate data export is needed if the old backend becomes reachable and contains records worth retaining.

## Suggested rollout

1. Connect Neon to the Vercel project, apply `database/schema.sql`, and set the server environment variables in `VERCEL-SETUP.md`. Verify account creation, sign-in, session persistence, waitlist submissions, partner applications, and account-scoped history before adding live providers.
2. Register developer apps for Amadeus, Ticketmaster, eBay Sandbox, and Square Sandbox. Keep all secret credentials out of chat and source files; configure them as Vercel server environment variables.
3. Build and test one server-side connector at a time, beginning with non-purchase discovery. Add provider attribution, rate-limit handling, privacy notices, and monitoring.
4. Apply to the required affiliate/partner programs after the user journey and company website are reviewable. Do not rely on advertised commission percentages until a signed program agreement confirms them.
5. Complete payment, order confirmation, refunds, support, privacy/legal, security, accessibility, and app-store reviews before production release.

## Official documentation checked

- [Amadeus Self-Service API FAQ](https://admin.developers.amadeus.com/self-service/apis-docs/guides/developer-guides/faq/)
- [Ticketmaster API getting started and quotas](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/)
- [Ticketmaster Discovery API](https://developer.ticketmaster.com/products-and-docs/apis/discovery-manual/v2/)
- [Square Sandbox](https://developer.squareup.com/docs/devtools/sandbox/overview)
- [eBay Buy API requirements](https://developer.ebay.com/api-docs/buy/buy-requirements.html)
- [eBay Sandbox](https://developer.ebay.com/support/tools/sandbox/)
- [Yelp Places FAQ and trial limitations](https://docs.developer.yelp.com/docs/places-faq)
- [OpenWeather pricing and free tier](https://openweathermap.org/price)
- [DoorDash Drive overview](https://developer.doordash.com/en-US/docs/drive/overview/about_drive/)
- [DoorDash production access](https://developer.doordash.com/en-US/docs/drive/how_to/get_production_access/)
- [Booking.com Demand API prerequisites](https://developers.booking.com/demand/docs/getting-started/prerequisites)
- [Expedia Rapid API onboarding](https://developers.expediagroup.com/docs/products/rapid/setup/getting-started)
- [Amazon Creators API onboarding](https://affiliate-program.amazon.com/creatorsapi/docs/en-us/onboarding)
- [Amazon Creators API eligibility](https://affiliate-program.amazon.com/creatorsapi/docs/en-us/troubleshooting/error-codes-and-messages)
