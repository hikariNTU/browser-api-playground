import { createFileRoute, notFound } from '@tanstack/react-router'
import { useEffect } from 'react'
import { getDemoById } from '@/demos'
import { IntroPage, IntroPageSkeleton, IntroPageError } from '@/components/intro-page'

export const Route = createFileRoute('/api/$apiId/')({
  component: ApiIntroPage,
  pendingComponent: IntroPageSkeleton,
  errorComponent: ({ error }) => (
    <IntroPageError error={error} onRetry={() => window.location.reload()} />
  ),
  loader: ({ params }) => {
    const demo = getDemoById(params.apiId)
    if (!demo) {
      throw notFound()
    }
    return { demo }
  },
  notFoundComponent: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">API Not Found</h2>
        <p className="text-muted-foreground">The requested API demo does not exist.</p>
      </div>
    </div>
  ),
})

function ApiIntroPage() {
  const { demo } = Route.useLoaderData()

  useEffect(() => {
    document.title = `${demo.name} | Browser API Playground`
  }, [demo.name])

  return <IntroPage key={demo.id} demo={demo} />
}
