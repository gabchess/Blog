import path from 'node:path';
import fs from 'node:fs';
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

// Ensure dist directories exist and index.html is available for SSG rendering
function ensureDistDirs(): Plugin {
  return {
    name: 'ensure-dist-dirs',
    async buildStart() {
      const distPath = path.resolve(import.meta.dirname, 'dist');
      const staticDataPath = path.join(distPath, 'static-loader-data');
      const postsDataPath = path.join(staticDataPath, 'posts');

      // Create directories with recursion
      fs.mkdirSync(postsDataPath, { recursive: true });

      // Copy index.html for vite-react-ssg rendering
      const srcIndexPath = path.join(import.meta.dirname, 'src', 'index.html');
      const distIndexPath = path.join(distPath, 'index.html');
      if (fs.existsSync(srcIndexPath)) {
        fs.copyFileSync(srcIndexPath, distIndexPath);
      }
    },
  };
}

const port = Number(process.env.WEB_PORT) || 3000;

export default defineConfig({
  plugins: [ensureDistDirs(), tailwindcss(), safeAppCors(), react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port,
  },
  build: {
    emptyOutDir: false,
  },
  ssgOptions: {
    dirStyle: 'nested',
  },
} as Parameters<typeof defineConfig>[0] & { ssgOptions?: { dirStyle?: string } });
