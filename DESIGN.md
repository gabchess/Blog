---
version: alpha
name: Octant Blog v2
description: Dark-theme editorial blog for Octant Labs. Brand-coherent with octant.build. Infrastructure aesthetic, not marketing blog.

colors:
  surface:
    base: "#181818"
    raised: "#1E1E1E"
    card: "#242424"
    overlay: "#2A2A2A"
  text:
    primary: "#F8F8F8"
    secondary: "#9BA19A"
    muted: "#6B7280"
  accent:
    teal: "#2D9B87"
    teal-hover: "#25836F"
    teal-subtle: "rgba(45,155,135,0.12)"
  border:
    default: "rgba(255,255,255,0.08)"
    strong: "rgba(255,255,255,0.15)"
  feedback:
    orange: "#FF9601"

typography:
  display:
    fontFamily: "Inter"
    fontWeight: 700
    note: "Canela placeholder. When Canela file lands: swap --font-display to 'Canela', Georgia, serif. Token name: --font-display. Weight 400 (Canela Regular) or 700 (Canela Bold). No other font-family changes required."
  body:
    fontFamily: "Inter"
    fontWeight: 400
  mono:
    fontFamily: "IBM Plex Mono"
    fontWeight: 400
  scale:
    xs: "0.75rem"
    sm: "0.875rem"
    base: "1rem"
    md: "1.0625rem"
    lg: "1.125rem"
    xl: "1.25rem"
    "2xl": "1.5rem"
    "3xl": "2rem"
    "4xl": "2.5rem"
    "5xl": "3rem"
  lineHeight:
    tight: 1.25
    heading: 1.3
    body: 1.75
    relaxed: 1.85

spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "20": "80px"
  "24": "96px"

layout:
  content-max: "680px"
  site-max: "1200px"
  header-height: "64px"
  card-grid-cols: "1"
  card-grid-gap: "32px"
  breakpoint-md: "768px"

components:
  header:
    background: "{colors.surface.base}"
    border-bottom: "1px solid {colors.border.default}"
    height: "{layout.header-height}"
  post-card:
    background: "{colors.surface.card}"
    border: "1px solid {colors.border.default}"
    border-radius: "6px"
  subscribe-cta:
    background: "{colors.accent.teal-subtle}"
    border: "1px solid {colors.accent.teal}"
    border-radius: "4px"
---

## Overview

Static Astro site. Editorial, not marketing. Dark theme, teal accent, logo-first header. No gradients, mascots, or homepage chrome from octant.build.

## Colors

Surfaces: `#181818` (page/header), `#1E1E1E` (header scroll), `#242424` (cards), `#2A2A2A` (CTA/code). Token: `--color-ink`.

Text: `#F8F8F8` primary, `#9BA19A` secondary. Not `#FFFFFF`.

Teal `#2D9B87`: links, active nav, CTA button, title hover, pull-quote border. Hover: `#25836F`. Subtle: `rgba(45,155,135,0.12)`.

Orange `#FF9601`: individual post callouts only. Not in base layout.

Borders: `rgba(255,255,255,0.08)` default, `rgba(255,255,255,0.15)` hover.

## Typography

Inter (display + body) + IBM Plex Mono (code). Canela pending Colophon license.

Canela swap: change `--font-display` only. Regular (400) for index headline, Bold (700) for post titles.

Body: Inter 400, 1.0625rem, line-height 1.75.

Nav: Inter 500, 1rem. Active teal. Inactive `#F8F8F8` 80%.

Code/addresses: IBM Plex Mono 400, 0.9375rem, `#2A2A2A` bg. Contract addresses: teal.

Content column: 680px (65-75 chars/line at 17px).

## Layout

Single column. Site max-width 1200px. Content column 680px.

Header: 64px fixed, logo left / nav right. No hamburger.

Post listing: vertical stack, 32px gap.

Post page: back link, title, date, body, subscribe CTA. No sidebar, no related posts.

Hero: typographic only. No hero image. Breakpoint 768px: padding reduces only.

## Elevation, Depth, Shapes

Cards: `#242424` + `rgba(255,255,255,0.08)` border. No shadows.

Subscribe CTA: `rgba(45,155,135,0.12)` fill + `1px solid #2D9B87`.

Header scroll: `box-shadow: 0 1px 0 rgba(255,255,255,0.06)`. No color change.

Border radius: 6px cards, 4px CTA, 3px buttons, 2px code, 0 header/footer/content.

## Components

### Header

64px fixed, flex row, `justify-content: space-between`. Logo: `octant-logo-white.svg` height 28px. Nav: "Blog", teal active. Padding: 0 24px mobile, 0 48px desktop.

### Hero

H1 "Octant Blog" 2.5rem Inter 700 `#F8F8F8`. Descriptor: 1rem Inter 400 `#9BA19A`. Margin-bottom 48px, padding-top 48px.

### Post card

`#242424` bg, `rgba(255,255,255,0.08)` border, 6px radius, 20px 24px padding.

