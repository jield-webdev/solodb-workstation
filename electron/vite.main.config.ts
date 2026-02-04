import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  build: {
    outDir: ".vite/build",
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["electron"],
    },
  },
});
