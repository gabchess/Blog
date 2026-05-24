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

Octant Blog v2 is a static Astro site serving reference-grade essays for Magdalena (DAO treasurer), Marcus (Ethereum-pilled builder), and Wei (onchain capital provider). The visual language is Octant-house: dark surface, teal accent, white text, logo-first header. It is an editorial surface, not a marketing page -- the chrome density of octant.build/en (gradient decorations, mascot illustrations, section-title image assets) is deliberately absent. The content does the work. The design signals "serious infrastructure."

Pole chosen: Octant-house. Dark theme. Brand-coherent header with SVG logo. Teal accent throughout. Post cards with optional cover image slot. One accent per page (teal only -- orange is reserved for callout elements and is not used in the base blog layout).

What is explicitly NOT in scope from octant.build/en: gradient background decorations, colourful pattern CTAs, section titles as image PNGs, octy mascot illustrations, feature image + mobile image responsive swap, protocol cards (Sky/Lido/Morpho), newsletter form with gradient button. Those are homepage marketing elements. The blog inherits the dark theme and the brand token set, not the homepage chrome.

## Colors

Dark base is `#181818` (--color-ink from globals.css). This is Octant's canonical dark surface. Do not substitute `#0A0A0A` or `#111111` -- the brand bible specifies `#181818` explicitly.

Four surface levels create depth without decorative gradients:
- `surface-base` (`#181818`): page background, header background.
- `surface-raised` (`#1E1E1E`): subtle elevation for the header on scroll (box-shadow only, no color change).
- `surface-card` (`#242424`): post cards. 3% lighter than base = readable separation without neon contrast.
- `surface-overlay` (`#2A2A2A`): subscribe CTA block, code blocks.

Text: `--color-off-white-2` (`#F8F8F8`) for primary on dark. `--color-mid-grey` (`#9BA19A`) for dates, captions, secondary copy. Do not use full white (`#FFFFFF`) -- it is too harsh against `#181818`. The `#F8F8F8` from the brand neutral palette is the correct choice.

Teal (`#2D9B87`) is the single accent. It handles: links, active nav item, CTA button background, post title hover, pull-quote left border, subscribe button. Hover state: `#25836F` (10% darker, computed from brand teal). Subtle fill: `rgba(45,155,135,0.12)` for the subscribe CTA block background.

Orange (`#FF9601`) is excluded from the base blog layout per the one-accent rule. It is available for individual post pages that want a highlight callout (a single post choosing orange as its accent), but the layout defaults to teal everywhere.

Border treatment: `rgba(255,255,255,0.08)` for default dividers (header border-bottom, card borders, list separators). `rgba(255,255,255,0.15)` for stronger borders (hover state on cards, focused inputs). This is softer than a solid hex border and reads as refined on dark backgrounds.

## Typography

Two families in production: Inter (display + body) and IBM Plex Mono (code + addresses). Canela is the planned display font pending Colophon license.

**Canela placeholder (critical for Bram):** All display headings use Inter 700 now. When Canela lands, Bram changes exactly one token: `--font-display` in globals.css from `'Inter', system-ui, serif` to `'Canela', Georgia, serif`. Nothing else changes. Post titles, the blog index heading, and pull-quotes will automatically adopt Canela. No other CSS changes needed.

Display headings (blog title, post titles, hero): Inter 700, tight line-height (1.25-1.3). On Canela swap: Canela Regular (400) for the blog index headline, Canela Bold (700) for individual post titles. The weight difference gives hierarchy between the listing and the article.

Body copy: Inter 400, 1.0625rem (17px), line-height 1.75. This is the correct reading size for long-form essays. Do not drop below 16px. Do not exceed 1.8 line-height (it reads as airy, not comfortable).

Dates and captions: Inter 400, 0.875rem (14px), `--color-mid-grey`. This size is visually subordinate without being unreadable.

Navigation: Inter 500, 1rem. Active: teal. Inactive: `#F8F8F8` at 80% opacity.

Code blocks and addresses: IBM Plex Mono 400, 0.9375rem (15px). Background: `--surface-overlay` (`#2A2A2A`). Text: `#F8F8F8`. Contract addresses specifically: IBM Plex Mono, teal color (`#2D9B87`) -- this signals "verifiable onchain reference" per the brand guidelines.

Reading line length: max-width 680px on the content column. This targets 65-75 characters per line at 17px Inter, which is the optimal reading range.

## Layout

Single-column centered layout. No sidebar. The content column is the only column.

