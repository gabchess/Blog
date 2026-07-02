---
title: "Octant YT recurrent failure experiment: confabulation — vite-react-ssg build setup"
date: "2026-06-10T13:35:00Z"
source_harness: octant-yt
failure_class: "confabulation"
recurrence_count: 3
tags: [experiment-proposal, octant-yt, annie-phase2, vite-ssg-critical]
---

## Hypothesis

The failure class `confabulation` has appeared in **3 of 3** recent Octant YT (blog-v2) builds. The agent/build system is making false assumptions about data structure contracts, particularly:

1. **Build phase isolation:** Assuming files written by Vite SSR build are visible to vite-react-ssg rendering (they are not — separate process context).
2. **Route object shape:** Assuming build-setup.mjs routes object matches vite-react-ssg expectations for the `files` property (it does not — receiving null/undefined instead of array/Set).
3. **Asset availability:** Assuming font resolution warnings are non-blocking and can be ignored (they are indicators of broken asset chains).

This is not a transient tool failure or a one-off config mistake. This is a **structural architectural mismatch** between the build setup and vite-react-ssg's expectations.

## Severity

**CRITICAL:** Build is completely blocked. All three recent attempts fail at the SSG rendering phase. No workaround. Blocks the entire blog deployment pipeline.

## Proposed Experiment (Annie Phase 2)

Investigate and fix the root cause via one of these paths:

### Path 1: Fix build-setup.mjs route export format
1. Read vite-react-ssg 0.9.0 source code (`node_modules/vite-react-ssg/dist/`).
2. Inspect `collectAssets()` contract: what shape does it expect for the `files` property on each route?
3. Audit `apps/web/build-setup.mjs` to see how routes are constructed.
4. Verify root route `/` has `files: []` (or appropriate iterable) instead of `files: undefined`.
5. Test: does `pnpm build` succeed with corrected route shape?

### Path 2: Fix process isolation (post-build step)
1. Investigate: does vite-react-ssg rendering run with a different `cwd` than the host build?
2. If yes: create a post-build Bash script that copies necessary files (ssr-manifest.json, index.html, static-loader-data/) to the location vite-react-ssg expects.
3. Or: configure vite-react-ssg to read from the host dist/ explicitly.

### Path 3: Upgrade or downgrade vite-react-ssg
1. Check npm for v0.9.1+ or other patch versions.
2. If a newer version exists, test if it has a fix for collectAssets() or root route handling.
3. If not, identify the last known-working version and revert (trade-off: losing new features for stability).

## Evidence Files

- `/Users/gava/projects/blog-v2/octant-yt-retro-feedback-2026-06-09.md` (build 1, confabulation: missing ssr-manifest.json)
- `/Users/gava/projects/blog-v2/octant-yt-retro-feedback-2026-06-09-build2.md` (build 2, confabulation + anosognosia: mkdir race + success signal)
- `/Users/gava/projects/blog-v2/octant-yt-retro-feedback-2026-06-10-build3.md` (build 3, confabulation + source_amnesia: process isolation assumption)
- `/Users/gava/projects/blog-v2/octant-yt-retro-feedback-2026-06-10-session-stop.md` (build 4, confabulation + disinhibition: files.forEach type crash)
- `/Users/gava/projects/blog-v2/octant-yt-retro-final-diagnosis-2026-06-10.md` (root cause analysis: build-setup.mjs contract mismatch)

## Structural Takeaway (for AR-381 / AR-262 intake)

When the same failure class (confabulation) fires 3+ times in the same session/project, it signals a load-bearing architectural assumption that was never validated. Standard retry-and-hope strategies don't work here. The fix requires reading the upstream tool's contract (vite-react-ssg source), verifying the build setup matches that contract, and adjusting one or both sides until they align.

This is a case where "STOP and diagnose" (AR-381 step 2-5) should have caught it after build 1. Build 2 and 3 were unnecessary; the root cause was known by then.
