# CLAUDE.md

## Project Overview

**solodb-workstation** is a hybrid desktop/web application providing operators with an interface to interact with SoloDB devices. It runs as both a React SPA (deployed to Azure Static Web Apps) and an Electron desktop app from a single shared codebase.

## Tech Stack

- **Frontend:** React 19, TypeScript 5, React Router 7
- **State/Data:** TanStack React Query 5, React Context API
- **UI:** Bootstrap 5, TanStack Table
- **HTTP:** Axios
- **Build:** Vite (rolldown-vite), Electron Forge
- **Testing:** Vitest, Testing Library, jsdom
- **Package Manager:** Yarn 4 (Corepack)
- **Internal packages:** `@jield/solodb-react-components`, `@jield/solodb-typescript-core`

## Common Commands

```bash
yarn dev               # Start web dev server
yarn build             # Production build (tsc + vite)
yarn test              # Run tests once
yarn lint              # Run ESLint
yarn electron:dev      # Start Electron dev mode
yarn electron:build    # Build Electron distributable
```

## Project Structure

```
src/
├── app/               # App shell, routes, providers, pages
├── auth/              # Auth context, hooks, helpers
├── device/            # Device context, hooks, helpers
├── modules/           # Dynamic module system
├── components/        # Shared UI components
├── helpers/           # Utility functions (runtimeConfig, themeMode, cookies, electron)
├── types/             # TypeScript type definitions
└── main.tsx           # Entry point

electron/
├── src/               # Main process, preload, IPC setup
└── vite.*.config.ts   # Electron-specific Vite configs
```

## Architecture Notes

### Dual Runtime
- Uses `isElectronActive()` to detect environment
- `HashRouter` for Electron (file:// protocol), `BrowserRouter` for web
- Token storage: cookies (web) vs. encrypted config file (Electron)

### Module System
Modules are React components registered in `src/modules/moduleComponentsImports.ts`. To add a module:
1. Create component in `src/modules/`
2. Register it in `moduleComponentsImports.ts`
3. The module will appear automatically on devices configured with it via `workstation_components`

### Auth Flow
Token-based: stored refresh token → exchange for access token → configure axios headers → fetch current user via `getMe()`.

### Routing
| Path | Auth | Description |
|------|------|-------------|
| `/login` | No | Login page |
| `/dashboard` | Yes | Device list |
| `/device/:id` | Yes | Device detail with modules |
| `/session` | Yes | User session info |

## Environment Variables

```
VITE_BASE_URL                     # Backend server URL
VITE_USE_LOCAL_SOLODB             # Use local library versions
VITE_DEV_AUTH_TOKEN               # Dev auth token (mock login)
VITE_USER_MANAGER_TOKEN           # User manager token
VITE_USER_MANAGER_OAUTH_CLIENT_ID # OAuth client ID
```

## Testing

Tests use Vitest with jsdom. Run `yarn test`. Coverage with `v8` provider. Existing tests in `src/helpers/`.

## CI/CD

GitHub Actions deploys to Azure Static Web Apps on push to `main` or `develop`. Build output is `dist/web/`.
