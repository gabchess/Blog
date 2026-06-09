export const POST_LIST_QUERY = `
  *[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "tag": coalesce(tags[0], categories[0]->title),
    "imageUrl": featuredImage.asset->url,
    "imageAlt": coalesce(featuredImage.alt, title)
  }
`

export const POST_DETAIL_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "tag": coalesce(tags[0], categories[0]->title),
    "imageUrl": featuredImage.asset->url,
    "imageAlt": coalesce(featuredImage.alt, title),
    "authorName": author->name,
    "seoTitle": seo.seoTitle,
    "seoDescription": seo.seoDescription,
    customLink,
    body[] {
      ...,
      _type == "image" => {
        ...,
        "url": asset->url
      }
    }
  }
`