Site max-width: 1200px (for the header nav bar). Content column: 680px (for article body and post listing). These two widths produce the correct "wide header, narrow content" hierarchy standard to editorial blogs.

Header: fixed height 64px, full-width, flex row with logo on left and nav on right. Padding: 0 24px at mobile, 0 48px at 768px+. The header does not collapse to a hamburger at any breakpoint for this build -- single nav item ("Blog") does not need a hamburger.

Post listing: vertical stack with 32px gap between cards. No grid at any breakpoint (single column is correct for this content type -- these are 1000-2000 word essays, not cards in a product catalog). Each card has a 16px interior padding, a subtle left border on hover (3px teal), and a card background (`#242424`) distinct from the page base.

Post page: article header (title + date), body, subscribe CTA block at bottom. No sidebar, no related-posts rail, no tag cloud. These are out of scope.

Hero on index: the "Octant Blog" heading at 2.5rem Inter 700 + one-line descriptor in mid-grey. This is not a hero image treatment -- that would require editorial imagery for every post, which is not available. The hero is typographic.

Breakpoint: 768px. Below 768px: padding reduces, card padding reduces. No layout restructure needed because the layout is already single column.

## Elevation and Depth

No box shadows on the page background. Cards use the `#242424` surface and a `rgba(255,255,255,0.08)` border -- that combination provides visual separation without elevation metaphors that belong to app UIs.

One exception: the subscribe CTA block uses a `rgba(45,155,135,0.12)` background fill and a `1px solid #2D9B87` border. This makes it visually distinct from the article body -- it reads as an enclosure, not a shadow.

Header on scroll: add `box-shadow: 0 1px 0 rgba(255,255,255,0.06)` to the header via a scroll listener (or CSS `position: sticky` automatic shadow). Do not change the background color on scroll.

## Shapes

Border radius: 6px on post cards. 4px on the subscribe CTA block. 3px on buttons. 2px on code blocks. Zero border radius on the header, footer, and content column. Rounded corners are for interactive elements only.

## Components

### Header

Structure: `<header>` fixed, full-width, 64px height. Flex row, `align-items: center`, `justify-content: space-between`. Left: SVG logo (`octant-horizontal-white.png` or `white logo.svg` from the asset manifest -- white variant for dark background). Right: `<nav>` with single link "Blog" pointing to `/`. Active state: teal. No secondary nav items in this build.

Logo size: height 28px, width auto. Do not use `octant-horizontal-black.png` -- that is for light backgrounds. Use the white/reversed variant on the dark header.

Tokens applied: `--surface-base` background, `rgba(255,255,255,0.08)` bottom border, Inter 500 for nav text.

Padding: 0 24px mobile, 0 48px desktop (768px+).

### Hero (homepage index)

Structure: typographic only. No hero image. H1 "Octant Blog" at 2.5rem Inter 700 `--color-off-white-2`. Below it: a single-line descriptor "Infrastructure thinking for yield-to-growth." at 1rem Inter 400 `--color-mid-grey`. Margin-bottom 48px before the post listing begins.

No gradient, no background image, no decorative elements. The dark base is the hero backdrop.

Spacing: padding-top 48px from the header. The combined header + hero top padding creates 112px of visual breathing room before the first post card.

### Post card (index listing)

Structure: `<article>` as a card. Background `#242424`, border `rgba(255,255,255,0.08)`, border-radius 6px, padding 20px 24px.

Anatomy (top to bottom):
1. Cover image (optional): if `featuredImage` present, render as `<img>` at 100% width, aspect-ratio 2/1 (landscape), object-fit cover, border-radius 6px 6px 0 0. If absent, no image slot shown -- the card starts at the title.
2. Post title: linked `<h2>` at 1.25rem Inter 600, `--color-off-white-2`. Hover: teal. No underline on hover -- color change is sufficient.
3. Published date: `<time>` at 0.875rem Inter 400, `--color-mid-grey`, margin-top 4px.
4. Excerpt: `<p>` at 1rem Inter 400, `--color-mid-grey` at 85% opacity (`rgba(155,161,154,0.85)`), margin-top 8px, 2-line clamp (`-webkit-line-clamp: 2`).

Hover state on the whole card: left border 3px solid teal, card background lightens to `#282828`. Transition: 150ms ease.

Width: 100% of the content column (680px max).

### Post page (full read)

Structure: `<article>` inside the content column. No card wrapper -- the article sits directly on the `#181818` base.

