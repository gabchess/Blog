---
title: "Octant YT build failure root cause analysis (final diagnosis)"
date: "2026-06-10T13:25:00Z"
session_id: "blog-v2-final-diagnosis"
source_harness: octant-yt
failure_class: "source_amnesia + locked_in"
tags: [retro, octant-yt, root-cause-analysis, final-diagnosis]
---

## Root Cause Identified

The vite-react-ssg rendering phase requires `dist/index.html` to exist as a template file. This file should be created by the pre-build setup script (`build-setup.mjs`), but it is not being created or is being created in the wrong context.

**Chain of events:**
1. `pnpm build` is invoked
2. Script runs: `node build-setup.mjs && tsc --build && vite-react-ssg build`
3. build-setup.mjs should copy `src/index.html` → `dist/index.html`
4. vite-react-ssg rendering phase looks for `dist/index.html` and fails to find it

**Current state:**
- `src/index.html` EXISTS (verified present)
- `dist/` directory EXISTS (created by earlier build stages)
- `dist/index.html` MISSING (not copied despite build-setup.mjs existing)

## Why The File Is Missing

The `build-setup.mjs` script exists and includes the correct logic to copy the file:
```javascript
fs.copyFileSync(srcIndexPath, distIndexPath);
console.log(`✓ Copied src/index.html to dist/index.html`);
```

But the error message from build-setup.mjs is not appearing in the build output, suggesting:
1. The script is not being executed by pnpm
2. The script is executing but in a different working directory
3. The copy happens but the file is deleted before rendering phase starts

## Failure Classification

**source_amnesia**: The build config forgot that the setup script must run BEFORE vite-react-ssg attempts to render. The contract between setup and rendering phases was never verified.

**locked_in**: The rendering process is blocked on a missing file, but the error message doesn't point to the setup script or suggest running it first.

## Fix Strategy

**Immediate fix**: Ensure build-setup.mjs runs AND its output is visible in the build log.

**Verification steps:**
1. Run `node /Users/gava/projects/blog-v2/apps/web/build-setup.mjs` manually to confirm it works
2. Check that `dist/index.html` is created with correct content
3. Run full build and verify the file persists until rendering completes

**Long-term fix**: Embed the setup logic directly into the vite.config.ts Vite plugin with error propagation, so it's part of the build tool chain rather than a separate pre-build script.

## Next Action For Gabe

The setup script needs to run and succeed before vite-react-ssg rendering can proceed. Verify:
- [ ] `node build-setup.mjs` succeeds when run in `/Users/gava/projects/blog-v2/apps/web/`
- [ ] After running it, does `dist/index.html` exist?
- [ ] If yes, does the full `pnpm build` command complete successfully?

If the setup script works in isolation but not in the pnpm build pipeline, the issue is in the package.json script execution order or a build step that clears dist/ after setup but before rendering.
