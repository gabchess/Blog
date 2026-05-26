# CLAUDE.md

Project-specific guidance for Loom agents and Claude Code when working with this codebase.

## Overview

Octant content blog. pnpm + turbo monorepo. Currently mid-pivot from Astro/Sanity to Vite/Prismic
per Q's 2026-05-26 directive. The pivot branch (`q-monorepo-pivot-2026-05-26`) is the active
working surface; `main` is the pre-pivot Astro baseline kept as a rollback reference.

## Repo structure

- `apps/web` — Vite + React 19 scaffold (the blog frontend)
- `packages/ui` — `@workspace/ui` shadcn component library
- `packages/validation` — Zod schemas for Prismic/Sanity content validation
- `docker/` — Nginx config for GCP deploy
- `scripts/` — tooling scripts

## Tech stack

- Runtime: pnpm + turbo + Vite + React 19
- Content: Prismic (current target); Sanity deferred to a later session with Q
- Styling: Tailwind + shadcn (via `@workspace/ui`)
- Deploy: Docker + Nginx + GCP

## Common commands

```bash
pnpm install                          # install workspace deps
pnpm dev                              # turbo dev all apps
pnpm --filter @octant/web dev         # dev just the web app
pnpm build                            # turbo build
pnpm typecheck                        # type-check all packages
pnpm lint                             # lint all packages
pnpm test                             # unit tests
```

## Working with this repo (for Loom agents)

- **Active branch**: `q-monorepo-pivot-2026-05-26` — all pivot work lands here
- **Branch convention**: one PR per day per Q's mandate; each AI commit is single-purpose
- **Commit scope**: keep commits atomic and scoped (no mixed concerns in a single commit)
- **PR flow**: PR to `gabchess/blog-v2` first; only after Gabe ratifies does the PR go to
  `golemfoundation/octant-v2-blog`
- **Node version**: 22 required (pinned via `.nvmrc`); system may have v20, pnpm warns but
  does not block installs
- **Package installs**: use bare `pnpm install` (socket does not wrap pnpm; known gap per
  ARCANA AR-398 for npm only)
- **Turbo env**: turbo commands need `dotenv --` prefix if running outside the root scripts
  (e.g., `dotenv -- turbo dev --filter @octant/web`)
- **Workspace deps**: inter-package deps use `workspace:*` syntax in package.json

## Out of scope / deferred

- Sanity wiring (Q pairs in a later dedicated session)
- Prismic slice onboarding (Gabe coordinates with Graven)
- Web3/wallet UI (stripped during S001 pivot cleanup)
- CI/GitHub Actions (no pipeline yet on the pivot branch)
