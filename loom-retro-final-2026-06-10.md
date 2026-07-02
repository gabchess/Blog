---
title: "Loom retro 2026-06-10T final"
date: "2026-06-10T00:00:00Z"
session_id: "blog-v2-react-ssg-buildfix"
source_harness: loom
agents_used: []
failures_found: ["vite_react_ssg_enoent_dist_index_html", "vite_react_ssg_files_foreach_typeerror"]
failure_classes: ["confabulation", "source_amnesia"]
tags: [retro, loom, auto-generated, build-failure, vite-react-ssg, progressive-failure]
---

## Session Summary

Build progressed through vite-react-ssg pipeline, hitting two sequential failures. First failure (confabulation) resolved mid-session; second failure (source_amnesia) remains active.

## Failure Sequence

### Failure 1: RESOLVED ✅
**Signal:** `ENOENT: no such file or directory, open 'dist/index.html'`
**Class:** confabulation (plugin assumes dist/index.html exists when SSG renderer runs, but writeBundle hook runs after rendering)
**Root cause:** Vite hook lifecycle: buildStart → build → SSG rendering → writeBundle (copy happens too late)
**Fix applied:** Copy index.html in build-setup.mjs (runs before any Vite build), not in vite.config.ts writeBundle hook
**Status:** Build now passes client build + SSR build + rendering pages phases

### Failure 2: ACTIVE ❌
**Signal:** `TypeError: files.forEach is not a function` in vite-react-ssg/collectAssets (line 56)
**Phase:** Generating static loader data (after rendering pages completes)
**Class:** source_amnesia (collectAssets function has lost reference to expected structure; receives non-iterable where array expected)
**Location:** vite-react-ssg.DsKK_1op.mjs:56:11, called during static-loader-data generation for page "/"
**Root cause:** StaticDataLoader export or manifest structure does not match collectAssets contract

## Open Items

1. **Index.html timing** — DONE. Moved copy to build-setup.mjs pre-build phase.
2. **Static loader data structure** — TODO. Investigate why `files` parameter in collectAssets is not iterable:
   - Check StaticDataLoader export shape
   - Verify manifest.json structure matches vite-react-ssg expectations
   - Ensure page data contract (what routes export vs what collectAssets expects) aligns

## Structural Takeaway

Sequential failures indicate build pipeline maturity issue rather than single point failure:
- First failure was hook execution order (confabulation)
- Second failure is data contract mismatch (source_amnesia)
- Both point to vite-react-ssg integration not fully spec'd against our build setup

The fixes are incremental: resolve first failure, uncover second. Continue pattern until build gate passes.

## Cross-References

- Session repo: `/Users/gava/projects/blog-v2/`
- Files modified: `apps/web/build-setup.mjs` (added index.html pre-copy)
- Files modified: `apps/web/vite.config.ts` (copySsrManifest hook, writeBundle still copies index.html but now redundant)
- Error source: vite-react-ssg v0.9.0, collectAssets phase
- Related commit: e7ce8ab (incomplete previous fix)

## Recurrence Check

No prior loom retro files in this session for Loom harness. This is first session tracking vite-react-ssg build for blog-v2.

Cross-harness note: octant-yt harness also shows vite-react-ssg build failures (confabulation + disinhibition pattern), suggesting shared tooling gap rather than Loom-specific issue.

## Next Session Mission

1. Investigate StaticDataLoader export and what shape vite-react-ssg's collectAssets expects
2. Verify manifest.json structure in .vite-react-ssg-temp/ against vite-react-ssg contract
3. Debug collectAssets call chain: what calls it, what data structure is passed, where is files becoming non-iterable
4. Once files.forEach passes, build should complete to dist/
