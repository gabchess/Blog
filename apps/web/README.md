# @octant/web

Vite + React 19 frontend scaffold for the Octant blog.

## Develop

```bash
pnpm install        # from repo root
pnpm --filter @octant/web dev
```

## Status

Mid-pivot from Astro/Sanity to Vite/Prismic (Q directive, 2026-05-26). Currently a scaffold; content layer wiring lands in S002+.

## Stack

- Vite + React 19
- `@workspace/ui` (shadcn components, wired in S001 commit 5)
- `@octant/validation` (Zod schemas)
- Prismic for content (deferred)
