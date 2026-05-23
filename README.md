# Octant Blog v2

Static-first Astro rebuild of the Octant blog, replacing Next.js.

---

## Why this exists

Q flagged that Next.js carries unnecessary attack surface for a blog: server runtime, API endpoints, and middleware the content never needs. Static HTML on a CDN is the correct tool, with fewer moving parts and a smaller blast radius. Vercel manages the subscribe endpoint's runtime; there is no server for us to patch.

Astro preserves the Sanity integration, supports React islands where interactivity is genuinely needed (the subscribe form), and ships zero JavaScript by default for static pages.

---

## Stack

- **Astro 5.x** with `output: "server"` and ISR via the Vercel adapter: pre-rendered at deploy time, re-validated on schedule
- **@sanity/client** direct: editors use Sanity Studio at sanity.io; Studio Presentation dropped to cut complexity
- **@astrojs/react**: React island support for interactive components (subscribe form)
- **@astrojs/sitemap** and **@astrojs/rss**: sitemap and RSS feed at build time
- **Mailgun**: subscribe form POSTs to `src/pages/api/subscribe.ts`; API key never touches client-side JS

---

## Quick start

```bash
git clone https://github.com/gabchess/blog-v2
cd blog-v2
socket npm install   # bare npm install also works; socket adds supply-chain verification
cp .env.example .env.local
# Fill in SANITY_API_READ_TOKEN if you need draft content in development
# Fill in MAILGUN_API_KEY and MAILGUN_LIST_ADDRESS to test the subscribe form
npm run dev          # http://localhost:4321
```

---

## Project structure

```
blog-v2/
├── astro.config.mjs          # Astro config: output, ISR adapter, integrations
├── .env.example              # Required environment variables (copy to .env.local)
├── src/
│   ├── layouts/
│   │   └── Base.astro        # Root layout: fonts, global CSS, meta tags
│   ├── lib/
│   │   ├── sanity.ts         # Sanity client initialisation
│   │   └── queries.ts        # GROQ queries for posts and site content
│   ├── pages/
│   │   ├── index.astro       # Homepage: post list
│   │   ├── blog/
│   │   │   └── [slug].astro  # Individual post pages
│   │   └── api/
│   │       └── subscribe.ts  # Mailgun list subscription endpoint
│   └── styles/
│       └── globals.css       # Design tokens, font-face declarations, base styles
```

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in values as needed.

**Required for build:**

- `PUBLIC_SANITY_PROJECT_ID`: Sanity project ID (safe to expose, bundled into client)
- `PUBLIC_SANITY_DATASET`: Sanity dataset name, e.g. `production`
- `PUBLIC_SANITY_API_VERSION`: API version date, e.g. `2024-01-01`

**Required for draft content (development only):**

- `SANITY_API_READ_TOKEN`: Sanity API token with viewer permissions; needed to fetch unpublished drafts locally.

**Required for the subscribe form:**

- `MAILGUN_API_KEY`: Mailgun private API key; server-side only, never prefix with `PUBLIC_`
- `MAILGUN_LIST_ADDRESS`: Mailgun mailing list address (e.g. `newsletter@mg.example.com`)

**Required for ISR cache bypass (Vercel):**

- `VERCEL_BYPASS_TOKEN`: Token for on-demand ISR revalidation. Set in the Vercel project dashboard under Environment Variables.

---

## Deployment

Connected to Vercel via the GitHub integration. Pushes to any branch trigger a preview deployment. Production: merge to `main` or run `vercel --prod` locally.

Vercel project: `octant-blog-v2`. Preview URLs surface on each push in the GitHub PR conversation; production URL lives under the project settings.

---

## Sanity webhook (manual setup, post-Tuesday)

To trigger ISR revalidation on content publish, configure a webhook in [manage.sanity.io](https://manage.sanity.io):

- **Filter**: `_type == "post" && !(_id in path("drafts.**"))` (published posts only)
- **URL**: Vercel deploy hook URL (Settings > Git in the Vercel dashboard)
- **HTTP method**: POST

Without this webhook, published content appears after the next ISR window. With it, content is live within seconds. Deferred to post-Tuesday review.

---

## Open questions for Q (2026-05-26 pair)

Left open for the Tuesday review session. Not questions for general contributors.

1. **React component reuse**: is React island support a hard constraint, or negotiable given Vitalik's no-React reference site as a north star?
2. **Interactivity scope**: is the subscribe form the only client-side surface this blog needs, or are other interactive components planned?
3. **Vercel vs $5 VPS behind Cloudflare**: how close do we want to get to Vitalik's rsync deployment model, and does the ISR caching story change that calculus?

---

## Branding state

Inter and IBM Plex Mono load via Google Fonts and are working. Canela (the display typeface) requires a commercial licence file from Colophon Foundry, not yet delivered. Inter Bold substitutes for Canela in display contexts until then. Marked as TODO in `src/styles/globals.css`.

---

## Licence and acknowledgements

Copyright Octant Labs. All rights reserved. Contact the Octant Labs team for redistribution and reuse terms.
