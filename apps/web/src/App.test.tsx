import { describe, it, expect } from 'vitest'

describe('routes', () => {
  it('exports a routes array', async () => {
    const { routes } = await import('./routes')
    expect(Array.isArray(routes)).toBe(true)
    expect(routes.length).toBeGreaterThan(0)
  })
})
