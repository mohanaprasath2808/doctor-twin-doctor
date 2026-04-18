# Doctor Twin Monorepo

This repository is organized as an npm workspace monorepo for three Expo apps:

- `apps/doctor`
- `apps/patient`
- `apps/staff`

Shared monorepo configuration lives in `packages/config`.

## Folder structure

```text
.
├── apps/
│   ├── doctor/
│   ├── patient/
│   └── staff/
├── packages/
│   └── config/
└── scripts/
    └── run-workspace-app.mjs
```

## Install dependencies

Run installs from the repository root so npm can keep the workspace lockfile consistent:

```bash
npm install
```

## Run the apps

Generic root commands:

```bash
npm run start -- doctor
npm run android -- doctor
npm run ios -- doctor

npm run start -- patient
npm run android -- patient
npm run ios -- patient

npm run start -- staff
npm run android -- staff
npm run ios -- staff
```

Per-app shortcuts are also available:

```bash
npm run doctor:start
npm run doctor:android
npm run doctor:ios

npm run patient:start
npm run patient:android
npm run patient:ios

npm run staff:start
npm run staff:android
npm run staff:ios
```

For native builds (without opening Metro), use:

```bash
npm run android -- doctor
npm run ios -- doctor
```

Replace `doctor` with `patient` or `staff` as needed.

## Add packages in the monorepo

Install a dependency into one specific app:

```bash
npm install -w @doctor-twin/doctor <package>@<version>
npm install -w @doctor-twin/patient <package>@<version>
npm install -w @doctor-twin/staff <package>@<version>
```

Install a dev dependency into one specific app:

```bash
npm install -D -w @doctor-twin/doctor <package>@<version>
```

Install a dependency into the shared config workspace:

```bash
npm install -w @doctor-twin/config <package>@<version>
```

Install a root-only dev tool (lint, commit tooling, etc.):

```bash
npm install -D -W <package>@<version>
```

## Remove unwanted node_modules

If workspace modules drift or stale app-level modules appear, run:

```bash
npm run clean:modules
npm install
```

Or run both in one command:

```bash
npm run clean:workspace
```

## Important notes

- Do not install app runtime dependencies at the repo root. App dependencies should stay owned by the app workspace that uses them.
- The three apps intentionally do not share every React Native dependency version. The workspace uses npm `install-strategy=nested` so each app can keep its required native package versions without cross-app version collisions.
- `packages/config` centralizes Metro, Babel, and TypeScript setup so workspace changes can be made once and reused by all apps.
- This repo uses an app-level native strategy: native folders live under each app (`apps/*/ios`, `apps/*/android`), and no root-level native app folders are used.
- When adding native dependencies, re-run the relevant iOS/Android native install step for the affected app before creating a production build.
- npm currently warns about an external `devdir` config in your environment (`Unknown env config "devdir"`). This does not block workspace operation, but should be cleaned up in your npm environment later.