1. Cover image (optional): 100% width, aspect-ratio 2/1, object-fit cover, 6px 6px 0 0 radius.
2. Title: `<h2>` 1.25rem Inter 600, `#F8F8F8`. Hover: teal.
3. Date: `<time>` 0.875rem Inter 400, `#9BA19A`, margin-top 4px.
4. Excerpt: 1rem Inter 400, `rgba(155,161,154,0.85)`, margin-top 8px, 2-line clamp.

Hover: left border 3px teal, bg lightens to `#282828`. Transition 150ms ease.

### Post page

Article on `#181818` base (no card wrapper).

1. Back link: `<a href="/">` 0.875rem `#9BA19A`, margin-bottom 32px.
2. Title: `<h1>` 2rem Inter 700, line-height 1.3. Canela swap point.
3. Date: 0.875rem `#9BA19A`, margin-top 8px / bottom 40px.
4. Cover image (optional): 100% width, 16/9, object-fit cover, 6px radius, margin-bottom 40px.
5. Body: 1.0625rem Inter 400, line-height 1.75, paragraph margin-top 1.5rem. h2: 1.375rem 600. h3: 1.125rem 600. Inline code: Mono 0.9375rem, `#2A2A2A` bg, 2px 6px, 2px radius. Code block: 0.875rem, `#2A2A2A` bg, 16px 20px, 4px radius, overflow scroll. Links: teal, underline hover.
6. Subscribe CTA: margin-top 64px.

### Footer

Full-width, 32px 24px, border-top `rgba(255,255,255,0.08)`, `#181818` bg. Two-col flex (stacks below 480px). Left: copyright. Right: teal Substack link. 0.875rem `#9BA19A`.

### Subscribe CTA

`rgba(45,135,135,0.12)` bg, `1px solid #2D9B87`, 4px radius, 24px 28px. Heading: 1.125rem Inter 600. Button: teal bg, white, 3px radius, 10px 20px, Inter 600 0.9375rem. Copy: "Subscribe on Substack". Hover: `#25836F`.

## Do's and Don'ts

Do: Inter 700 until Canela. `#F8F8F8` primary text. Teal only. Cover image conditional. IBM Plex Mono code/addresses. Back link every post.

Don't: gradients, mascots, black logo in header, orange+teal in layout, inline styles, hamburger, light tokens as dark-theme backgrounds.

## Asset Manifest

```
SOURCE                                              DESTINATION IN public/
octant-horizontal-white.png                        octant-logo-white.png
white logo.svg                                     octant-logo-white.svg
Octant Horizontal Lockup Black Transparent.svg     octant-logo-black.svg
favicon-196x196.svg                                favicon.svg
apple-touch-icon-180x180.png                       apple-touch-icon.png
```

```bash
BRAND_DIR="$HOME/Desktop/Octant Branding Assets" \
&& cp "$BRAND_DIR/octant-horizontal-white.png" public/octant-logo-white.png \
&& cp "$BRAND_DIR/white logo.svg" public/octant-logo-white.svg \
&& cp "$BRAND_DIR/Octant Horizontal Lockup Black Transparent.svg" public/octant-logo-black.svg \
&& cp "$BRAND_DIR/favicon-196x196.svg" public/favicon.svg \
&& cp "$BRAND_DIR/apple-touch-icon-180x180.png" public/apple-touch-icon.png
```

SVG preferred. PNG fallback for email. Octy + gradients NOT in this build.

## Sanity GROQ Extension

Schema field: `featuredImage` (not `mainImage`). Type: `image` with `asset` + `alt`.

```typescript
export const allPostsQuery = `
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "featuredImageUrl": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt
  }
`;
```

```typescript
export const singlePostQuery = `
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body,
    "featuredImageUrl": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt
  }
`;
```

`->url` returns CDN URL directly. Append `?w=1200&auto=format`. Update `Post` interface in both files:

```typescript
interface Post {
  // existing fields...
  featuredImageUrl?: string;
  featuredImageAlt?: string;
}
```

```astro
{post.featuredImageUrl && (
  <img
    src={`${post.featuredImageUrl}?w=1200&auto=format`}
    alt={post.featuredImageAlt ?? post.title}
    loading="lazy"
    decoding="async"
  />
)}
```

## Implementation Order

1. Copy assets (bash one-liner above). Verify 5 files in `public/`.
2. `globals.css`: replace `:root` with dark-theme tokens (`--surface-*`, `--text-*`, `--border-*`). Keep `--color-*` for compat. Set body bg/color.
3. `src/lib/queries.ts`: add `featuredImageUrl` + `featuredImageAlt` to both queries.
4. `Base.astro`: strip inline styles. White SVG logo, dark header, teal nav. Favicon, font preloads, `theme-color #181818`. `<main>` max-width 680px, margin auto, padding 48px 24px 96px.
5. `index.astro`: typographic hero. Update `Post` interface. Cards in `<ul>` flex column gap 32px.
6. `[slug].astro`: back link, conditional cover image, subscribe CTA, PortableText body styles scoped.
7. Audit inline styles: `grep -n "style=" src/layouts/Base.astro src/pages/index.astro src/pages/blog/[slug].astro` -- expect 0.
8. `npm run build` -- expect 0 errors, 37 HTML files, `octant-logo-white.svg` + `favicon.svg` in `dist/`.
9. `git add -A && git commit -m "feat: apply Octant-house design spec from DESIGN.md"` then push.
