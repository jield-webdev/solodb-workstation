# SoloDB Operator Interface

## 1. Project Objective

The objective of this project is to provide operators with an efficient, secure, and extensible interface to interact with SoloDB, enabling the execution of actions on devices in a controlled, auditable, and modular manner.

## 2. Architecture Overview

The application consists of a user interface developed in **React** that can run both as a **web application** and as a **desktop application** via **Electron**, sharing a single codebase.

The application allows operators to authenticate using multiple methods and to perform actions on devices through functional modules that are dynamically loaded at runtime.

## 3. Authentication

The application supports multiple authentication methods, including:

- OAuth  
- Goldstein  
- SoloDB native login  

Authentication state is managed centrally using a shared **React Context** for all authentication methods.  
This context exposes a unified interface (`AuthProvider`) to the rest of the application, abstracting and hiding the implementation details from individual modules.

## 4. Routing and Device Access

By default, the application starts at the `/login` route, where the operator can authenticate using any of the supported methods.

After a successful login:

- If the authentication method supports it and a valid return route exists, the user is redirected to `/device/:id`.
- Otherwise, the user is redirected to `/dashboard`.

Devices are accessed using routes following the pattern:

```
/device/:id
```

When accessing a device route, the application invokes the following function:

```ts
getDevice(deviceId, userContext)
```

This function returns a `DeviceSummary`, including the device metadata and the list of module IDs that must be loaded for the specified device, taking into account both the device configuration and the user’s permissions.

In the initial implementation, this information is obtained from a static JSON file.  
The architecture is designed so that this data source can later be replaced by an API call without impacting the rest of the application.

## 5. Module System

Each device is composed of one or more functional modules.

All available modules reside in the following directory:

```
src/modules/
```

Modules are explicitly registered in a `moduleRegistry`, which acts as a whitelist of available modules.

## 6. Electron Integration

The application can be integrated with **Electron** by adding an abstraction layer over Electron-specific features.  
This approach allows the same codebase to be used for both the web version and the Electron desktop version without modification.
