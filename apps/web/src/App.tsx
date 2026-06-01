import { Button } from '@workspace/ui/components/button'
import { Layout } from './components/Layout'

export function App() {
  return (
    <Layout title="Octant Blog" description="Octant community blog">
      <p className="mb-4 text-neutral-600">Blog scaffolding in progress.</p>
      <Button>Hello from @workspace/ui</Button>
    </Layout>
  )
}
