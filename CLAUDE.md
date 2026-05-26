# CLAUDE.md

Project-specific guidance for AI coding agents working on this codebase.

## Overview

Octant content blog. pnpm + turbo monorepo. Vite + React 19 frontend, Prismic for content (Sanity deferred). Docker + Nginx for deploy on GCP infrastructure.

## Repo structure

- `apps/web`: Vite + React 19 frontend (the blog)
- `packages/ui`: `@workspace/ui` shadcn component library
- `packages/validation`: Zod schemas for content validation
- `docker/`: Nginx config for the production deploy
- `docs/adr/`: Architecture Decision Records
- `scripts/`: tooling scripts

## Tech stack

- Runtime: pnpm + turbo + Vite + React 19
- Styling: Tailwind + shadcn (via `@workspace/ui`)
- Content: Prismic (current); Sanity deferred
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

## Working with this repo

- `main` is the production-ready baseline. Cut feature branches off main.
- Atomic PRs, single-purpose, scoped under ~1000 lines of diff. No mixed concerns per PR.
- Each PR includes a Verify section with reviewer commands.
- Node 22 (pinned via `.nvmrc`). Local v20 works but pnpm warns.
- Workspace deps use `workspace:*` syntax.
- Turbo commands need `dotenv --` prefix outside root scripts.

## Out of scope

- Sanity integration (planned for a later iteration).
- CI/GitHub Actions (no pipeline yet).
