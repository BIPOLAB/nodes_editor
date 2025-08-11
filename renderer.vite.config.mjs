import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';
import path, { resolve } from 'node:path';

export const rendererConfig = ({ outDir = '', additionalPlugins = [] } = {}) => ({
  plugins: [
    svelte({
      preprocess: preprocess({ postcss: true }),
    }),
    ...additionalPlugins,
  ],
  publicDir: 'assets',
  build: {
    rollupOptions: {
      input: { index: resolve(__dirname, 'src/renderer/index.html') },
    },
    outDir: resolve(__dirname, outDir),
  },
  root: resolve(__dirname, 'src/renderer'),
  resolve: {
    alias: { '@': path.resolve('src/renderer') },
  },
  target: 'chrome104',
  envPrefix: 'VITE_',
});
