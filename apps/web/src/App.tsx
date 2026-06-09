import { Badge } from '@workspace/ui/components/badge'
import { Button } from '@workspace/ui/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card'
import { Separator } from '@workspace/ui/components/separator'
import { Skeleton } from '@workspace/ui/components/skeleton'
import { Layout } from './components/Layout'

const placeholderPosts = [
  {
    title: 'Welcome to the Octant blog',
    description: 'What we are building and why.',
    tag: 'Announcements',
  },
  {
    title: 'Funding public goods, round by round',
    description: 'A look at how Octant allocations work.',
    tag: 'Ecosystem',
  },
]

export function App() {
  return (
    <Layout title="Octant Blog" description="Octant community blog">
      <p className="text-muted-foreground mb-4">Blog scaffolding in progress.</p>
      <Separator className="mb-8" />
      <div className="grid gap-6 sm:grid-cols-2">
        {placeholderPosts.map((post) => (
          <Card key={post.title}>
            <CardHeader>
              <Badge variant="secondary" className="mb-2 w-fit">
                {post.tag}
              </Badge>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full rounded-md" />
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                Read more
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  )
}
