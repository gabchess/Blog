import { createSanityClient } from './sanity.client'
import { POST_LIST_QUERY, POST_DETAIL_QUERY } from './queries'
import { FALLBACK_POSTS } from './fallback-posts'

export type PostSummary = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  tag?: string
  imageUrl?: string
  imageAlt?: string
}

export type PostDetail = PostSummary & {
  authorName?: string
  seoTitle?: string
  seoDescription?: string
  customLink?: { url?: string; displayText?: string }
  body: unknown[]
}

// Type guards

function isPostSummary(x: unknown): x is PostSummary {
  if (typeof x !== 'object' || x === null) return false
  const o = x as Record<string, unknown>
  return (
    typeof o['_id'] === 'string' &&
    typeof o['title'] === 'string' &&
    typeof o['slug'] === 'string'
  )
}

function isPostDetail(x: unknown): x is PostDetail {
  if (!isPostSummary(x)) return false
  const o = x as Record<string, unknown>
  return Array.isArray(o['body'])
}

let warnedOnce = false

function warnOnce(msg: string) {
  if (!warnedOnce) {
    console.warn(msg)
    warnedOnce = true
  }
}

export async function getPostList(): Promise<PostSummary[]> {
  const client = createSanityClient()
  if (!client) {
    warnOnce('[posts] Sanity env vars not set — using fallback posts')
    return FALLBACK_POSTS
  }

  try {
    const results: unknown = await client.fetch(POST_LIST_QUERY)
    if (!Array.isArray(results)) {
      console.warn('[posts] getPostList: unexpected response shape, using fallback')
      return FALLBACK_POSTS
    }
    const valid = results.filter(isPostSummary)
    if (valid.length === 0 && results.length > 0) {
      console.warn('[posts] getPostList: no items passed type guard, using fallback')
      return FALLBACK_POSTS
    }
    return valid
  } catch (err) {
    console.warn('[posts] getPostList: fetch failed, using fallback', err)
    return FALLBACK_POSTS
  }
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  const client = createSanityClient()
  if (!client) {
    warnOnce('[posts] Sanity env vars not set — using fallback posts')
    return FALLBACK_POSTS.find((p) => p.slug === slug) ?? null
  }

  try {
    const result: unknown = await client.fetch(POST_DETAIL_QUERY, { slug })
    if (result === null || result === undefined) {
      return FALLBACK_POSTS.find((p) => p.slug === slug) ?? null
    }
    if (!isPostDetail(result)) {
      console.warn('[posts] getPost: response failed type guard, falling back')
      return FALLBACK_POSTS.find((p) => p.slug === slug) ?? null
    }
    return result
  } catch (err) {
    console.warn('[posts] getPost: fetch failed, using fallback', err)
    return FALLBACK_POSTS.find((p) => p.slug === slug) ?? null
  }
}
