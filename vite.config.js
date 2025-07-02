import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // load .env variables
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
    define: {
      __VITE_BACKEND_URL__: JSON.stringify(env.VITE_BACKEND_URL),
    },
  };
});
