---
title: "Loom retro 2026-06-10: vite-react-ssg manifest phantom_limb"
date: "2026-06-10T00:00:00Z"
session_id: "blog-v2-react-ssg-manifest-buildfix"
source_harness: loom
agents_used: []
failures_found: ["vite_react_ssg_ssr_manifest_enoent_during_rendering"]
failure_classes: ["phantom_limb"]
tags: [retro, loom, build, vite-react-ssg, manifest, phantom-limb]
---

## What Happened

Build command: `tsc --build && vite-react-ssg build`

**Execution sequence:**
1. ✓ Vite client build completes (4m 29s)
2. ✓ Vite SSR build completes (27.60s)
3. ✓ Hook logs: "Copied SSR manifest to dist/.vite/ssr-manifest.json"
4. ✗ vite-react-ssg rendering phase fails with ENOENT

```
[Error: ENOENT: no such file or directory, open '/Users/gava/projects/blog-v2/apps/web/dist/.vite/ssr-manifest.json']
  at collectAssets (vite-react-ssg/dist/shared/vite-react-ssg.DsKK_1op.mjs:54:23)
```

The file hook claims to copy DOES NOT EXIST when vite-react-ssg's rendering phase tries to read it.

## Failure Class: PHANTOM_LIMB

The `copySsrManifest()` hook (in vite.config.ts, lines 40-75) runs at `writeBundle` during the Vite SSR build. It copies the manifest from `.vite-react-ssg-temp/` to `dist/.vite/ssr-manifest.json`. The console log confirms the copy succeeded.

However, when vite-react-ssg's rendering phase (a separate lifecycle phase running within the same `vite-react-ssg build` command) attempts to read the file, it does not exist or is not accessible.

**Phantom_limb diagnosis:** The hook writes to `dist/.vite/` (the "limb"), but vite-react-ssg's rendering process cannot see or access it—as if the file exists in the wrong context or subprocess.

## Root Cause

**Lifecycle mismatch + subprocess context:**

1. `copySsrManifest()` runs at `writeBundle` during Vite's SSR build (parent process context, synchronous `copyFileSync`)
2. vite-react-ssg finishes its internal builds and enters rendering phase (child/separate process context)
3. The rendering phase tries to locate the manifest for `collectAssets()` operation
4. The manifest is in `dist/.vite/` (from the hook), but vite-react-ssg's subprocess doesn't see it

vite-react-ssg likely runs rendering in an isolated context (separate working directory, subprocess, or with different file descriptors) that doesn't inherit the writes made by the parent Vite process.

## Structural Takeaway

The hook approach assumes Vite's plugin lifecycle fully covers the manifest setup. But vite-react-ssg is an all-in-one tool that manages its own build + render lifecycle. When the rendering phase runs, it's no longer in the Vite build context where the hook executed.

**Fix strategy:** Manifest must be in place BEFORE vite-react-ssg's rendering phase starts, not during the Vite build. Two options:

**Option A (Pre-build setup):**
Modify `build-setup.mjs` to detect and pre-copy any existing manifest BEFORE `vite-react-ssg build` runs. Requires a previous build's manifest to exist.

**Option B (Post-build step):**
Wrap the build command in a shell script that:
```bash
vite-react-ssg build
# Then manually copy manifest from temp to dist
cp apps/web/.vite-react-ssg-temp/*/.*vite/manifest.json apps/web/dist/.vite/ssr-manifest.json
```

**Option C (Configuration):**
Check if vite-react-ssg has built-in config to specify manifest location or to find it in temp directory (consult vite-react-ssg docs/options).

## Immediate Actions

1. Inspect vite-react-ssg package docs: does it have a `manifestPath` or `manifest` config option?
2. If not, implement Option B (post-build copy step in package.json script)
3. Test the build to verify manifest is found during rendering

## Cross-References

- Error stack: vite-react-ssg collectAssets function (line 54 of dist/shared module)
- Build command: `apps/web/package.json` line 9
- Hook location: `apps/web/vite.config.ts` lines 40-75 (`copySsrManifest`)
- Temp output: `.vite-react-ssg-temp/mhbbzlxxag/.vite/manifest.json` (exists, confirmed in build output)
- Expected location: `dist/.vite/ssr-manifest.json` (written by hook, not found by renderer)

## Related Issues

Earlier retro files incorrectly classified this as `confabulation` (missing `dist/index.html`). That issue has been fixed (hook now copies index.html at line 63-69). This is a separate failure on the manifest file.

## Failure Pattern: Recurrence Likelihood

**Medium-high**: vite-react-ssg is a relatively new SSG tool, and hook-based manifest setup might not be the canonical pattern. If other Loom sessions use vite-react-ssg, this failure may recur and indicate a deeper need for custom build orchestration (move away from hook-based setup toward explicit post-build scripts).

Annie experiment candidate: `vite-react-ssg manifest lifecycle dependency` — test whether this is specific to hook-based setup or a blocker in vite-react-ssg itself.
