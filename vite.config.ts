import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron/simple'
import type {} from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  // @ts-expect-error Vitest augments Vite config at runtime; tsc does not see it here.
  plugins: [
    react(),
    process.env.ELECTRON && electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/src/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use `build.rollupOptions.input` instead `build.lib.entry`.
        input: 'electron/src/preload.ts',
      },
      // ProwebRenderer: true,
    }),
  ].filter(Boolean),
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
})
