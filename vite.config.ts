import { sentryVitePlugin } from '@sentry/vite-plugin';
/// <reference types="vitest" />

import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sentryVitePlugin({
      org: 'nabin-yj',
      project: 'javascript-react',
    }),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },

  server: {
    host: '0.0.0.0',
    allowedHosts: ['env-7444178.ktm.yetiappcloud.com'],
    port: 5173,
    watch: {
      usePolling: true,
    },
  },

  preview: {
    host: '0.0.0.0',
    port: 4173,
  },

  build: {
    sourcemap: true,
  },
});
