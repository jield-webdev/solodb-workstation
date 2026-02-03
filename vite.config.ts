import { defineConfig, loadEnv } from "vite";
import path from "node:path";
import react from "@vitejs/plugin-react";
import type {} from "vitest/config";

// https://vite.dev/config/
// @ts-ignore
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const useLocalSolodb = env.VITE_USE_LOCAL_SOLODB === "true";
  const localSolodbRoots = [
    path.join(__dirname, "../solodb-react-components"),
    path.join(__dirname, "../solodb-typescript-core"),
  ];

  return {
    plugins: [react()],
    build: {
      outDir: "dist/web",
    },
    resolve: {
      // Path aliases for cleaner imports
      alias:
        useLocalSolodb
          ? {
              // In development, override the @ alias to point to the main src
              // Use local source code for these libraries
              "@jield/solodb-react-components": path.join(
                localSolodbRoots[0],
                "src"
              ),
              "@jield/solodb-typescript-core": path.join(
                localSolodbRoots[1],
                "src"
              ),
            }
          : {},
      // Ensure only one copy of React is used (prevents "invalid hook call" errors)
      dedupe: ["react", "react-dom"],
    },
    test: {
      environment: "jsdom",
      globals: true,
      coverage: {
        provider: "v8",
        reporter: ["text", "html"],
      },
    },
  };
});
