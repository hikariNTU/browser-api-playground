import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { ExternalLink, ArrowLeft } from 'lucide-react'
import { appendixApis } from '@/data/appendix-apis'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BrowserCompatIcons } from '@/components/browser-compat-icons'

export const Route = createFileRoute('/appendix')({
  component: AppendixPage,
})

function AppendixPage() {
  useEffect(() => {
    document.title = 'More Browser APIs | Browser API Playground'
  }, [])

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Playground
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">More Browser APIs</h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Additional browser APIs worth knowing about. These don't have interactive demos yet, but
            you can explore them on MDN.
          </p>
        </div>

        {/* API Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appendixApis.map((api) => (
            <a
              key={api.compatKey}
              href={api.mdnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-border border-border/50">
                <CardHeader className="p-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {api.name}
                    </CardTitle>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {api.description}
                  </CardDescription>
                  <BrowserCompatIcons compatKey={api.compatKey} size="sm" />
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>
            Want to see a demo for one of these APIs?{' '}
            <a
              href="https://github.com/hikariNTU/browser-api-playground/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Open an issue
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
