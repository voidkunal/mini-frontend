// vite.config.js

const { defineConfig } = require('vite');
const react = require('@vitejs/plugin-react');

module.exports = defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_URL,
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});
