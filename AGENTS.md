# AGENTS.md

## Project Overview
- SoloDB Workstation is an operator interface for SoloDB.
- The same React codebase runs in two targets:
  - Web (Vite)
  - Desktop (Electron + Electron Forge)
- Device pages render modules dynamically from backend-provided module names.

## Development Commands
- Start web app: `yarn dev`
- Start Electron app (dev): `yarn electron:dev`
- Build web app: `yarn build`
- Build Electron distributables: `yarn electron:build`
- Preview production web build: `yarn preview`

## Quality Checks
- Lint: `yarn lint`
- Tests: `yarn test`
- Before finalizing code changes, run at least lint and tests.
- If runtime behavior changes, add/update tests (see `src/helpers/runtimeConfig.test.ts`).

## Architecture Map
- `src/app/`: app shell, providers, routes, pages
- `src/auth/`: auth context/hooks/helpers
- `src/modules/`: dynamic module components and registry
- `src/helpers/runtimeConfig.ts`: runtime server config and axios base URL setup
- `electron/src/`: main, preload, IPC, and desktop-specific config

## Dynamic Module System
- Modules are selected from `equipment.dashboard_components`.
- Add module components under `src/modules/`.
- Register each module in `src/modules/moduleComponentsImports.ts`.
- Keep registry keys stable; backend module names must match exactly.

## Web and Electron Integration Rules
- Keep renderer code compatible with both browser and Electron.
- Access native features only through `window.electronAPI`.
- For new Electron bridge APIs, update all of:
  - `electron/src/preload.ts`
  - `electron/src/setup-ipc.ts`
  - `src/types/electronApi.ts`
  - `src/types/electron.d.ts`
- Guard desktop-specific logic with `isElectronActive()`.

## Code Style and Scope
- TypeScript strict mode is enabled; avoid `any` unless unavoidable.
- Respect existing file-local style and avoid unrelated formatting churn.
- Prefer small, focused diffs.
- Do not edit generated/build outputs (`dist/`, `.vite/`, `node_modules/`).

## Security and Secrets
- Never commit secrets or `.env`.
- Treat `VITE_DEV_AUTH_TOKEN` as sensitive.
- Avoid logging access or refresh tokens.
- Preserve encrypted Electron token storage (`electron/src/config/encryptedConfig.ts`).

## Documentation Maintenance
- If workflows, architecture, or commands change, update `AGENTS.md` and `README.md` together.
