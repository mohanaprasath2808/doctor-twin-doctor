# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`doctor-twin-app` — the doctor-facing Expo / React Native client for the Doctor Twin project (`github.com/sphinx-medical-technologies/doctor-twin-app`). Expo SDK 54, React Native 0.81, React 19, TypeScript strict, New Architecture enabled.

It sits inside the `doctor-twin-project/` umbrella folder alongside two sibling repos (`doctor-twin-be`, a Node/Express API, and `doctor-twin`, a PHP prototype + requirements archive). There is no root repo and no cross-repo build; see `../CLAUDE.md` for workspace-level context. **This app is not wired to any backend** — there is no HTTP client, no fetch/axios call, no token storage, and no `.env` anywhere in `src/`. Everything on screen is local state or hardcoded arrays.

## Commands

```bash
npm install         # package-lock.json is the lockfile here — npm, not yarn
npm start           # expo start (Expo Go / dev client)
npm run web
npx tsc --noEmit    # the only type check; there is no lint or test script
```

`npm run ios` / `npm run android` map to `expo run:ios` / `expo run:android`, **not** `expo start --ios`. There are no `ios/` or `android/` directories committed, so those commands trigger a prebuild and a full native build. For day-to-day work use `npm start`.

There is no test framework, no ESLint config, and no `babel.config.js`. If you add `react-native-reanimated` worklets (the dep is installed but currently unused anywhere in `src/`), you must create `babel.config.js` with the plugin — nothing exists to extend.

## Architecture

### Navigation is a stack swap, not a guarded route

`App.tsx` nests: `ToastProvider → GestureHandlerRootView → NavigationContainer → AppContextProvider → AuthContextProvider → Router`.

`src/router/Router.tsx` picks between two entirely separate navigators based on `useRoute()`, which reads the single `isLogin: boolean` from `AuthContext`:

```
isLogin === false → AuthStack (Login, SignUp, OtpVerification, ForgotPassword, ResetPassword)
isLogin === true  → AppStack  (Home, PracticeIntelligence, ReportHub)
```

Login "happens" in `OtpVerification.tsx`: `handleVerify` calls `setIsLogin(true)` with no validation of the entered OTP. There is no token, no persistence, no logout path. When real auth lands, this is the seam — `AuthContext` and `useRoute`.

Route names always come from `src/constants/navigationStrings.tsx`; never inline a screen-name string. Note `QUEUE` and `PATIENTS` are declared there and the screens exist (`src/screens/App/Queue.tsx`, `Patients.tsx`) but are **not registered in `AppStack`** — navigating to them throws.

### Filename collision to watch

Both `src/screens/App/Home.tsx` (the real 482-line home screen) and a `src/screens/App/Home/` directory (holding `PracticeIntelligence.tsx` and `ReportHub.tsx`) exist. `AppStack` imports `"../../screens/App/Home"`, which Metro resolves to **`Home.tsx`**, not the directory. Adding a `Home/index.tsx` would silently change what the Home route renders.

### Two contexts, both plain `useState`

- `AuthContext` — `isLogin` only.
- `AppContext` — `notificationsData` / `messagesData`, both `{ id, title }[]` initialized to `[]`. `Home.tsx` derives its Messages badge from `messagesData.length`, so the badge is permanently absent until something populates it.

Consumers use `useContext` directly and throw if the provider is missing (see `Home.tsx`, `OtpVerification.tsx`) — there are no `useAuth()` / `useApp()` hooks; `useRoute()` is the only wrapper.

### Neumorphic UI — two different shadow techniques

`src/neomorphism/` is the design-primitive layer. Build new surfaces from these rather than hand-rolling shadows, and be aware they split into two families:

