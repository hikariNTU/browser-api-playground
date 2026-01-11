import { Link } from '@tanstack/react-router'
import { ExternalLink, Code2, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BrowserCompatList } from '@/components/browser-compat-icons'
import { SupportCheckPopover } from '@/components/support-check-popover'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import type { ApiDemo } from '@/demos'

interface IntroPageProps {
  demo: ApiDemo
}

export function IntroPage({ demo }: IntroPageProps) {
  const isSupported = demo.checkSupport()
  const PreviewComponent = demo.PreviewComponent

  // Use actual examples from the demo
  const exampleCards = (demo.examples || []).map((ex) => ({
    id: ex.id,
    title: ex.title,
    description: ex.description,
  }))

  return (
    <div className="h-full flex flex-col overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border/50 px-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">{demo.name}</h1>
              <SupportCheckPopover isSupported={isSupported} supportCheck={demo.supportCheck} />
            </div>
            <p className="text-muted-foreground">{demo.description}</p>
          </div>

          <a
            href={demo.mdnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            MDN Docs
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-8">
        {/* Browser Support Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Browser Support</h2>
          <BrowserCompatList compatKey={demo.compatKey} />
        </section>

        {/* Preview Section */}
        {PreviewComponent && (
          <section>
            <h2 className="text-lg font-semibold mb-4">Try it out</h2>
            <div className="border border-border rounded-lg p-6 bg-card">
              <PreviewComponent />
            </div>
          </section>
        )}

        {/* Examples Grid */}
        {exampleCards.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4">Examples</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {exampleCards.map((example) => (
                <Link
                  key={example.id}
                  to="/api/$apiId/$exampleId"
                  params={{ apiId: demo.id, exampleId: example.id }}
                  className="block"
                >
                  <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-muted-foreground" />
                        <CardTitle className="text-base">{example.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-2">
                        {example.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

/**
 * Skeleton loading state for IntroPage - matches the exact layout
 */
export function IntroPageSkeleton() {
  return (
    <div className="h-full flex flex-col overflow-auto">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-20 border-b border-border/50 px-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Skeleton className="h-5 w-80" />
          </div>
          <Skeleton className="h-5 w-20" />
        </div>
      </header>

      {/* Main Content Skeleton */}
      <div className="flex-1 p-6 space-y-8">
        {/* Browser Support Section Skeleton */}
        <section>
          <Skeleton className="h-6 w-36 mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50">
                <Skeleton className="h-5 w-5 rounded" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3.5 w-16" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Preview Section Skeleton */}
        <section>
          <Skeleton className="h-6 w-24 mb-4" />
          <div className="border border-border rounded-lg p-6 bg-card">
            <Skeleton className="h-32 w-full" />
          </div>
        </section>

        {/* Examples Grid Skeleton */}
        <section>
          <Skeleton className="h-6 w-24 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mt-1" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

/**
 * Error fallback for IntroPage
 */
export function IntroPageError({ error, onRetry }: { error?: Error | null; onRetry?: () => void }) {
  return (
    <div className="h-full flex flex-col overflow-auto">
      {/* Header placeholder */}
      <header className="sticky top-0 z-20 border-b border-border/50 px-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-6 w-6 text-destructive" />
          <h1 className="text-2xl font-semibold tracking-tight text-destructive">
            Error Loading API
          </h1>
        </div>
      </header>

      {/* Error Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="text-muted-foreground">
            {error?.message || 'Failed to load API demo. Please try again.'}
          </p>
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
