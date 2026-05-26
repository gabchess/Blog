# Octant Blog

Static content blog. Vite + React 19 frontend, Prismic for content (Sanity deferred), Docker + Nginx + GCP for deploy.

## Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | 22+ | Runtime (pinned via `.nvmrc`) |
| pnpm | 9+ | Package manager |
| Docker | Latest | Local dev (optional), deploy target |

## Quick start

```bash
pnpm install
pnpm --filter @octant/web dev
```

Open `http://localhost:3000`.

## Repo structure

```
apps/web              Vite + React 19 frontend (the blog)
packages/ui           @workspace/ui shadcn component library
packages/validation   Zod schemas for content validation
docker/               nginx.conf for the GCP deploy
docs/adr/             Architecture Decision Records (6 blog-relevant)
scripts/              dev tooling
```

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

## Deploy

Static frontend served by Nginx in a Docker container on GCP.

- `Dockerfile.nginx` builds the production image.
- `docker/nginx.conf` configures the static host + SPA fallback.
- `docker-compose.yml` runs a local container for verification.

See `docs/adr/ADR-505` and `docs/adr/ADR-506` for the static-frontend hosting pattern.

## Content

- **Current**: Prismic.
- **Deferred**: Sanity.

## Architecture references

| ADR | Topic |
|-----|-------|
| ADR-000 | Turborepo monorepo template |
| ADR-001 | TypeScript module resolution |
| ADR-002 | Screaming architecture (folder pattern) |
| ADR-502 | Local dev bootstrap |
| ADR-505 | Nginx for frontend static hosting |
| ADR-506 | Runtime env injection for static frontends |

## Contributing

Atomic PRs, single-purpose, scoped under ~1000 lines of diff. No mixed concerns per PR. Each PR includes a Verify section with the commands a reviewer should run.