**Skia-based** (`@shopify/react-native-skia` `Canvas` + `RoundedRect` + `Shadow`/`LinearGradient`): `NeumorphicView` (outer drop shadow), `InnerShadowView` (pressed/inset look), `NeumorphicCircle`, `ReusableButton`. These need **explicit pixel width/height** and each reserves extra canvas beyond the visual box for the shadow to bleed into — `NeumorphicView` adds `BOTTOM_SHADOW_HEIGHT = 24` to canvas height, `ReusableButton` pads `SHADOW_PADDING = 10` on all sides and absolutely positions the canvas at `-10,-10`, `NeumorphicCircle` uses `size + 40`. Getting layout right means accounting for that padding, not just the nominal size.

**Plain RN View + `react-native-linear-gradient`** (stacked absolutely-positioned layers with `shadowColor`/`elevation`): `IconComponent`, `InnerShadowIcon`. These accept normal props and are what the round icon buttons use.

Because Skia canvases need numeric dimensions, percentage-width components measure themselves first: `InputField` and `ReusableButton` both hold a `useState` width filled by `onLayout` and render nothing on the canvas until `width > 0`. Copy that pattern for any new full-width Skia surface.

`InputField` also swaps `NeumorphicView` (raised) for `InnerShadowView` (inset) on focus — that focus-state flip is the house style for inputs.

### Conventions

- Colors come from `COLORS` in `src/constants/theme.ts`. Some screens still pass raw hexes (`"#2E3A8C"` for buttons) — prefer `COLORS`.
- SVGs import as React components (`import MailIcon from '.../mailIcon.svg'`), enabled by `metro.config.js`, which swaps `react-native-svg-transformer` in as the babel transformer and moves `svg` from `assetExts` to `sourceExts`. Icons live in `src/assets/icon/`.
- Screens are `src/screens/Auth/*` and `src/screens/App/*`; shared pieces in `src/components/Auth/` and `src/components/Common/`.
- Every screen wraps in `SafeAreaView` from `react-native-safe-area-context` and forms wrap in `neomorphism/KeyboardAvoidingWrapper` (KeyboardAvoidingView + ScrollView).
- `useNavigation<any>()` is the norm — there is no typed param list.
- Font `Manrope-Medium` is referenced in `App.tsx`'s toast style but **no font loading exists**, so it silently falls back to the system font.
- `src/screens/Auth/SignUp.jsx` is the one `.jsx` file in an otherwise `.tsx` codebase.

### Installed but unused

`@gorhom/bottom-sheet`, `react-native-otp-entry` (the OTP boxes in `components/Auth/OtpTextInput.tsx` are hand-rolled `TextInput`s), `react-native-reanimated` + `react-native-worklets`, `@react-navigation/bottom-tabs`, `@react-navigation/stack` (only `native-stack` is used). `neomorphism/DatePickerField.tsx` and `NeumorphicCircle.tsx` are near-unused. Don't assume a dep being present means a pattern is established. Conversely, `Home.tsx` imports `@expo/vector-icons`, which is **not** in `package.json` — it resolves transitively through `expo`.

## Line endings

This repo lives on a Windows Dropbox path accessed through WSL. Local git config is already set to `core.autocrlf=input` + `core.eol=lf`, which keeps the working tree clean; there is no committed `.gitattributes` (deliberately — that's a team-wide decision). If a large unexplained diff appears, check it with `git diff --ignore-cr-at-eol --stat` — empty output means line endings only.

Git history understates the repo: the single commit is "Add initial Expo React Native scaffold", but the working tree holds the full screen and component set. Do not infer project state from the log.

## Safety requirements carry over

Any AI-facing feature added here (triage, chat, scribe, hands-free mode) must carry forward the emergency detection, stop triggers, controlled-substance routing, and output guardrails specified in `../doctor-twin/docs/vault/safety/` and implemented in `../doctor-twin/lib/DrTwinAI.php`. Pre-checks run before the model call and return immediately; model output is validated against blocked phrases before it reaches a user. These are product requirements, not prototype scaffolding. UI specs for this app live in `../doctor-twin/docs/MOBILE_APP_UI_SPEC.md`.
