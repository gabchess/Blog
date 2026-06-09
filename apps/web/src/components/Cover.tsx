import type { PostSummary } from '../lib/posts'

// Deterministic hash so a post always gets the same generated cover.
function hash(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

const PALETTES: [string, string, string][] = [
  ['#0f172a', '#3b82f6', '#22d3ee'],
  ['#1e1b4b', '#8b5cf6', '#f472b6'],
  ['#052e16', '#10b981', '#a3e635'],
  ['#27272a', '#f59e0b', '#fb7185'],
  ['#172554', '#06b6d4', '#818cf8'],
  ['#3f1d38', '#e879f9', '#fb923c'],
]

/** Abstract generated cover used when a post has no featured image. */
function GeneratedCover({ seed, className }: { seed: string; className?: string }) {
  const h = hash(seed)
  const [bg, c1, c2] = PALETTES[h % PALETTES.length] as [string, string, string]
  const cx1 = 20 + (h % 50)
  const cy1 = 15 + ((h >> 3) % 55)
  const cx2 = 55 + ((h >> 6) % 40)
  const cy2 = 40 + ((h >> 9) % 50)
  const r = 28 + ((h >> 12) % 22)
  const gid = `g-${h}`

  return (
    <svg
      viewBox="0 0 160 100"
      role="img"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`${gid}-a`} cx={`${cx1}%`} cy={`${cy1}%`} r="75%">
          <stop offset="0%" stopColor={c1} stopOpacity="0.9" />
          <stop offset="100%" stopColor={c1} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${gid}-b`} cx={`${cx2}%`} cy={`${cy2}%`} r="70%">
          <stop offset="0%" stopColor={c2} stopOpacity="0.85" />
          <stop offset="100%" stopColor={c2} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="160" height="100" fill={bg} />
      <rect width="160" height="100" fill={`url(#${gid}-a)`} />
      <rect width="160" height="100" fill={`url(#${gid}-b)`} />
      <circle cx={cx2 * 1.6} cy={cy1} r={r} fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" />
      <circle cx={cx1 * 1.6} cy={cy2} r={r / 2} fill="#fff" fillOpacity="0.12" />
      <path
        d={`M0 ${70 + (h % 20)} Q 60 ${30 + (h % 30)}, 160 ${60 + ((h >> 4) % 25)}`}
        fill="none"
        stroke="#fff"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
    </svg>
  )
}

type CoverProps = {
  post: Pick<PostSummary, 'slug' | 'title' | 'imageUrl' | 'imageAlt'>
  className?: string
}

/** Featured image if the post has one, otherwise a deterministic generated cover. */
export function Cover({ post, className }: CoverProps) {
  if (post.imageUrl) {
    return (
      <img
        src={post.imageUrl}
        alt={post.imageAlt ?? post.title}
        loading="lazy"
        className={className}
      />
    )
  }
  return <GeneratedCover seed={post.slug} className={className} />
}
