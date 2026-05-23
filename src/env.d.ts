/// <reference types="astro/client" />

interface ImportMetaEnv {
  // Sanity (PUBLIC prefix means safe for client bundles)
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;
  readonly PUBLIC_SANITY_API_VERSION: string;

  // Sanity read token (server-side only)
  readonly SANITY_API_READ_TOKEN: string;

  // Mailgun (server-side only)
  readonly MAILGUN_API_KEY: string;
  readonly MAILGUN_LIST_ADDRESS: string;

  // Vercel ISR bypass (server-side only)
  readonly VERCEL_BYPASS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
