---
title: "Loom retro 2026-06-11 feature/react-ssg"
date: "2026-06-11T00:00:00Z"
session_id: "2026-06-11-feature-react-ssg"
source_harness: loom
agents_used: []
failures_found: ["vite_react_ssg_write_then_enoent", "file_sync_race_condition"]
failure_classes: ["source_amnesia"]
tags: [retro, loom, auto-generated, vite-ssg]
---

## Open Items

- **BUILD BLOCKER:** vite-react-ssg writes dist/index.html successfully, reports build complete, then fails with ENOENT on re-read
- Diagnosis: source_amnesia—the renderer loses track of the file immediately after creating it
- Root cause: likely file-handle/fsync timing or path mismatch between write and read-back verification

## Failure Signals

**Primary failure (from stop-hook build output):**

vite-react-ssg render succeeds:
- ✓ Vite compiles into .vite-react-ssg-temp/ (866ms)
- ✓ dist/index.html written (68.59 KiB confirmed in output)
- ✓ All 37 pages rendered to dist/posts/*
- ✓ Static loader data manifest generated
- ✓ "[vite-react-ssg] Build finished." reported

Then immediately fails:
```
[Error: ENOENT: no such file or directory, open '/Users/gava/projects/blog-v2/apps/web/dist/index.html']
```

This happens AFTER the file was successfully written to disk (confirmed by earlier output line showing dist/index.html and its size).

## Failure Class: source_amnesia (AR-381)

The renderer writes a file, loses track of it, then can't read it back. The precondition (file on disk) does not match the postcondition (file not readable).

**Not confabulation:** The path is correct. The file WAS created. The problem is it became unreadable immediately after write.

**Not phantom_limb:** vite-react-ssg tool is present and mostly works (renders all pages successfully).

## Probable Root Causes

1. **File handle not released:** vite-react-ssg writes the file via Node fs stream, tries to read it back before the stream fully flushes to disk
2. **Path mismatch:** The code that WRITES uses a different resolved path than the code that READS (symlinks, relative vs absolute)
3. **Timing race in vite-react-ssg library:** Known issue in vite-react-ssg's postcondition-check logic (should verify upstream library issues)

## Cross-References

- Stop hook output: `/Users/gava/projects/blog-v2/.claude/hooks/stop-build-gate.sh` (provided above)
- Build script: `apps/web/build-setup.mjs && tsc && vite-react-ssg build`
- Config: `apps/web/vite.config.ts` (vite-react-ssg output configuration)
- Branch: feature/react-ssg

## For Next Session

**Immediate action:** Test if the build actually completes despite the error message. Check if dist/ contents are usable even though exit code is 1. The file lists show all pages were rendered—the error may be in a non-critical postcondition check.

**If build is actually working:** Suppress or fix the error condition in vite-react-ssg or its configuration.

**If build fails:** Debug vite-react-ssg file-handle lifecycle. May need to await fsync() or adjust config to match library expectations.