Anatomy:
1. Back link: `<a href="/">` with left arrow glyph, 0.875rem Inter 400, `--color-mid-grey`. Margin-bottom 32px.
2. Post title: `<h1>` at 2rem Inter 700, `--color-off-white-2`, line-height 1.3. This is the Canela swap point -- when Canela lands, this heading adopts the display font.
3. Published date: `<time>` at 0.875rem, `--color-mid-grey`, margin-top 8px, margin-bottom 40px.
4. Cover image (optional): if `featuredImage` present, full-width 100%, aspect-ratio 16/9, object-fit cover, border-radius 6px, margin-bottom 40px. If absent, skip.
5. Body: PortableText output. Font 1.0625rem Inter 400, line-height 1.75, `--color-off-white-2`. Paragraph spacing: margin-top 1.5rem between paragraphs. Headings within body: h2 at 1.375rem 600, h3 at 1.125rem 600, both `--color-off-white-2`. Code inline: IBM Plex Mono 0.9375rem, background `#2A2A2A`, padding 2px 6px, border-radius 2px. Code block: same family, 0.875rem, full-width background `#2A2A2A`, padding 16px 20px, border-radius 4px, horizontal scroll on overflow. Links within body: teal, underline on hover.
6. Subscribe CTA (below body, margin-top 64px).

### Footer

Structure: `<footer>` full-width, padding 32px 24px. Border-top `rgba(255,255,255,0.08)`. Background: same as page base (`#181818`).

Content: two-column flex (stacks on mobile below 480px). Left: copyright "2025 Octant. Powered by Gitcoin." Right: teal Substack subscribe link "Subscribe on Substack". Text at 0.875rem Inter 400 `--color-mid-grey`. Substack link: teal, no underline.

### Subscribe CTA

Structure: `<aside>` at end of post page. Background `rgba(45,135,135,0.12)` (teal-subtle), border `1px solid #2D9B87`, border-radius 4px, padding 24px 28px.

Heading: "Stay in the loop" at 1.125rem Inter 600, `--color-off-white-2`. Descriptor: 0.9375rem Inter 400, `--color-mid-grey`. Button: `<a>` styled as button, background `--color-teal`, white text, border-radius 3px, padding 10px 20px, Inter 600 0.9375rem, no underline. Hover: `#25836F` background. The button copy is "Subscribe on Substack" -- do not change this.

## Do's and Don'ts

**Do:**
- Use Inter 700 for all headings until Canela ships. Do not substitute with Georgia, system-serif, or any other fallback.
- Use `#F8F8F8` (`--color-off-white-2`) for primary text on dark backgrounds. Not pure white.
- Keep teal as the single accent on all pages. No orange in the layout.
- Show the cover image only when `featuredImage` is present. Do not render an empty image slot or a placeholder.
- Use IBM Plex Mono for all code and contract address elements.
- Add the back-link (`← Blog`) at the top of every post page.

**Don't:**
- Add gradient decorations, background patterns, or octy mascot illustrations. Those are octant.build homepage elements, not blog elements.
- Use the black logo variants (`octant-horizontal-black.png`, `Octant Horizontal Lockup Black Transparent.svg`) in the header. The header background is dark -- use the white variant.
- Apply orange and teal on the same page in the layout layer.
- Use inline styles in the final implementation. All styles live in globals.css or scoped `<style>` blocks in the Astro components. The current inline-style scaffold is what Bram is replacing.
- Add a hamburger menu. The nav has one item. It does not need to collapse.
- Use `--color-off-white-1` (`#F3F3F3`) or `--color-off-white-2` (`#F8F8F8`) as backgrounds anywhere in the dark theme. Those tokens are light-mode surfaces.

## Asset Manifest

Files to copy from your local Octant brand-assets folder (e.g. `$HOME/Desktop/Octant Branding Assets/`) into the repo's `public/` directory:

```
SOURCE                                              DESTINATION IN public/
octant-horizontal-white.png                        octant-logo-white.png
white logo.svg                                     octant-logo-white.svg
Octant Horizontal Lockup Black Transparent.svg     octant-logo-black.svg  (keep for future light-mode)
favicon-196x196.svg                                favicon.svg
apple-touch-icon-180x180.png                       apple-touch-icon.png
```

Use the SVG logo (`white logo.svg`) in the header `<img>` tag. The SVG is resolution-independent and preferred. The PNG fallback (`octant-logo-white.png`) is for email or contexts where SVG is not supported.

Octy mascot illustrations: NOT included in this build. They require placement decisions and editorial integration that is out of scope for the 60-minute Bram implementation.

