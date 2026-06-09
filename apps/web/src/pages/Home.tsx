import { Link, useLoaderData } from 'react-router-dom'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Cover } from '../components/Cover'
import { Layout } from '../components/Layout'
import type { PostSummary } from '../lib/posts'
import { getPostList } from '../lib/posts'

export async function loader() {
  return getPostList()
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const COLLAGE_STYLES = [
  'absolute left-0 top-10 z-10 w-[55%] -rotate-3',
  'absolute right-0 top-0 z-20 w-[58%] rotate-2',
  'absolute bottom-0 left-[18%] z-30 w-[56%] rotate-1',
]

function HeroCollage({ posts }: { posts: PostSummary[] }) {
  return (
    <div className="relative hidden aspect-[5/4] lg:block" aria-hidden>
      {posts.slice(0, COLLAGE_STYLES.length).map((post, i) => (
        <Link
          key={post._id}
          to={`/posts/${post.slug}`}
          tabIndex={-1}
          className={`${COLLAGE_STYLES[i]} block overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-transform duration-300 hover:z-40 hover:scale-[1.03] hover:rotate-0`}
        >
          <Cover post={post} className="aspect-[16/10] w-full object-cover" />
          <div className="px-4 py-3">
            <p className="truncate font-serif text-sm font-bold text-foreground">
              {post.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

function PostRow({ post }: { post: PostSummary }) {
  return (
    <article className="group py-8 first:pt-0">
      <Link
        to={`/posts/${post.slug}`}
        className="flex items-start justify-between gap-6 sm:gap-10"
      >
        <div className="min-w-0 flex-1">
          {post.publishedAt && (
            <div className="mb-2 text-sm text-muted-foreground">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            </div>
          )}
          <h2 className="font-serif text-xl font-bold leading-snug tracking-tight text-foreground group-hover:underline sm:text-2xl">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="mt-2 line-clamp-2 text-base text-muted-foreground">
              {post.excerpt}
            </p>
          )}
          {post.tag && (
            <div className="mt-4">
              <Badge variant="secondary" className="rounded-full px-3 py-1 font-normal">
                {post.tag}
              </Badge>
            </div>
          )}
        </div>
        <Cover
          post={post}
          className="mt-1 aspect-[8/5] w-28 shrink-0 rounded-md object-cover sm:w-44"
        />
      </Link>
    </article>
  )
}

export function Component() {
  const posts = useLoaderData() as PostSummary[]
  const topics = [...new Set(posts.map((p) => p.tag).filter(Boolean))] as string[]

  return (
    <Layout title="Octant Blog" description="Octant community blog" fullBleed>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_420px] lg:py-24">
          <div>
            <h1 className="max-w-3xl font-serif text-5xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-7xl">
              Tech ideas &amp; stories from Octant.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Engineering notes, ecosystem updates, and deep dives on funding
              public goods — from the team and community building Octant.
            </p>
            <Button asChild size="lg" className="mt-8 rounded-full px-8 text-base">
              <a href="#latest">Start reading</a>
            </Button>
          </div>
          <HeroCollage posts={posts} />
        </div>
      </section>

      {/* Feed + topics */}
      <section id="latest" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Latest
            </h2>
            <div className="divide-y divide-border">
              {posts.map((post) => (
                <PostRow key={post._id} post={post} />
              ))}
            </div>
          </div>

          {topics.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24 border-l border-border pl-8">
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Discover topics
                </h2>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className="rounded-full px-3 py-1.5 font-normal"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default Component
