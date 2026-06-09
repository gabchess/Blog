import { describe, it, expect, beforeEach, vi } from 'vitest'

// Ensure env vars are not set before importing
vi.stubEnv('VITE_SANITY_PROJECT_ID', '')
vi.stubEnv('VITE_SANITY_DATASET', '')

describe('posts (no env vars — fallback mode)', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.stubEnv('VITE_SANITY_PROJECT_ID', '')
    vi.stubEnv('VITE_SANITY_DATASET', '')
  })

  it('getPostList resolves to 3 fallback posts', async () => {
    const { getPostList } = await import('./posts')
    const posts = await getPostList()
    expect(posts).toHaveLength(3)
    expect(posts[0]).toMatchObject({ _id: expect.any(String), title: expect.any(String), slug: expect.any(String) })
  })

  it('getPost with known slug resolves with a body', async () => {
    const { getPost } = await import('./posts')
    const post = await getPost('welcome-to-the-octant-blog')
    expect(post).not.toBeNull()
    expect(Array.isArray(post?.body)).toBe(true)
    expect((post?.body.length ?? 0) > 0).toBe(true)
  })

  it('getPost with nonexistent slug resolves null', async () => {
    const { getPost } = await import('./posts')
    const post = await getPost('nonexistent-slug-xyz')
    expect(post).toBeNull()
  })
})
