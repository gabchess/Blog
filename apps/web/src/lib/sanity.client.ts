import { createClient, type SanityClient } from '@sanity/client'

// Support both Vite (import.meta.env) and Node (process.env) contexts
const env =
  (typeof import.meta !== 'undefined' && import.meta.env) ||
  (typeof process !== 'undefined' ? process.env : {})

export function createSanityClient(): SanityClient | null {
  const projectId = env['VITE_SANITY_PROJECT_ID']
  const dataset = env['VITE_SANITY_DATASET']

  if (!projectId || !dataset) {
    return null
  }

  return createClient({
    projectId,
    dataset,
    useCdn: true,
    apiVersion: '2024-01-01',
  })
}
