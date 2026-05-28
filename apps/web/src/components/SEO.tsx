import { Helmet } from 'react-helmet-async'

type SEOProps = {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogType?: 'website' | 'article'
}

export default function SEO({
  title,
  description,
  ogTitle,
  ogDescription,
  ogType = 'website',
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={ogTitle ?? title} />
      <meta property="og:description" content={ogDescription ?? description} />
      <meta property="og:type" content={ogType} />
    </Helmet>
  )
}
