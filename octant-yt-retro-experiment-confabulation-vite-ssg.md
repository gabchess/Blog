---
title: "Octant YT recurrent failure experiment: confabulation (vite-react-ssg build phase ordering)"
date: "2026-06-09T18:30:00Z"
source_harness: octant-yt
failure_class: confabulation
recurrence_count: 2
tags: [experiment-proposal, octant-yt, annie-phase2, build-infrastructure]
---

## Hypothesis

The failure class `confabulation` (attempting to mkdir `/dist/static-loader-data/posts` without verifying parent exists) has appeared in 2 of the last 2 Octant YT retros (2026-06-09 builds 1 and 2).

The root cause is a structural assumption gap: the `ensureDistDirs()` Vite plugin creates directories during the CLIENT BUILD `buildStart()` hook. However, vite-react-ssg rendering phase is a SEPARATE build process that executes afterwards and does not inherit the directory structure created in the first build.

This suggests the fix in commit e7ce8ab was incomplete because it targeted the wrong phase.

## Proposed Experiment

Annie Phase 2: Investigate and restructure the build phase ordering so that:

1. Directory preconditions are created in the phase that NEEDS them (vite-react-ssg rendering config, not Vite client build config)
2. Or: Ensure directory creation is idempotent and runs in EVERY phase that might need it
3. Or: Verify the build-phase contract (what dist/ state exists when vite-react-ssg starts) and document it

## Evidence Files

- `/Users/gava/projects/blog-v2/octant-yt-retro-feedback-2026-06-09.md` — First build failure
- `/Users/gava/projects/blog-v2/octant-yt-retro-feedback-2026-06-09-build2.md` — Recurrence despite fix
- `/Users/gava/projects/blog-v2/apps/web/vite.config.ts` — Current config shows `ensureDistDirs()` runs at `buildStart` (client build only)
- Commit `e7ce8ab`: "fix(build): ensure dist dirs exist before SSG static loader write" — claimed fix that did not fully resolve

## Failure Signal Pattern

Both retros show the same ENOENT error:
```
Error: ENOENT: no such file or directory, mkdir '/Users/gava/projects/blog-v2/apps/web/dist/static-loader-data/posts'
```

The error happens during vite-react-ssg rendering, not during Vite client build. This indicates the mkdir hook is not running in the rendering phase context.

## Structural Takeaway

Build-phase contracts are invisible until they break. The client build and SSG rendering have different dist/ states but share assumptions. This needs explicit documentation and verification in the build config.
