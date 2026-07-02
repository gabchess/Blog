---
title: "Octant YT retro 2026-06-09T18-30-00Z"
date: "2026-06-09T18:30:00Z"
session_id: "blog-v2-build-stop-gate"
source_harness: octant-yt
agents_used: []
failures_found: ["build_failed", "missing_manifest_file", "vite_react_ssg_crash", "font_resolution_warnings"]
failure_classes: ["confabulation", "disinhibition"]
tags: [retro, octant-yt, build-failure, auto-generated]
---

## Open Items

- Fix vite-react-ssg manifest generation before dist is consumed by rendering phase
- Resolve missing arcane-fable font files (woff, woff2, otf) — verify source and build output paths
- Ensure ssr-manifest.json is written to dist/.vite/ before rendering phase attempts to read it
- Font assets must be copied or generated during build process

## Failure Signals

- `BUILD FAILED` — vite-react-ssg rendering crash during page generation (37 pages)
- `ENOENT: no such file or directory, open '/Users/gava/projects/blog-v2/apps/web/dist/.vite/ssr-manifest.json'` — missing manifest that rendering phase depends on
- Font resolution warnings: `/fonts/arcane-fable.woff`, `/fonts/arcane-fable.woff2`, `/fonts/arcane-fable.otf` not found at build time (non-fatal but indicate source mismatch)
- `ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL` — pnpm build exit status 1

## Failure Analysis

**Failure Class: confabulation**
- The build process attempted to read `dist/.vite/ssr-manifest.json` but the file was never written. This suggests:
  - Client build (vite build) completed but didn't generate the expected manifest in the correct location
  - OR SSR build ran out of order
  - OR dist directory is being cleared between build phases
- Missing font files suggest hardcoded paths in CSS that point to `/fonts/` but those assets don't exist in the source or output locations.

**Failure Class: disinhibition**
- The vite-react-ssg build ran the rendering phase without verifying preconditions:
  1. Client build completed successfully
  2. manifest.json exists in dist/.vite/
  3. Font assets are available and resolved
- Build continued past font resolution warnings without treating them as blocking conditions.

## Cross-References

- Session state: /Users/gava/projects/blog-v2
- Stop hook: /Users/gava/projects/blog-v2/.claude/hooks/stop-build-gate.sh
- Retro generated: 2026-06-09
- Source harness: octant-yt (blog-v2 variant)
- Build command: `pnpm --filter @octant/web build`
- Error location: Vite manifest missing, rendering cannot proceed
- Related: vite-react-ssg temporary directory: `/Users/gava/projects/blog-v2/apps/web/.vite-react-ssg-temp/`
