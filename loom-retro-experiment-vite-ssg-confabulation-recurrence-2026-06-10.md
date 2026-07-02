---
title: "Loom recurrent failure experiment: confabulation (vite-react-ssg)"
date: "2026-06-10T23:59:59Z"
source_harness: loom
failure_class: "confabulation"
recurrence_count: 2
session_id: "loom-blog-v2-feature-react-ssg-close"
tags: [experiment-proposal, loom, annie-phase2, vite-ssg-module-generation]
---

## Hypothesis

The failure class `confabulation` (hallucinated file paths / expected files never created) has appeared in 2+ build attempts within the same Loom session on `feature/react-ssg`. Specific pattern: vite-react-ssg v0.9.0 fails to generate `main.mjs` in its temp directory during SSR phase, then cascades into cleanup failure.

This suggests a **structural incompatibility** between the plugin and the codebase (monorepo structure, Tailwind + React 19 stack, or specific import patterns), not a transient one-off error.

## Evidence Files

1. `.loom-retro-final-2026-06-10-session-close.md` — session-close comprehensive failure cascade analysis
2. `.loom-retro-cascading-ssg-failures-2026-06-10.md` — detailed cascade anatomy
3. `.loom-retro-experiment-vite-react-ssg-integration-2026-06-10.md` — prior experiment proposal
4. `.loom-retro-feedback-2026-06-10.md` — initial failure capture
5. Branch state: `/Users/gava/projects/blog-v2` (`feature/react-ssg`)

## Proposed Experiment (Annie Phase 2)

### Root Cause Investigation

1. **vite-react-ssg v0.9.0 bug audit**: Search GitHub issues and plugin source for known `main.mjs` / temp directory generation failures. Is this a known bug in v0.9.0?

2. **Monorepo trigger hypothesis**: Does the failure occur with simpler project structures (non-monorepo)? Does it trigger specifically on turbo + pnpm workspace configs?

3. **Tailwind + React 19 interaction**: Does the plugin fail on React 18? Does Tailwind CSS-in-JS cause module resolution issues for the plugin's import paths?

4. **Import pattern trace**: Examine what causes the plugin to *expect* `main.mjs` at that path. Is it a hardcoded assumption or config-driven? What config values trigger the assumption?

### Structural Fix Options

**Option A: Defensive cleanup** (SHORT-TERM, unblocks immediately)
- Add `rmSync(..., { recursive: true, force: true })` before SSR phase in `build-setup.mjs`
- Prevents temp directory poison from blocking future builds
- Does NOT fix root cause; builds may still fail, but cleanup won't crash

**Option B: SSG / SSR necessity audit** (MEDIUM-TERM, design question)
- Verify whether SSR output is actually required for product (37 static pages are being generated successfully)
- If SSR is not needed: disable it in vite.config.ts or remove the plugin entirely
- If SSR IS needed: evaluate alternative SSG tools (Astro, Next.js static export, maintained alternatives)

**Option C: Plugin replacement** (LONG-TERM, risk mitigation)
- vite-react-ssg v0.9.0 is early-stage / unstable (pattern suggests it may not be production-ready for this codebase)
- Research maintained alternatives with proven monorepo + React 19 support
- Decision gate: does replacing the plugin unblock progress faster than debugging it?

## Decision Surface

Next session should surface to Gabe:
1. Was the temp cleanup already applied? (unblock confirmation)
2. Is SSR output actually needed for this product?
3. If yes to SSR: is debugging vite-react-ssg worth the effort, or should we switch tools?
4. If no to SSR: disable the feature immediately and reduce complexity

## AR-381 Closure

Per AR-381 recurrent-failure clause: confabulation has recurred 2+ times in same session. This experiment surfaces structural incompatibility, not transient error. Pattern should not escalate further without evidence of root-cause fix or decision to change approach.

---

Experiment proposed: 2026-06-10T23:59:59Z
Confidence: HIGH (pattern is reproducible and cascading within same session)
Effort estimate: 2-4 hours for full investigation + decision gate
