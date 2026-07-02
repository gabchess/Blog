---
title: "Octant YT experiment: vite-react-ssg confabulation pattern"
date: "2026-06-10T23:59:59Z"
source_harness: "octant-yt"
failure_class: "confabulation"
recurrence_count: 3
tags: [experiment-proposal, octant-yt, annie-phase2, vite-ssg-integration, root-cause-required]
---

## Hypothesis

The `confabulation` failure class has appeared in **3 consecutive Octant YT builds** across this session:

1. **Build 1 (2026-06-09):** ENOENT mkdir on SSG manifest — vite-react-ssg assumed directory structure existed
2. **Build 2 (2026-06-09):** ENOENT mkdir on static-loader directory — build phase ordering issue
3. **Build 3 (2026-06-10):** TypeError in collectAssets — route config contract violated (files not iterable)
4. **Build 4–5 (2026-06-10):** Identical to Build 3 (deterministic, not race condition)

**Common pattern:** vite-react-ssg encounters a state that it did not expect. The tool assumes either:
- Directory structures exist (Build 1–2)
- Route/asset data is in a specific format (Build 3–5)

When the assumption is violated, cryptic errors result. This is a **structural integration issue**, not a one-off bug.

## Structural Takeaway

This is not a transient failure or a race condition. It is a **misalignment between what vite-react-ssg expects and what `build-setup.mjs` provides**.

The tool is "confabulating" in the sense that it's encountering states it has no recovery path for, leading to cryptic errors at different phases:
- Phase 1 (setup): assumes directories exist → ENOENT
- Phase 2 (asset collection): assumes route config has correct shape → TypeError

## Proposed Experiment (Annie Phase 2)

**Task:** Investigate root cause of vite-react-ssg integration failure.

**Scope:**
1. Read `build-setup.mjs` and understand route export format
2. Compare against vite-react-ssg 0.9.0 source code or docs
3. Identify mismatch (if any) between expected and actual route structure
4. Propose one-line fix or config change that aligns build-setup.mjs output with vite-react-ssg input contract
5. If no simple fix exists, evaluate vite-react-ssg version or alternative SSG tools

**Success criteria:**
- Root cause identified and documented
- Fix proposed or alternative recommended
- Next build succeeds without confabulation-class errors

**Evidence files:**
- `/Users/gava/projects/blog-v2/octant-yt-retro-feedback-2026-06-09.md` (Build 1–2 analysis)
- `/Users/gava/projects/blog-v2/octant-yt-retro-feedback-2026-06-10T133000Z.md` (Build 3 analysis)
- `/Users/gava/projects/blog-v2/.claude-retro-critical-stop.md` (Build 3–5 deterministic failure analysis)
- `/Users/gava/projects/blog-v2/loom-retro-2026-06-10-stop-hook-page-render-failure.md` (Build 6 recovery attempt)

---

**Created:** 2026-06-10T23:59:59Z  
**Source harness:** octant-yt  
**Failure class:** confabulation  
**Recurrence count:** 3  
**Next action:** Annie auto-research Phase 2 on vite-react-ssg build-setup.mjs contract
