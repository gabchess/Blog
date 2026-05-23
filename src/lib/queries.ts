// GROQ query definitions for blog-v2.
// All queries exclude drafts via !(_id in path("drafts.**")).

export const allPostsQuery = `
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt
  }
`;

export const singlePostQuery = `
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    body
  }
`;
