import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { demos } from '@/demos'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { BrowserCompatIcons } from '@/components/browser-compat-icons'
import { SupportCheckPopover } from '@/components/support-check-popover'
import logoHorizontal from '@/assets/logo-horizontal.png'
import { Code2, Sparkles, Zap } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  useEffect(() => {
    document.title = 'Browser API Playground'
  }, [])

  return (
    <div className="h-full overflow-auto">
      {/* Hero Section - Fixed behind content */}
      <div className="hero-gradient sticky top-0 overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute top-40 right-[15%] w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute bottom-10 left-[30%] w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float" />
        </div>

        <div className="relative max-w-6xl mx-auto px-8 py-20">
          <div className="text-center space-y-6">
            {/* Logo with glow effect */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full animate-pulse-ring" />
              <img
                src={logoHorizontal}
                alt="Browser API Playground"
                className="relative h-20 mx-auto dark:invert"
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Browser API Playground
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore powerful browser APIs with live, editable code examples. Pick an API below to
              start experimenting.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-sm">
                <Code2 className="h-4 w-4 text-primary" />
                <span>Live Code Editor</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-sm">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>Instant Preview</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 text-sm">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span>{demos.length}+ API Demos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content section that scrolls over the hero */}
      <div className="relative -mt-6">
        <div className="relative bg-background rounded-t-3xl shadow-[0_-4px_20px_rgb(0,0,0,0.08),0_-12px_40px_rgb(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgb(0,0,0,0.25),0_-12px_40px_rgb(0,0,0,0.2)]">
          <div className="max-w-6xl mx-auto px-8 pt-10 pb-12">
            {/* API Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demos.map((demo) => {
                const isSupported = demo.checkSupport()

                return (
                  <Link
                    key={demo.id}
                    to="/api/$apiId"
                    params={{ apiId: demo.id }}
                    className="group"
                  >
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
                </a>{' '}
                •{' '}
                <a
                  href="https://github.com/niclin/browser-api-playground"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
