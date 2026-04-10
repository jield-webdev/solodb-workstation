import { defineConfig, mergeConfig } from "vite";
import { default as baseConfig } from "../vite.config";

const rendererConfig = defineConfig({
  base: "./",
  build: {
    outDir: ".vite/renderer/main_window",
  },
});

export default defineConfig((env) => {
  return mergeConfig(baseConfig(env), rendererConfig);
});
