import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    main: 'src/electron/main.ts',
    preload: 'src/electron/preload.ts',
  },
  outDir: 'dist-electron',
  format: ['cjs'],         // Electron espera CJS en main
  platform: 'node',
  target: 'node22',
  sourcemap: true,
  clean: true,
  dts: false,
  minify: false,
  external: ['electron'],  // no bundlear electron
  treeshake: false,
  splitting: false,
  shims: false,
  watch: process.env.WATCH === 'true'
});
