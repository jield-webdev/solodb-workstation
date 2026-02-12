# SoloDB Operator Interface

## 1. Project Objective

The objective of this project is to provide operators with an efficient, secure, and extensible interface to interact with SoloDB, enabling the execution of actions on devices in a controlled, auditable, and modular manner.

## 2. Architecture Overview

The application consists of a user interface developed in **React** that can run both as a **web application** and as a **desktop application** via **Electron**, sharing a single codebase.

The application allows operators to authenticate using multiple methods and to perform actions on devices through functional modules that are dynamically loaded at runtime.

## 3. Authentication

Authentication is currently scaffolded with a mock login flow backed by a development token (`VITE_DEV_AUTH_TOKEN`).
`AuthProvider` reads the stored refresh token (cookie or Electron storage), exchanges it for an access token, and then loads the current user via the SoloDB API.

Future authentication methods (OAuth, Goldstein, SoloDB native login) can be added behind the same `AuthProvider` interface.

## 4. Routing and Device Access

The application boots at `/` and immediately redirects to `/dashboard`. Unauthenticated users are redirected to `/login` by the private route guard.

Devices are accessed using routes following the pattern:

```
/device/:id
```

When accessing a device route, the application loads the equipment record from the SoloDB API:

```ts
getEquipment({ id: Number(id) })
```

The resulting `Equipment` object drives the UI. Modules rendered on the device page are taken from `equipment.dashboard_components`.

## 5. Module System

Each device is composed of one or more functional modules.

All available modules reside in the following directory:

```
src/modules/
```

Modules are explicitly registered in `componentImports` (`src/modules/moduleComponentsImports.ts`), which acts as a whitelist of available modules.

## 6. Electron Integration

The application can be integrated with **Electron** by adding an abstraction layer over Electron-specific features.  
This approach allows the same codebase to be used for both the web version and the Electron desktop version without modification.
