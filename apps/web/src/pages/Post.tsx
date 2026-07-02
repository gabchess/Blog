import { useLoaderData, useParams } from 'react-router-dom'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import { Layout } from '../components/Layout'
import type { PostDetail } from '../lib/posts'
import { getPost } from '../lib/posts'

export async function loader({ params }: { params: { [key: string]: string | undefined } }) {
  const slug = params['slug'] ?? ''
  const post = await getPost(slug)
  return { post }
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: { url?: string; alt?: string; caption?: string } }) => {
      if (!value.url) return null
      return (
        <figure className="my-8">
          <img src={value.url} alt={value.alt ?? ''} className="w-full rounded-lg" loading="lazy" />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    codeBlock: ({ value }: { value: { code?: string; language?: string } }) => {
      if (!value.code) return null
      return (
        <pre className="my-6 overflow-x-auto rounded-lg bg-muted p-4 text-sm">
          <code data-language={value.language}>{value.code}</code>
        </pre>
      )
    },
  },
}

export function Component() {
  const { post } = useLoaderData() as { post: PostDetail | null }
  const { slug } = useParams<{ slug: string }>()

  if (!post) {
    return (
      <Layout title="Post not found" description="This post could not be found.">
        <p className="text-muted-foreground">
          Post &ldquo;{slug}&rdquo; not found.
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      title={post.seoTitle ?? post.title}
      description={post.seoDescription ?? post.excerpt ?? post.title}
    >
      <article>
        <header className="mb-8">
          {post.tag && (
            <Badge variant="secondary" className="mb-3 w-fit">
              {post.tag}
            </Badge>
          )}
          <h1 className="font-heading text-3xl font-bold leading-tight mb-2">
            {post.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {post.authorName && <span>{post.authorName}</span>}
            {post.authorName && post.publishedAt && <span> · </span>}
            {post.publishedAt && (
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
          </p>
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.imageAlt ?? post.title}
              className="mt-6 w-full rounded-lg"
            />
          )}
        </header>
        <div className="[&_p]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4 [&_h4]:font-semibold [&_h4]:mb-2 [&_h4]:mt-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-1 [&_a]:underline [&_a]:text-primary [&_blockquote]:border-l-4 [&_blockquote]:border-muted [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:mb-4">
          <PortableText
            value={post.body as Parameters<typeof PortableText>[0]['value']}
            components={portableTextComponents}
          />
        </div>
        {post.customLink?.url && (
          <div className="mt-8">
            <Button asChild>
              <a href={post.customLink.url} target="_blank" rel="noreferrer">
                {post.customLink.displayText ?? 'Learn more'}
              </a>
            </Button>
          </div>
        )}
      </article>
    </Layout>
  )
}

export default Component
