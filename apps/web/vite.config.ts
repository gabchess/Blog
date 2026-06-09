import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Chrome's Private Network Access (PNA) requires these headers on preflight
// responses for public origins (e.g. app.safe.global) to reach localhost.
function safeAppCors(): Plugin {
  return {
    name: 'safe-app-cors',
    configureServer(server) {
      server.middlewares.use((_req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Private-Network', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', '*');
        next();
      });
    },
  };
}

const port = Number(process.env.WEB_PORT) || 3000;

export default defineConfig({
  plugins: [tailwindcss(), safeAppCors(), react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port,
  },
});
