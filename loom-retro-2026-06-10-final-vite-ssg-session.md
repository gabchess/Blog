---
title: "Loom retro 2026-06-10T23:59:59Z"
date: "2026-06-10T23:59:59Z"
session_id: "loom-blog-v2-feature-react-ssg-close"
source_harness: loom
agents_used: ["bram", "bobbin", "vite-react-ssg-build", "tsc"]
failures_found:
  - "confabulation_main_mjs_not_generated"
  - "anosognosia_temp_dir_cleanup_crash"
  - "locked_in_state_corruption_between_phases"
  - "recurrent_temp_dir_poison_pattern"
failure_classes:
  - "confabulation"
  - "anosognosia"
  - "locked_in"
recurrence_count: 2
recurrence_class: "confabulation"
tags: [retro, loom, auto-generated, vite-ssg, module-generation-failure]
---

## Open Items

- [ ] Clean poisoned temp dir: `rm -rf apps/web/.vite-react-ssg-temp`
- [ ] Confirm build succeeds on clean state
- [ ] Add defensive `rmSync()` cleanup to `build-setup.mjs` (prevents re-poison)
- [ ] Evaluate vite-react-ssg v0.9.0 stability or switch to alternative SSG

## Failure Signals

- `confabulation_main_mjs_not_generated`: vite-react-ssg temp dir created but `main.mjs` never written; SSR import fails on non-existent module
- `anosognosia_temp_dir_cleanup_crash`: cleanup phase called `rmdir()` on non-empty directory without preconditions; process termination without error handling
- `locked_in_state_corruption_between_phases`: client build reported success but SSR phase cannot locate output files; inconsistent state between phases
- `recurrent_temp_dir_poison_pattern`: same `main.mjs` confabulation failure observed in 2+ build attempts within same session (S116-level recurrence)

## Cross-References

- Session state dir: `/Users/gava/projects/blog-v2`
- Retro generated: 2026-06-10T23:59:59Z
- Source harness: loom
- Branch: feature/react-ssg
- Build tool: vite-react-ssg v0.9.0
- Related docs: `.loom-retro-cascading-ssg-failures-2026-06-10.md` (cascade detail), `.loom-retro-experiment-vite-react-ssg-integration-2026-06-10.md` (experiment proposal)
