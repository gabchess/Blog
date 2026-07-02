---
title: "Octant YT retro 2026-06-09T[BUILD-2]"
date: "2026-06-09"
session_id: "blog-v2-build-stop-gate-attempt-2"
source_harness: octant-yt
agents_used: ["bram"]
failures_found: ["static_loader_data_dir_missing", "rendering_partial_failure", "mkdir_enoent", "build_exit_status_1"]
failure_classes: ["confabulation", "anosognosia"]
tags: [retro, octant-yt, build-recurrence, auto-generated]
---

## Open Items

- RECURRENCE: Static loader data directory still missing even after commit e7ce8ab "ensure dist dirs exist before SSG static loader write"
- Investigate why mkdir for `/Users/gava/projects/blog-v2/apps/web/dist/static-loader-data/posts` failed
- Determine if build actually succeeded or partially failed:
  - 37 pages rendered to disk (success markers)
  - static-loader-data-manifest JSON written (success marker)
  - BUT mkdir error thrown mid-render (failure marker)
  - Build reported "finished" despite error (contradiction)
- Page `posts/allocate-to-epoch-5-demo-day-invite` failed specifically

## Failure Signals

- `Error: ENOENT: no such file or directory, mkdir '/Users/gava/projects/blog-v2/apps/web/dist/static-loader-data/posts'` — directory creation failed
- `Error on page: posts/allocate-to-epoch-5-demo-day-invite` — one page render crashed
- Build threw uncaught exception in vite-react-ssg but continued rendering
- `ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL` — exit status 1
- Stop hook blocked completion with BUILD FAILED marker

## Failure Analysis

**Failure Class: confabulation**
- vite-react-ssg attempted to mkdir `dist/static-loader-data/posts` without verifying the parent directory `dist/static-loader-data/` exists
- This is the SAME error that commit e7ce8ab claimed to fix
- Either: (1) the fix was incomplete, (2) directory is being cleaned between phases, or (3) parallel render tasks race the mkdir

**Failure Class: anosognosia**
- vite-react-ssg threw an uncaught Error but continued rendering other pages
- Build completed 37 pages successfully (visible in dist/posts/*/index.html)
- Static manifest file was written (4.72 KiB)
- But reported `[vite-react-ssg] Build finished.` after throwing the exception
- Stop hook saw the error and marked BUILD FAILED, which is correct
- BUT the output is contradictory: error + success signal in same run

## Cross-References

- Prior fix: commit e7ce8ab (2026-06-xx) "ensure dist dirs exist before SSG static loader write"
- Issue recurrence: same error, different render attempt
- Build command: `tsc --build && vite-react-ssg build`
- Error location: vite-react-ssg rendering phase, static-loader-data generation
- Related: Bram attempted a structural fix that did not fully resolve the issue
- Rendered pages count: 37 total, 1+ failed (posts/allocate-to-epoch-5-demo-day-invite)

## Root Cause Candidates

1. **Race condition:** Multiple pages rendering in parallel, first to fail leaves parent dir uncreated
2. **Cleanup between phases:** dist/ cleaned after SSR but before static-loader-data write
3. **Incomplete fix in e7ce8ab:** only created parent dir in one phase, not all phases
4. **vite-react-ssg bug:** doesn't create nested dirs, assumes parent exists

**Escalation:** This is a recurrent structural failure. The prior fix did not resolve it. Needs deeper investigation: either vite-react-ssg config, build phase ordering, or parallel render safety.
