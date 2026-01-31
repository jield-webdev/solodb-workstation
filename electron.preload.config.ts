import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  build: {
    outDir: ".vite/preload",
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "electron/src/preload.ts"),
      formats: ["cjs"],
      fileName: () => "preload.cjs",
    },
    rollupOptions: {
      external: ["electron"],
    },
  },
});
