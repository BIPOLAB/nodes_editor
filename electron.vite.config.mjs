// electron.vite.config.mjs
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import path, { resolve } from 'node:path';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: 'dist/main',
      rollupOptions: { input: { index: resolve('./src/electron/main.ts') } }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      outDir: 'dist/preload',
      rollupOptions: { input: { index: resolve('src/electron/preload.ts') } }
    }
  },
  renderer: {
    root: resolve('src/renderer'),
    base: './',
    plugins: [ svelte({ preprocess: preprocess({ postcss: true }) }) ],
    build: { outDir: resolve('dist/renderer'), emptyOutDir: true }
  }
});
