---
title: "Octant YT retro 2026-06-10T[BUILD-3]"
date: "2026-06-10"
session_id: "blog-v2-build-stop-gate-attempt-3"
source_harness: octant-yt
agents_used: []
failures_found: ["index_html_enoent", "vite_react_ssg_file_read_crash", "build_exit_status_1", "copied_file_not_visible_to_renderer"]
failure_classes: ["confabulation", "anosognosia", "source_amnesia"]
tags: [retro, octant-yt, build-recurrence-pattern-3, auto-generated]
---

## Open Items

- PATTERN RECURRENCE #3: Files written by Vite SSR build (`dist/index.html`) are not visible to vite-react-ssg rendering process
- Root cause is BUILD PROCESS ISOLATION: the copySsrManifest() plugin writes to dist/ in SSR build context; vite-react-ssg rendering runs as a separate Node process that does not inherit that state
- Structural fix required: NOT a file-path issue, but a build-phase contract issue

## Failure Signals

- `[Error: ENOENT: no such file or directory, open '/Users/gava/projects/blog-v2/apps/web/dist/index.html']` — index.html missing at render time
- Console shows: `✓ Copied index.html template to dist/index.html` (copy succeeded)
- But vite-react-ssg immediately cannot find the file (file visible in SSR context but not in rendering context)
- Rendering process runs as separate Node.js worker, likely different process isolation
- `ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL` — exit status 1

## Failure Analysis

**Failure Class: confabulation**
- The `copySsrManifest()` plugin assumes that writing to `dist/` in the SSR build makes the file visible to vite-react-ssg rendering
- This is false. The rendering process runs in a different context (separate Node process, possibly different cwd)
- The file write happens but is not visible across process boundaries

**Failure Class: anosognosia**
- The plugin logs `✓ Copied index.html template to dist/index.html` (success signal)
- But the file is immediately unavailable to the next step
- The build continues reporting success until the rendering process crashes
- No feedback loop between the copy operation and the renderer that consumes it

**Failure Class: source_amnesia**
- The build forgot that vite-react-ssg rendering is a SEPARATE build process
- It was treated as if it shared the same filesystem state as the SSR build
- The architectural assumption (shared dist/ state) was never validated

## Cross-References

- Prior retros: 2026-06-09 Build 1 (confabulation: ssr-manifest.json missing)
- Prior retros: 2026-06-09 Build 2 (confabulation: mkdir failed, anosognosia: error then success signal)
- Current: 2026-06-10 Build 3 (confabulation: index.html copied but not found, anosognosia: success message followed by crash)
- Source: vite.config.ts `copySsrManifest()` plugin at writeBundle hook
- Rendering process: vite-react-ssg v0.9.0, runs as separate Node.js process

## Root Cause: Build Phase Isolation

The actual problem is that vite-react-ssg rendering does NOT have access to the dist/ directory state created by the SSR build. Possible causes:

1. **Working directory**: vite-react-ssg rendering runs with a different cwd
2. **Process isolation**: rendering runs in a worker process without shared filesystem views
3. **Temp directories**: rendering might use a temp directory, not dist/
4. **Build flag**: vite-react-ssg might be running in a mode that bypasses the host dist/

## Escalation

This is a STRUCTURAL FAILURE requiring investigation into:
- How vite-react-ssg is invoked (cwd, environment, config)
- Whether vite-react-ssg can be configured to read from host dist/ or if it needs files in a different location
- Whether the entry point for rendering is the problem (wrong template path)

Current approach (copying files in Vite plugins) will NOT work because the rendering process doesn't see those files. Need to either:
1. Patch vite-react-ssg rendering entry point to point to the correct location
2. Or: Run vite-react-ssg with explicit config to use the host dist/ directory
3. Or: Use a post-build step (Bash script) instead of Vite plugins for file preparation
