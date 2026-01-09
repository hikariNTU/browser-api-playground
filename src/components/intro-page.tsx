import { Link } from '@tanstack/react-router'
import { ExternalLink, Code2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BrowserCompatList } from '@/components/browser-compat-icons'
import { SupportCheckPopover } from '@/components/support-check-popover'
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
              <SupportCheckPopover
                isSupported={isSupported}
                supportCheck={demo.supportCheck}
              />
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
