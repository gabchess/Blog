---
title: "Octant YT retro 2026-06-10 stop hook — asset path mismatch"
date: "2026-06-10T23:59:59Z"
session_id: "blog-v2-react-ssg-vite-buildfix-asset-path"
source_harness: "octant-yt"
agents_used: []
failures_found: 
  - "asset_module_not_found"
  - "temp_directory_mismatch"
  - "vite_ssg_phase_separation_issue"
failure_classes: 
  - "phantom_limb"
  - "confabulation"
tags: [retro, octant-yt, auto-generated, vite-ssg-new-error, stop-hook-signal, asset-path-mismatch]
---

## Stop Hook Signal: NEW FAILURE CLASS

**Caught by:** Stop build gate hook  
**Time:** 2026-06-10 (latest build attempt)  
**Build phase:** vite-react-ssg SSR asset resolution  
**Progress before failure:** Successfully built Vite chunks, generated 37 static loader data files, 14+ HTML pages

### Error Output

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module 
'/Users/gava/projects/blog-v2/apps/web/.vite-react-ssg-temp/fjbn6y051g/assets/Home-BhUfZoI4.js' 
imported from 
'/Users/gava/projects/blog-v2/apps/web/.vite-react-ssg-temp/fjbn6y051g/main.mjs'
```

### Key Discovery

The Vite build phase created assets in:
```
.vite-react-ssg-temp/8edoe6qzlr/assets/Home-BhUfZoI4.js ✓ exists
```

But vite-react-ssg SSR phase is looking in:
```
.vite-react-ssg-temp/fjbn6y051g/assets/Home-BhUfZoI4.js ✗ does not exist
```

**Two different temp directories for two phases of the same build.**

### Build Progress (Before Failure)

✅ Vite client build: 131 modules transformed in 25.56s  
✅ Chunks rendered: manifest.json, style-CtpM_WCM.css, Home-BhUfZoI4.js, Post-UX0GuF_e.js, Layout-DRSWcw_1.js  
✅ Static loader data: 37 routes processed, manifest-me7ouh2jb3.json generated  
✅ HTML files: 14+ pages written to dist/  
❌ **Failure:** ERR_MODULE_NOT_FOUND during SSR asset resolution

### Failure Classification

**Class: phantom_limb** (NEW)
- vite-react-ssg invoked a tool/path that exists in the build but not in the context where it's needed
- The asset was successfully built (exists in temp dir 8edoe6qzlr) but SSR phase can't find it (looking in temp dir fjbn6y051g)
- This is a path/context mismatch, not a missing asset

**Secondary: confabulation**
- vite-react-ssg assumes SSR phase can access assets from Vite build phase
- Assumption violated due to separate temp directory contexts

### Root Cause Hypothesis

vite-react-ssg uses a two-phase build:

1. **Vite phase:** Build client/SSR bundles into `.vite-react-ssg-temp/<id1>/`
2. **SSR phase:** Render pages using bundles from step 1, but creates new temp context `.vite-react-ssg-temp/<id2>/`

When SSR phase tries to import from `<id1>`, Node.js can't find it because the import path assumes `<id2>`.

**Likely cause:** `build-setup.mjs` or vite.config.ts is not properly passing the Vite build output path to the SSR phase. The SSR phase creates a fresh temp directory instead of reusing the one from the Vite phase.

### Diagnostic Questions

1. Does vite-react-ssg expect a shared temp directory between phases?
2. Should `build-setup.mjs` write the Vite output to a static location instead of a random temp dir?
3. Is there a vite-react-ssg config option to reuse temp directories across phases?
4. Does the SSR phase need explicit configuration to find the Vite build output?

### Important Note

**This is progress.** Previous builds crashed during:
- collectAssets phase (Build 1–5)
- Page render phase (Build 6)

This build made it to SSR asset resolution — a later phase. The errors are narrowing, suggesting we're getting closer to a working config.

### Next Steps

1. Investigate vite-react-ssg documentation for temp directory / asset path configuration
2. Check if `build-setup.mjs` needs to pass explicit build output path to SSR phase
3. Consider whether Vite output should go to a stable location (e.g., `dist/`) instead of temp directory
4. If vite-react-ssg requires separate temp directories, check if assets should be symlinked or copied

### Structural Takeaway

This is a **classic phantom_limb error**: the asset exists, vite-react-ssg has access to the build tools, but the configuration doesn't wire them together correctly. The fix is likely in how we pass context/paths between the Vite and SSR phases.

---

**Signal captured:** 2026-06-10 (latest attempt)  
**Build phase:** SSR asset resolution  
**Pages generated before failure:** 14+ (partial success)  
**Failure type:** Asset path/context mismatch  
**Progress relative to prior builds:** Much further (new failure class, different phase)  
**Exit status:** 1 (ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL)  
**Severity:** Medium (asset path issue, likely fixable via configuration)
