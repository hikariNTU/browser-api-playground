import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { demos } from '@/demos'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { BrowserCompatIcons } from '@/components/browser-compat-icons'
import { SupportCheckPopover } from '@/components/support-check-popover'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  useEffect(() => {
    document.title = 'Browser API Playground'
  }, [])

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Browser API Playground</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore powerful browser APIs with live, editable code examples. Pick an API below to
            start experimenting.
          </p>
        </div>

        {/* API Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => {
            const isSupported = demo.checkSupport()

            return (
              <Link key={demo.id} to="/api/$apiId" params={{ apiId: demo.id }} className="group">
                <Card
                  className={cn(
                    'h-full transition-all duration-200',
                    'hover:shadow-lg hover:border-border',
                    'border-border/50'
                  )}
                >
                  <CardHeader className="p-6 space-y-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                        {demo.name}
                      </CardTitle>
                      <div onClick={(e) => e.preventDefault()}>
                        <SupportCheckPopover
                          isSupported={isSupported}
                          supportCheck={demo.supportCheck}
                        />
                      </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {demo.description}
                    </CardDescription>
                    <BrowserCompatIcons compatKey={demo.compatKey} size="sm" />
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-muted-foreground space-y-2">
          <p>
            <Link
              to="/appendix"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Explore More Browser APIs →
            </Link>
          </p>
          <p>
            Built for Frontend team tech sharing •{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              MDN Web APIs
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
