import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://blog-v2.vercel.app",
  output: "server",
  adapter: vercel({
    isr: {
      bypassToken: process.env.VERCEL_BYPASS_TOKEN,
      exclude: [/^\/api\/.+/, /^\/studio\/.*/],
    },
  }),
  integrations: [
    react(),
    sitemap(),
  ],
});
