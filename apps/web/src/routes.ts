import type { RouteRecord } from 'vite-react-ssg'
import { getPostList } from './lib/posts'

export const routes: RouteRecord[] = [
  {
    path: '/',
    lazy: () => import('./pages/Home'),
    entry: 'src/pages/Home.tsx',
  },
  {
    path: '/posts/:slug',
    lazy: () => import('./pages/Post'),
    entry: 'src/pages/Post.tsx',
    getStaticPaths: async () => {
      const posts = await getPostList()
      return posts.map((p) => 'posts/' + p.slug)
    },
  },
]
