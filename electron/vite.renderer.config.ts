import { defineConfig, mergeConfig, UserConfig } from "vite";
import { default as baseConfig } from "../vite.config";

const rendererConfig = defineConfig({
    base: './',
    build: {
        outDir: "dist/electron"
    }
})

export default defineConfig((env) => {
  return mergeConfig(baseConfig(env), rendererConfig)
})
