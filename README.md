# Skinalyze AI

A React Native (Expo) mobile app prototype for skin condition analysis:
capture or upload a photo, get a prediction with a confidence score, and
chat with an assistant about common skin conditions.

**This public repo is a sanitized version of a working prototype.** The
original app called an external image-classification API and used Firebase
Auth + Firestore for accounts and history. For this public release, no
credentials or private backend endpoints are included:

- `app/analyze.tsx` — the external classification API call has been
  replaced with a local mock (matches keywords in the file name, not real
  image content) so the UI flow is runnable without a backend.
- `app/chat.tsx` — the chat assistant is a small local keyword-matcher
  instead of a live model, for the same reason.
- `app/config/firebase.ts` — Firebase config reads from environment
  variables with placeholder fallbacks; plug in your own Firebase project
  to get working auth.

In short: the UI, navigation, auth flow, and app structure are real and
runnable end to end. The "AI" in this public version is a stand-in for the
model/API that isn't included here.

## Features

- Email/password authentication (Firebase Auth), with local session storage
- Camera or photo-library image capture for analysis
- Prediction result card with confidence score and a "learn more" link
- Chat screen for asking about common skin conditions
- Reference screen covering several skin-presenting conditions (Mpox,
  Chickenpox, Measles, Cowpox, HFMD)
- Form validation with password-strength requirements

## Tech stack

Expo (React Native), TypeScript, Expo Router, NativeWind (Tailwind for RN),
Firebase (Auth/Firestore, optional), `expo-image-picker`, `expo-camera`.

## Project structure

```
skinalyze-ai/
├── app/
│   ├── index.tsx           # Welcome screen
│   ├── login.tsx           # Login
│   ├── signup.tsx          # Signup
│   ├── forgot-password.tsx # Password reset
│   ├── change-password.tsx # Password change
│   ├── home.tsx             # Home / dashboard
│   ├── analyze.tsx          # Image capture + (mocked) prediction
│   ├── chat.tsx              # Chat assistant (local mock)
│   ├── about.tsx             # Skin condition reference
│   ├── config/
│   │   └── firebase.ts       # Firebase config (env-driven, no secrets committed)
│   └── utils/
│       ├── auth.ts           # Auth helpers
│       └── validation.ts     # Form validation
├── assets/                   # Icons and images
└── package.json
```

## Prerequisites

- Node.js (v16+)
- npm
- Expo CLI (`npm install -g expo-cli`)
- Git

## Installation

```bash
git clone https://github.com/sabhierfan/Skin_Analyze.git
cd Skin_Analyze
npm install
```

## Running the project

```bash
npx expo start
```

- **Android**: scan the QR code with the Expo Go app
- **iOS**: scan the QR code with the Camera app
- Press `a` for Android emulator, `i` for iOS simulator, `w` for web

### Using your own Firebase project (optional)

Auth works out of the box with a local session fallback, but to use real
Firebase Auth/Firestore, set these environment variables (e.g. in a local
`.env` file, already gitignored) before starting:

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
```

### Running on a physical device over local network

1. Find your machine's local IP (`ipconfig` on Windows, `ifconfig`/`ip addr`
   on Mac/Linux).
2. `npx expo start --host <your-local-ip>`
3. In Expo Go, open `exp://<your-local-ip>:19000`.

## Password requirements

- Minimum 8 characters
- At least one uppercase letter, one lowercase letter, one number, one
  special character

## Troubleshooting

- Dependency issues: `npm cache clean --force && rm -rf node_modules && npm install`
- App won't connect to the dev server: confirm both devices are on the
  same network and check firewall rules
- iOS simulator: make sure Xcode is installed (`xcode-select --install`)
- Android emulator: make sure Android Studio is installed and
  `ANDROID_HOME` is set

## Disclaimer

This app does not provide real medical predictions in its public form (see
above) and, even with a real model wired in, is not a substitute for
professional medical diagnosis.

## License

MIT — see [LICENSE](LICENSE).
