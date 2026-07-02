---
title: "Octant YT retro 2026-06-10T13-30-00Z — vite-react-ssg collectAssets crash"
date: "2026-06-10T13:30:00Z"
session_id: "blog-v2-build-stop-gate-session-close"
source_harness: octant-yt
agents_used: []
failures_found: ["font_resolution_unresolved", "vite_react_ssg_collectAssets_crash", "typeerror_files_forEach", "static_loader_generation_failed"]
failure_classes: ["confabulation", "disinhibition"]
tags: [retro, octant-yt, build-failure, vite-react-ssg, auto-generated]
---

## Open Items

- **CRITICAL:** vite-react-ssg collectAssets() expects `files` parameter to be iterable (array/Set), but received non-iterable (null, undefined, or scalar). Investigate root cause: custom SSG config or vite-react-ssg version incompatibility.
- **RECURRING:** Font resolution warnings for `/fonts/arcane-fable.woff2`, `.woff`, `.otf`. These assets are referenced but not found at build time. Either: (1) fonts need to be committed to `public/fonts/`, (2) font paths in CSS need correction, or (3) build phase ordering is wrong.
- **STRUCTURAL:** Three consecutive build failures across Sessions (2026-06-09 build 1, build 2, and today) all in vite-react-ssg phases. Suggests either: (1) vite-react-ssg version has a bug or incompatibility, (2) build-setup.mjs or vite.config.ts config is malformed, or (3) static route export format is wrong.
- Verify `build-setup.mjs` is correctly constructing the routes object passed to vite-react-ssg builder.

## Failure Signals

- `TypeError: files.forEach is not a function` at vite-react-ssg.DsKK_1op.mjs:56:11, inside collectAssets()
- Error triggered during `[vite-react-ssg] Generating static loader data...` phase
- Failed on root page `/` (index route)
- Font resolution warnings (3 variants, 2 resolution passes): `/fonts/arcane-fable.woff2`, `/fonts/arcane-fable.woff`, `/fonts/arcane-fable.otf`
- Exit status 1, ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL

## Failure Analysis

**Failure Class: confabulation**
- vite-react-ssg collectAssets() is iterating over `files` via `.forEach()` (line 56:11), but `files` is not an array or Set.
- This suggests: (1) the SSG config passed malformed data structure, (2) route asset collection returned null/undefined instead of iterable, or (3) vite-react-ssg expects a different interface than what build-setup.mjs is providing.
- The error occurs on the root page `/`, which may be a edge case (special handling in build-setup.mjs).

**Failure Class: disinhibition**
- Font resolution warnings were allowed to pass through without blocking the build.
- Build continued into static-loader generation despite unresolved critical assets.
- Stop hook correctly caught the fatal error and blocked completion, but the font warnings should have been investigated earlier.

## Recurrence Pattern

Prior builds (2026-06-09):
- Build 1: `ENOENT: mkdir dist/.vite/ssr-manifest.json` — missing manifest
- Build 2: `ENOENT: mkdir dist/static-loader-data/posts` — missing directory
- Build 3 (today): `TypeError: files.forEach is not a function` — type mismatch in SSG

**All three failures occur in the SSG phase.** This is not a transient error; the vite-react-ssg build setup is structurally broken.

## Root Cause Candidates

1. **vite-react-ssg version bug:** Version 0.9.0 may have a regression in collectAssets() when handling root routes or certain config structures.
2. **build-setup.mjs malformed output:** The routes object or asset collection format doesn't match vite-react-ssg expectations.
3. **Type mismatch in route config:** Route definition for `/` is missing or has the wrong shape (e.g., `files: undefined` instead of `files: []`).
4. **Parallel build race:** Static-loader generation runs in parallel (p-queue); root route may be processed before its assets are ready.

## Cross-References

- Committed fix attempt: `e7ce8ab` — "ensure dist dirs exist before SSG static loader write" (did not resolve structural issue)
- Build command: `tsc --build && vite-react-ssg build`
- Build setup file: `apps/web/build-setup.mjs` (defines routes and exports them to vite.config.ts)
- Vite config: `apps/web/vite.config.ts` (imports build-setup.mjs and passes to vite-react-ssg)
- vite-react-ssg version: 0.9.0
- Node.js version: v25.8.1
- Error stack: vite-react-ssg.DsKK_1op.mjs:56:11 (collectAssets → Array.forEach)
- Retro generated: 2026-06-10T13:30:00Z
- Source harness: octant-yt (blog-v2 project variant)

## Escalation

**This is a load-bearing structural failure.** The vite-react-ssg build setup is broken. Option A: revert to a prior working version and identify what changed. Option B: migrate away from vite-react-ssg to a stable SSG tool. Option C: investigate vite-react-ssg 0.9.0 source code for the collectAssets() contract and fix build-setup.mjs to match.

Recommend: Gabe review build-setup.mjs route export format against vite-react-ssg 0.9.0 documentation or source.
