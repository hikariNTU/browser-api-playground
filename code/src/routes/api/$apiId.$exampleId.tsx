import { createFileRoute, notFound } from '@tanstack/react-router'
import { useEffect } from 'react'
import { getExampleById } from '@/demos'
import { ApiPlayground } from '@/components/api-playground'

export const Route = createFileRoute('/api/$apiId/$exampleId')({
  component: ExamplePlaygroundPage,
  loader: ({ params }) => {
    const result = getExampleById(params.apiId, params.exampleId)
    if (!result) {
      throw notFound()
    }
    return result
  },
  notFoundComponent: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold">Example Not Found</h2>
        <p className="text-muted-foreground">The requested example does not exist.</p>
      </div>
    </div>
  ),
})

function ExamplePlaygroundPage() {
  const { demo, example } = Route.useLoaderData()

  useEffect(() => {
    const title =
      example.id === 'default'
        ? `${demo.name} | Browser API Playground`
        : `${example.title} - ${demo.name} | Browser API Playground`
    document.title = title
  }, [demo.name, example.id, example.title])

  // Use key to force remount when example changes, ensuring fresh state
  return <ApiPlayground key={`${demo.id}-${example.id}`} demo={demo} example={example} />
}
