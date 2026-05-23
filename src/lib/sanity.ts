import { createClient } from "@sanity/client";

// Public Sanity values: project ID + dataset + API version are not secrets.
// Fallbacks match the gabchess/octant-blog production pattern (see src/sanity/env.ts).
// Override per-environment via PUBLIC_SANITY_* env vars in Vercel dashboard.
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? "2zl2a0h3",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: true,
  perspective: "published",
});
