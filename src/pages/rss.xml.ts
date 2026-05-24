import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { sanityClient } from "../lib/sanity";
import { allPostsQuery } from "../lib/queries";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  _createdAt?: string;
  excerpt?: string;
}

export async function GET(context: APIContext) {
  const posts = await sanityClient.fetch<Post[]>(allPostsQuery);

  return rss({
    title: "Octant Blog",
    description:
      "Research, epoch recaps, and ecosystem news from the Octant protocol.",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.title,
      description: post.excerpt ?? "",
      link: `/blog/${post.slug.current}`,
      pubDate: post.publishedAt
        ? new Date(post.publishedAt)
        : post._createdAt
          ? new Date(post._createdAt)
          : new Date(),
    })),
  });
}
