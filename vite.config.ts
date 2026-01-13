import { defineConfig } from "vite";
import react from '@vitejs/plugin-react'
import type {} from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // @ts-expect-error Vitest augments Vite config at runtime; tsc does not see it here.
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
})