Gradient backgrounds: NOT included. These are octant.build homepage decorative assets, not blog assets.

One-liner to execute from the repo root after file creation (set `BRAND_DIR` to wherever your brand-assets folder lives):

```bash
BRAND_DIR="$HOME/Desktop/Octant Branding Assets" \
&& cp "$BRAND_DIR/octant-horizontal-white.png" public/octant-logo-white.png \
&& cp "$BRAND_DIR/white logo.svg" public/octant-logo-white.svg \
&& cp "$BRAND_DIR/Octant Horizontal Lockup Black Transparent.svg" public/octant-logo-black.svg \
&& cp "$BRAND_DIR/favicon-196x196.svg" public/favicon.svg \
&& cp "$BRAND_DIR/apple-touch-icon-180x180.png" public/apple-touch-icon.png
```

## Sanity GROQ Extension

The Sanity schema uses `featuredImage` (not `mainImage`). Field type: `image` with an `asset` reference and an `alt` string.

Add to `allPostsQuery`:

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

Add to `singlePostQuery`:

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

The `->url` projection dereferences the asset reference and returns the CDN URL directly. This avoids needing the `@sanity/image-url` builder package in the client code. The URL returned is the full Sanity CDN URL; append `?w=1200&auto=format` query parameters for optimised delivery.

Update the `Post` interface in both `index.astro` and `[slug].astro` to include:

```typescript
interface Post {
  // existing fields...
  featuredImageUrl?: string;
  featuredImageAlt?: string;
}
```

Render as:
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

## Implementation Order for Bram

1. **Copy assets** (bash one-liner in Section 6 above). Creates the 5 files in `public/`. Verify they exist before touching any code.

2. **Update globals.css**: replace the current `:root` block with the full dark-theme token set from Section 2 (colors, typography, spacing). Add `--surface-base`, `--surface-raised`, `--surface-card`, `--surface-overlay`, `--text-primary`, `--text-secondary`, `--border-default`, `--border-strong`. Keep existing `--color-*` tokens for backwards compat -- just add new ones alongside. Set `body { background-color: var(--surface-base); color: var(--text-primary); }`. Update the Canela TODO comment to reference the exact `--font-display` swap point.

3. **Extend GROQ** in `src/lib/queries.ts`: add `featuredImageUrl` and `featuredImageAlt` projections per Section 7. Update both `allPostsQuery` and `singlePostQuery`.

4. **Rewrite Base.astro**: strip all inline styles. Implement header with white SVG logo (`/octant-logo-white.svg`), dark background, teal active nav link. Add `<link rel="icon" href="/favicon.svg">` to `<head>`. Add proper font preload for Inter and IBM Plex Mono. Add `<meta name="theme-color" content="#181818">`. Implement footer per Section 5 spec. Content `<main>` gets `max-width: 680px; margin: 0 auto; padding: 48px 24px 96px`. Remove the `style` attribute from `<header>`, `<main>`, and `<footer>`.

5. **Rewrite index.astro**: strip inline styles. Add typographic hero (Section 5 hero spec). Update `Post` interface to include `featuredImageUrl` and `featuredImageAlt`. Implement post card per Section 5 post-card spec. Cards in a vertical stack `<ul>` with `display: flex; flex-direction: column; gap: 32px`.

6. **Rewrite [slug].astro**: strip inline styles. Add back-link. Update `Post` interface. Implement cover image render (show only when `featuredImageUrl` present). Implement subscribe CTA per Section 5 spec. Wire PortableText body styles via scoped CSS (paragraphs, headings, code, links, blockquote).

7. **Move component styles to globals.css or scoped `<style>` blocks**: no inline styles should remain in any `.astro` file after this step. Audit with `grep -n "style=" src/layouts/Base.astro src/pages/index.astro src/pages/blog/[slug].astro` -- expected output should be zero matches for layout-level inline styles.

8. **Run build and verify**: `npm run build`. Expected: zero TypeScript errors, zero Astro build errors, 37 static HTML files generated, no 404s. Check that the `dist/` output contains `octant-logo-white.svg` and `favicon.svg` in the public-assets bundle.

9. **Em-dash audit** (paranoia check): run `grep -c` for the em-dash character in this file. Should return 0 after this step is complete.

10. **Commit and push**: `git add -A && git commit -m "feat: apply Octant-house design spec from DESIGN.md"` then push to trigger Vercel auto-deploy. Verify the Vercel preview URL renders the dark background and white logo before marking done.
