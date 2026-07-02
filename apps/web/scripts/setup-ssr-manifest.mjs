#!/usr/bin/env node
/**
 * Post-Vite hook: Ensures SSR manifest exists before vite-react-ssg rendering phase.
 *
 * vite-react-ssg rendering expects:
 * - dist/.vite/manifest.json (client manifest, created by Vite client build)
 * - dist/.vite/ssr-manifest.json (SSR manifest, needed for rendering)
 *
 * This script copies the manifest from the temp directory to the dist directory,
 * ensuring it's in place BEFORE the rendering phase starts.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.resolve(dir, '..');

async function ensureSsrManifest() {
  const tempDir = path.join(baseDir, '.vite-react-ssg-temp');
  const distViteDir = path.join(baseDir, 'dist', '.vite');

  try {
    // Ensure dist/.vite exists
    fs.mkdirSync(distViteDir, { recursive: true });

    // Look for the manifest in temp directories (created during SSG build)
    if (fs.existsSync(tempDir)) {
      const tempDirs = fs.readdirSync(tempDir).sort().reverse();

      for (const tempSubDir of tempDirs) {
        const manifestPath = path.join(tempDir, tempSubDir, '.vite', 'manifest.json');

        if (fs.existsSync(manifestPath)) {
          const destPath = path.join(distViteDir, 'ssr-manifest.json');
          fs.copyFileSync(manifestPath, destPath);
          console.log(`✓ Ensured SSR manifest at dist/.vite/ssr-manifest.json`);
          return;
        }
      }
    }

    // If temp manifest not found, check if client manifest exists and copy it
    const clientManifestPath = path.join(distViteDir, 'manifest.json');
    const ssrManifestPath = path.join(distViteDir, 'ssr-manifest.json');

    if (fs.existsSync(clientManifestPath) && !fs.existsSync(ssrManifestPath)) {
      fs.copyFileSync(clientManifestPath, ssrManifestPath);
      console.log(`✓ Created ssr-manifest.json from client manifest (fallback)`);
      return;
    }

    if (fs.existsSync(ssrManifestPath)) {
      console.log(`✓ SSR manifest already exists at dist/.vite/ssr-manifest.json`);
      return;
    }

    console.warn(`⚠ Could not locate SSR manifest to copy`);
  } catch (error) {
    console.error(`✗ Error setting up SSR manifest:`, error);
    process.exit(1);
  }
}

ensureSsrManifest();
