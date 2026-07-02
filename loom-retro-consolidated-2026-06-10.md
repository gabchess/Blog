---
title: "Loom retro 2026-06-10 — vite-react-ssg integration failures"
date: "2026-06-10T14:00:00Z"
session_id: "loom-blog-v2-react-ssg-S137"
source_harness: loom
agents_used: []
failures_found: 
  - "vite_react_ssg_missing_main_mjs_module"
  - "vite_react_ssg_temp_dir_not_empty_cleanup"
  - "vite_react_ssg_collectAssets_typeerror"
  - "vite_react_ssg_static_loader_data_mismatch"
failure_classes: 
  - "confabulation"
  - "anosognosia"
  - "source_amnesia"
tags: [retro, loom, auto-generated, build-failure, vite-react-ssg, cascading]
---

## Session Summary

**Branch:** `feature/react-ssg`  
**Objective:** Integrate vite-react-ssg for static site generation on Octant blog (React 19 + Vite + Prismic)  
**Status:** BLOCKED on build phase. Static HTML generation works (37 pages ✅). SSR phase crashes with cascading failures.

## Open Items

1. **BLOCKING**: vite-react-ssg SSR phase crashes with missing `main.mjs` module
   - Temp directory path: `/Users/gava/projects/blog-v2/apps/web/.vite-react-ssg-temp/`
   - Error: `ERR_MODULE_NOT_FOUND` for dynamically-created module
   - Root cause: Module generation bug or filename hash mismatch in plugin

2. **BLOCKING**: collectAssets TypeError — non-iterable data structure
   - Function expects array of files
   - Receiving object instead
   - StaticDataLoader export shape mismatch (source_amnesia: lost reference to expected contract)

3. **Cascade pattern**: Build leaves poisoned temp directory state
   - `rmdir()` fails on non-empty directory (anosognosia: no error recovery)
   - Blocks subsequent build attempts

## Failure Signals (AR-381 Taxonomy)

| Signal | Class | Evidence |
|--------|-------|----------|
| Missing `main.mjs` at expected temp path | **confabulation** | Plugin assumes module exists; never created or renamed |
| Cleanup crash (ENOTEMPTY) | **anosognosia** | Error uncaught; no fallback; builds poisoned state |
| collectAssets receives wrong type | **source_amnesia** | Lost reference to StaticDataLoader contract shape |
| Build setup hook ordering | **confabulation** | Assumed resources exist before created (index.html copy) |

## Structural Pattern

**Recurrence risk: HIGH.** This is the third vite-react-ssg failure in one session:
1. Index.html ENOENT (hook ordering — confabulation)
2. Missing `main.mjs` (module generation — confabulation)
3. collectAssets type error (data contract — source_amnesia)
4. Temp directory poison state (cleanup — anosognosia)

**Hypothesis:** vite-react-ssg v0.9.0 is too immature for this monorepo + React 19 + Tailwind setup. Either the plugin has bugs triggered by this environment, or its assumptions conflict with the build structure.

**Cross-harness pattern:** octant-yt harness also reports vite-react-ssg failures in parallel. Suggests **shared tooling gap**, not Loom-specific.

## Immediate Mitigations

```bash
# Clear poisoned temp directory before next build
rm -rf apps/web/.vite-react-ssg-temp
# Defensive cleanup added to build-setup.mjs (pre-build, recursive rm)
```

## Medium-term Fix Path

1. **Investigate vite-react-ssg 0.9.0 known issues**
   - GitHub: check for issues around `main.mjs` generation, temp cleanup
   - Consider upgrade if newer version available

2. **Verify SSR necessity**
   - Static pages are being generated (37/37) ✅
   - Confirm whether SSR output is actually needed for product
   - If not, consider disabling SSR phase or using simpler SSG

3. **Evaluate alternative SSG solutions**
   - Candidates: Astro, hydrogen, manual SSG, or Prismic-native export
   - Current approach shows recurrence risk: HIGH

## Cross-References

- **Repo:** `/Users/gava/projects/blog-v2`
- **Branch:** `feature/react-ssg`
- **Build setup:** `apps/web/build-setup.mjs`
- **Vite config:** `apps/web/vite.config.ts`
- **Plugin version:** vite-react-ssg@0.9.0
- **Related commits:**
  - e7ce8ab: `fix(build): ensure dist dirs exist before SSG static loader write`
  - b01e14e: `fix(web): order posts by coalesce(publishedAt, _createdAt)`
  - dbd871d: `feat(web): new base repo with vite ssg and sanity`

## Next Session (S138) Mission

**Precondition**: Clean temp directory before starting:
```bash
rm -rf /Users/gava/projects/blog-v2/apps/web/.vite-react-ssg-temp
```

**Investigative path**:
1. Debug StaticDataLoader export shape vs. collectAssets expectations
2. Check vite-react-ssg GitHub issues (v0.9.0, main.mjs, temp cleanup)
3. Verify SSR necessity; if not needed, disable SSR phase
4. Evaluate Astro or alternative SSG if vite-react-ssg remains unstable

---

**Retro generated:** 2026-06-10  
**Source harness:** loom  
**Session branch:** feature/react-ssg  

**⚠️ NOTE**: This consolidated feedback was written to the project directory because the Annie inbox path (`~/Obsidian/Arcana Wiki/00-Inbox/feedback/`) is outside the session working directory. To complete the loom-retro protocol, copy this file to the Annie inbox or invoke the skill with appropriate context.
