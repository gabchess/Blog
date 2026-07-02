---
title: "Loom retro 2026-06-10 page render failure"
date: "2026-06-10T23:59:59Z"
session_id: "blog-v2-react-ssg-vite-buildfix-final"
source_harness: loom
failure_caught_by: "stop-build-gate hook"
failure_class: "confabulation"
tags: [retro, loom, auto-generated, build-failure, vite-react-ssg, page-render-failure, stop-hook-signal]
---

## Stop Hook Signal: Failure 5 — Page Render Missing Root Element

**Caught by:** `/Users/gava/projects/blog-v2/.claude/hooks/stop-build-gate.sh`  
**Time:** 2026-06-10 23:59:59Z (during build)  
**Build phase:** vite-react-ssg SSR rendering (page 36 of 37)

### Error Output

```
[vite-react-ssg] Error on page: posts/octant-vaults-strategy
Error: Could not find a tag with id="root" to replace it with server-side rendered HTML
    at renderHTML (file:///Users/gava/projects/blog-v2/node_modules/.pnpm/vite-react-ssg@0.9.0_react-dom@19.2.4_react@19.2.4__react-router-dom@6.30.4_react-dom@19.2.4__kaohssqkmmmuq7pyjn7mkrdz6m/node_modules/vite-react-ssg/dist/shared/vite-react-ssg.DsKK_1op.mjs:150:11)
```

### Build Progress Before Failure

✅ Client bundle built: 131 modules transformed  
✅ SSR rendering: 36 of 37 pages generated successfully  
✅ Static loader data: manifest generated (4.72 KiB)  
✅ Sample generated files:
- `dist/posts/octant-vaults-strategy-holistic-resilience/index.html`
- `dist/posts/octant-epoch-4-allocation-window/index.html`
- ... (14+ more HTML files visible in output)

❌ **Failure on page 36:** `posts/octant-vaults-strategy` (note: different slug from the list above?)

### Failure Classification

**Failure class:** `confabulation`

**Why:** vite-react-ssg assumes the template has `<div id="root">` element where it can inject server-side rendered HTML. Either:

1. The template file does not have `<div id="root">`
2. The template has it but under a different ID
3. The page component is not rendering the root element correctly
4. There's a mismatch between the template and the route it's rendering

### Diagnostic Questions

1. **Template:** What does `apps/web/src/index.html` contain? Does it have `<div id="root">`?
2. **Page route:** Does the `posts/octant-vaults-strategy` route/page exist and export correctly?
3. **Other pages:** Why are 36 of 37 pages rendering successfully but this one fails?
4. **Slug mismatch:** Is `octant-vaults-strategy` a valid slug? The output list shows `octant-vaults-strategy-holistic-resilience` instead.

### Root Cause Hypothesis

The build is **actually working** — it's rendering pages successfully. This specific page is failing because:

- Either the page component doesn't exist or has an issue
- Or there's a slug routing mismatch (the page expects a different URL)
- Or the template is missing the root element for this specific case

This is less of a "vite-react-ssg integration" issue and more of a "content/route configuration" issue.

### Status

**Build gate:** BLOCKED ❌  
**Progress:** 36/37 pages rendered (98% success rate)  
**Severity:** Medium — fixable by either:
  - Correcting the page route
  - Fixing the page component
  - Adjusting the template for this route
  - Removing the problematic page from the SSG list

### Next Steps

1. Verify the page `posts/octant-vaults-strategy` exists in the content
2. Check if the slug is correct or if it should be `posts/octant-vaults-strategy-holistic-resilience`
3. Verify `apps/web/src/index.html` contains `<div id="root">`
4. If page doesn't exist or is misconfigured, either:
   - Fix the route/page configuration
   - Remove it from the SSG build list
   - Add it to an exclusion list

### Structural Takeaway

This failure is **not** a vite-react-ssg integration issue (unlike Failures 1-4). It's a **content/route configuration issue**:

- vite-react-ssg is working correctly for 36 pages
- It's correctly failing on a page that doesn't have the expected template structure
- This is expected behavior — the tool is protecting against silent HTML generation failures

The fix is **not** in the build tooling, but in the content/routes configuration.

---

**Signal captured:** 2026-06-10T23:59:59Z  
**Build phase:** SSR page rendering  
**Pages before failure:** 36/37 rendered  
**Failure type:** Content/route configuration (not build tooling)  
**Severity update:** Lower than Failures 1-4 (different problem domain)
