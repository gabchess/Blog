---
title: "Octant YT retro 2026-06-10T13:30:00Z"
date: "2026-06-10T13:30:00Z"
session_id: "blog-v2-build-vite-ssg-phase-3"
source_harness: octant-yt
agents_used: []
failures_found: ["font_resolution_unresolved", "vite_react_ssg_collectAssets_crash", "typeerror_files_forEach", "static_loader_generation_failed"]
failure_classes: ["confabulation", "disinhibition"]
tags: [retro, octant-yt, auto-generated, vite-ssg-recurrence-3]
---

## Open Items

- **CRITICAL:** vite-react-ssg collectAssets() expects `files` parameter to be iterable (array/Set), but received non-iterable (null, undefined, or scalar). Root cause: custom SSG config or vite-react-ssg version incompatibility.
- **RECURRING PATTERN #3:** Font resolution warnings for `/fonts/arcane-fable.woff2`, `.woff`, `.otf`. Referenced but not found at build time. Either: (1) fonts missing from `public/fonts/`, (2) font paths in CSS need correction, or (3) build phase ordering is wrong.
- **STRUCTURAL:** Three consecutive build failures across sessions (2026-06-09 build 1, build 2, and today) all in vite-react-ssg phases. Suggests vite-react-ssg version bug, malformed build-setup.mjs, or static route export format issue.
- Verify `build-setup.mjs` is correctly constructing routes object passed to vite-react-ssg builder.

## Failure Signals

- `TypeError: files.forEach is not a function` at vite-react-ssg.DsKK_1op.mjs:56:11, inside collectAssets()
- Error triggered during `[vite-react-ssg] Generating static loader data...` phase
- Failed on root page `/` (index route)
- Font resolution warnings (3 variants, 2 resolution passes): `/fonts/arcane-fable.woff2`, `/fonts/arcane-fable.woff`, `/fonts/arcane-fable.otf`
- Exit status 1, ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL

## Failure Classification

**Failure Class: confabulation** (RECURRENT — 3 of 3 recent builds)
- vite-react-ssg collectAssets() is iterating over `files` via `.forEach()` (line 56:11), but `files` is not an array or Set.
- Suggests: (1) SSG config passed malformed data structure, (2) route asset collection returned null/undefined instead of iterable, or (3) vite-react-ssg expects different interface than build-setup.mjs provides.
- Error occurs on root page `/`, which may be an edge case (special handling in build-setup.mjs or Vite plugin).

**Failure Class: disinhibition**
- Font resolution warnings allowed to pass without blocking build.
- Build continued into static-loader generation despite unresolved critical assets.
- Stop hook correctly caught fatal error and blocked completion, but font warnings should have been investigated earlier.

## Recurrence Pattern Evidence

Prior builds in this session:
- Build 1 (2026-06-09): `ENOENT: mkdir dist/.vite/ssr-manifest.json` — missing manifest. Classes: confabulation, disinhibition.
- Build 2 (2026-06-09): `ENOENT: mkdir dist/static-loader-data/posts` — missing directory. Classes: confabulation, anosognosia, source_amnesia.
- Build 3 (2026-06-10): `TypeError: files.forEach is not a function` — type mismatch in SSG. Classes: confabulation, disinhibition.

**All three failures occur in the SSG phase. Confabulation appears in 100% of recent builds.**

## Root Cause Candidates

1. **vite-react-ssg version bug:** Version 0.9.0 may have regression in collectAssets() when handling root routes or certain config structures.
2. **build-setup.mjs malformed output:** Routes object or asset collection format doesn't match vite-react-ssg expectations.
3. **Type mismatch in route config:** Route definition for `/` is missing or has wrong shape (e.g., `files: undefined` instead of `files: []`).
4. **Parallel build race:** Static-loader generation runs in parallel (p-queue); root route processed before its assets ready.

## Cross-References

- Session state dir: `/Users/gava/.octant-yt-harness/state`
- Retro generated: 2026-06-10T13:30:00Z
- Source harness: octant-yt
- Build setup file: `apps/web/build-setup.mjs`
- Vite config: `apps/web/vite.config.ts`
- vite-react-ssg version: 0.9.0
- Node.js: v25.8.1
- Error stack: vite-react-ssg.DsKK_1op.mjs:56:11 (collectAssets → Array.forEach)

## Escalation

This is a **load-bearing structural failure**. The vite-react-ssg build setup is broken across 3 consecutive attempts. Requires:
- Review build-setup.mjs route export format against vite-react-ssg 0.9.0 docs/source
- Verify routes object shape, especially root route `/` handling
- Check if vite-react-ssg has known issues with root routes in v0.9.0
- Consider alternative: revert to known-working SSG version or migrate to stable alternative
