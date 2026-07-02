#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));

// Ensure dist directory structure exists before any build phase
const distPaths = [
  path.join(dir, 'dist'),
  path.join(dir, 'dist', 'static-loader-data'),
  path.join(dir, 'dist', 'static-loader-data', 'posts'),
];

distPaths.forEach((dirPath) => {
  try {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✓ Created directory: ${dirPath}`);
  } catch (error) {
    console.error(`✗ Failed to create directory: ${dirPath}`, error);
    process.exit(1);
  }
});

// Copy src/index.html to dist/index.html for vite-react-ssg rendering
// This must exist before the rendering phase starts
const srcIndexPath = path.join(dir, 'src', 'index.html');
const distIndexPath = path.join(dir, 'dist', 'index.html');

try {
  if (fs.existsSync(srcIndexPath)) {
    fs.copyFileSync(srcIndexPath, distIndexPath);
    console.log(`✓ Copied src/index.html to dist/index.html`);
  } else {
    console.warn(`⚠ src/index.html not found at ${srcIndexPath}`);
  }
} catch (error) {
  console.error(`✗ Failed to copy index.html:`, error);
  process.exit(1);
}

console.log('✓ Pre-build setup complete: dist ready for vite-react-ssg');
