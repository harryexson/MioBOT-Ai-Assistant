# Mio AI — Mobile App (React Native / Expo)

A production-ready React Native app for iOS and Android, built with Expo, Supabase, and Stripe.

## Quick start

### 1. Install dependencies
```bash
cd mobile
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Open `.env` and fill in your keys:
- **Supabase URL + anon key** — from [supabase.com](https://supabase.com) → Project Settings → API
- **Stripe publishable key** — from [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) (use the publishable key only)
- **Mio API base URL** — your deployed backend

### 3. Set up your data store
In your Supabase project, go to **SQL Editor** and paste the contents of `supabase-schema.sql`, then click **Run**. This creates all the tables, security rules, and indexes.

### 4. Run the app

**On your phone (easiest):**
```bash
npx expo start
```
Scan the QR code with the Expo Go app (iOS App Store / Google Play).

**On iOS Simulator (Mac only):**
```bash
npx expo start --ios
```

**On Android Emulator:**
```bash
npx expo start --android
```

## Building for the App Store / Google Play

### Install EAS CLI
```bash
npm install -g eas-cli
eas login
eas build:configure
```

### Build Android APK
```bash
eas build --platform android
```

### Build iOS IPA (requires Apple Developer account)
```bash
eas build --platform ios
```

## Project structure

```
mobile/
  App.tsx                          # Root — Stripe + auth + navigation
  app.json                         # Expo config (bundle IDs, permissions, plugins)
  supabase-schema.sql              # Run once in Supabase SQL Editor
  .env.example                     # Copy to .env and fill in your keys
  src/
    screens/
      OnboardingScreen.tsx         # 5-step onboarding (welcome → interests → voice → account → done)
      HomeScreen.tsx               # Home with categories, AI picks, recent conversations
      ChatScreen.tsx               # AI chat with voice, quick replies, and result cards
    navigation/
      AppNavigator.tsx             # Stack + bottom tab navigation
    services/
      supabase.ts                  # Auth, profiles, conversations, orders
      mioApi.ts                    # Mio AI engine: chat, shopping, hotels, flights, food, events
      stripe.ts                    # Payment sheet, Apple Pay, Google Pay
    store/
      useStore.ts                  # Zustand global state (auth, conversation, cart)
```

## API integrations (ready to connect)

All integrations are scaffolded in `src/services/mioApi.ts`. Your backend handles the actual API calls and secret keys — the mobile app only talks to your own Mio API server.

| Service | Provider | Sign up |
|---------|----------|---------|
| Hotels | Amadeus | [developers.amadeus.com](https://developers.amadeus.com) |
| Flights | Amadeus Flight Offers | [developers.amadeus.com](https://developers.amadeus.com) |
| Restaurants | Yelp Fusion | [fusion.yelp.com](https://fusion.yelp.com) |
| Shopping | RapidAPI retailers | [rapidapi.com](https://rapidapi.com) |
| Payments | Stripe | [stripe.com](https://stripe.com) |
| Auth + data | Supabase | [supabase.com](https://supabase.com) |
| Maps | Google Maps | [console.cloud.google.com](https://console.cloud.google.com) |
