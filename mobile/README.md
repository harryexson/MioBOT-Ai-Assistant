# Mio mobile preview

A native Expo / React Native experience for iOS and Android, with matching violet branding and a custom portrait welcome screen.

## Run

```sh
npm install
npm start
```

This project uses Expo SDK 57 and the current Expo Go-compatible React Native runtime. Personal and business account screens use the same Better Auth API as the website. Set `EXPO_PUBLIC_API_URL` in a local `.env` file to the deployed Vercel site URL; the backend also needs Neon and the environment values described in `../VERCEL-SETUP.md`.

It includes welcome, 11 everyday service use cases, sample conversations, save/unsave, a saved collection, editable preferences, a provider directory, account creation/sign-in, privacy information, and reset flows. Auth cookies are stored using Expo SecureStore. Voice mode uses the device speech recognizer after the user taps the microphone and grants permission; the recognized transcript is shown before Mio sends it to the configured AI backend. Spoken responses use the device's text-to-speech engine. A native development or EAS build is required for speech recognition; Expo Go does not include this native module. No order, booking, payment, or NFC transaction is executed by the preview. Saved picks, conversations, and preferences are held in memory for the current run. Provider names in the mobile preview are concepts and are not connected integrations.

## Checks and native builds

```sh
npm run typecheck
npx expo export --platform ios --platform android
npx eas-cli login
npx eas-cli init
npm run build:android
npm run build:ios
```

`expo export` verifies JavaScript bundling; it does not produce an installable app. Sign in with your own Expo account, then run `eas init` once to create/link the EAS project and add its project ID to `app.json`. `npm run build:android` creates an internal-distribution APK you can download and install on an Android device. For iOS, EAS needs Apple signing credentials; internal device builds also require registered devices. Store publishing is not configured.

Better Auth account creation and sign-in are implemented. They require the Vercel API and Neon database setup before they can be used. The web routes `/merchant` and `/admin` are sample dashboards for design review and contain mock data; they do not provide secure business administration or platform admin access. Keep all server secrets out of the app and Git.

`tsconfig.json` checks the active app and its auth service. The preserved legacy screens are not included in that check and require a separate integration audit. `LegacyApp.tsx` preserves the original Supabase/Stripe entry point; do not switch to it until valid configuration and backend services exist.

## Assets

`assets/mio-portrait.png` is the project’s custom AI-generated portrait. App icon and store artwork are launch tasks. The config does not reference the missing placeholder icon/splash files from the original repository.
