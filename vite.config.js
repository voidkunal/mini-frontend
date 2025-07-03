// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    https: true, // ✅ optional during dev (if you self-sign), but not needed in Vercel
    origin: 'https://mini-frontend-green.vercel.app',
  },
  build: {
    outDir: 'dist',
  },
});
