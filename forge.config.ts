import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { VitePlugin } from '@electron-forge/plugin-vite';
import type { ForgeConfig } from '@electron-forge/shared-types';

const makers = [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerDeb({})];

if (process.env.BUILD_RPM === 'true') {
  makers.push(new MakerRpm({}));
}

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers,
  outDir: "electron-out",
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new VitePlugin({
      build: [
        {
          entry: 'electron/src/main.ts',
          config: './electron.main.config.ts',
        },
        {
          entry: 'electron/src/preload.ts',
          config: './electron.preload.config.ts',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'electron/vite.renderer.config.ts',
        },
      ],
    }),
  ],
};

export default config;
