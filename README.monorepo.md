# Doctor Twin Monorepo

This repository is now structured as a monorepo with independent apps:

- `apps/doctor` (existing app, migrated)
- `apps/patient` (scaffold)
- `apps/staff` (scaffold)

## Run commands

- Start doctor app: `npm run doctor:start`
- Run doctor on Android: `npm run doctor:android`
- Run doctor on iOS: `npm run doctor:ios`

## Notes

- `apps/patient` and `apps/staff` currently contain placeholder `package.json` files only.
- Add Expo app files inside each app folder when you are ready to implement them.
