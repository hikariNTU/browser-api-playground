import { createRootRoute, Link, Outlet, useRouterState } from '@tanstack/react-router'
import { Suspense, lazy, useState } from 'react'
import { demos } from '@/demos'
import { ThemeToggle } from '@/components/theme-toggle'
import { QRShareButton } from '@/components/qr-share-button'
import { FullscreenToggle } from '@/components/fullscreen-toggle'
import { MobileNotice } from '@/components/mobile-notice'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { PanelLeftClose, PanelLeft, MoreHorizontal } from 'lucide-react'
import { BrowserCompatIcons } from '@/components/browser-compat-icons'
import logoHorizontal from '@/assets/logo-horizontal.png'
import iconSquare from '@/assets/icon-square.png'

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import('@tanstack/react-router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    )

function RootLayout() {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed inset-0 flex overflow-hidden overscroll-none">
        {/* Sidebar */}
        <Collapsible
          open={!isCollapsed}
          onOpenChange={(open) => setIsCollapsed(!open)}
          className="flex"
        >
          <aside
            className={cn(
              'border-r border-border/50 bg-card flex flex-col transition-all duration-300 overflow-hidden h-full whitespace-nowrap',
              isCollapsed ? 'w-16' : 'w-72'
            )}
          >
            <div
              className={cn(
                'p-4 border-b border-border/50',
                isCollapsed
                  ? 'flex flex-col items-center gap-3'
                  : 'flex items-center justify-between'
              )}
            >
              {/* Expand/Collapse button - on top when collapsed */}
              {isCollapsed && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <PanelLeft className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Expand sidebar</p>
                  </TooltipContent>
                </Tooltip>
              )}

              {/* Collapsed state icon - below button */}
              {isCollapsed && (
                <Link to="/" className="block">
                  <img src={iconSquare} alt="Browser API Playground" className="h-8 w-8" />
                </Link>
              )}

              {/* Expanded state - horizontal layout */}
              <CollapsibleContent className="overflow-hidden">
                <Link to="/" className="block">
                  <img
                    src={logoHorizontal}
                    alt="Browser API Playground"
                    className="h-8 dark:invert"
                  />
                </Link>
              </CollapsibleContent>

              {!isCollapsed && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                        <PanelLeftClose className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Collapse sidebar</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            <CollapsibleContent className="flex-1 overflow-hidden relative">
              {/* Top fade gradient */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
              {/* Bottom fade gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
              <ScrollArea className="h-full px-4">
                <nav className="space-y-1 my-4">
                  {demos.map((demo) => {
                    const isSupported = demo.checkSupport()
                    const hasExamples = demo.examples && demo.examples.length > 0
                    const isIntroActive = currentPath === `/api/${demo.id}`

                    return (
                      <div key={demo.id}>
                        {/* Demo link - goes to intro page */}
                        <Link
                          to="/api/$apiId"
                          params={{ apiId: demo.id }}
                          className={cn(
                            'flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors',
                            'hover:bg-accent/50',
                            isIntroActive && 'bg-accent text-accent-foreground'
                          )}
                        >
                          <span className="font-medium">{demo.name}</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge
                                variant={isSupported ? 'default' : 'secondary'}
                                className={cn(
                                  'text-[10px] px-1.5 py-0',
                                  isSupported
                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                    : 'bg-muted text-muted-foreground'
                                )}
                              >
                                {isSupported ? '✓' : '✗'}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="p-2">
                              <BrowserCompatIcons compatKey={demo.compatKey} size="sm" />
                            </TooltipContent>
                          </Tooltip>
                        </Link>
                        
                        {/* Example sub-items (flat list, always visible) */}
                        {hasExamples && (
                          <div className="ml-6 mt-1 space-y-0.5 border-l border-border/50 pl-3">
                            {demo.examples!.map((example) => {
                              const isExampleActive = currentPath === `/api/${demo.id}/${example.id}`
                              return (
                                <Link
                                  key={example.id}
                                  to="/api/$apiId/$exampleId"
                                  params={{ apiId: demo.id, exampleId: example.id }}
                                  className={cn(
                                    'block px-3 py-1.5 rounded-md text-xs transition-colors',
                                    'hover:bg-accent/50 text-muted-foreground hover:text-foreground',
                                    isExampleActive && 'bg-accent/70 text-accent-foreground font-medium'
                                  )}
                                >
                                  {example.title}
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                  
                  {/* More APIs link */}
                  <Link
                    to="/appendix"
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-colors',
                      'hover:bg-accent/50 text-muted-foreground',
                      currentPath === '/appendix' && 'bg-accent text-accent-foreground'
                    )}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span>More APIs</span>
                  </Link>
                </nav>
              </ScrollArea>
            </CollapsibleContent>

            {/* Collapsed state - show icons with flyout popover */}
            {isCollapsed && (
              <div className="flex-1 overflow-hidden relative">
                {/* Top fade gradient */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-card to-transparent z-10 pointer-events-none" />
                {/* Bottom fade gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
                <ScrollArea className="h-full px-2">
                  <nav className="space-y-1 my-2">
                  {demos.map((demo) => {
                    const isDemoActive = currentPath === `/api/${demo.id}` || currentPath.startsWith(`/api/${demo.id}/`)
                    const isSupported = demo.checkSupport()
                    const hasExamples = demo.examples && demo.examples.length > 0

                    return (
                      <Popover key={demo.id}>
                        <PopoverTrigger asChild>
                          <button
                            className={cn(
                              'flex items-center justify-center w-12 h-12 rounded-lg text-sm transition-colors',
                              'hover:bg-accent/50',
                              isDemoActive && 'bg-accent text-accent-foreground'
                            )}
                          >
                            <div className="relative">
                              {/* Rounded square with initials */}
                              <div
                                className={cn(
                                  'w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold',
                                  isDemoActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-muted-foreground'
                                )}
                              >
                                {demo.name.slice(0, 2).toUpperCase()}
                              </div>
                              {/* Floating support badge */}
                              <div
                                className={cn(
                                  'absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px]',
                                  isSupported
                                    ? 'bg-emerald-500 text-white'
                                    : 'bg-red-500 text-white'
                                )}
                              >
                                {isSupported ? '✓' : '✗'}
                              </div>
                            </div>
                          </button>
                        </PopoverTrigger>
                        <PopoverContent side="right" align="start" className="w-56 p-2">
                          <div className="space-y-1">
                            <p className="font-medium text-sm px-2 py-1">{demo.name}</p>
                            <Link
                              to="/api/$apiId"
                              params={{ apiId: demo.id }}
                              className={cn(
                                'flex items-center px-2 py-1.5 rounded-md text-sm transition-colors',
                                'hover:bg-accent/50',
                                currentPath === `/api/${demo.id}` && 'bg-accent text-accent-foreground'
                              )}
                            >
                              Overview
                            </Link>
                            <Link
                              to="/api/$apiId/$exampleId"
                              params={{ apiId: demo.id, exampleId: 'default' }}
                              className={cn(
                                'flex items-center px-2 py-1.5 rounded-md text-sm transition-colors',
                                'hover:bg-accent/50',
                                currentPath === `/api/${demo.id}/default` && 'bg-accent text-accent-foreground'
                              )}
                            >
                              Default Demo
                            </Link>
                            {hasExamples && demo.examples!.map((example) => (
                              <Link
                                key={example.id}
                                to="/api/$apiId/$exampleId"
                                params={{ apiId: demo.id, exampleId: example.id }}
                                className={cn(
                                  'flex items-center px-2 py-1.5 rounded-md text-sm transition-colors',
                                  'hover:bg-accent/50',
                                  currentPath === `/api/${demo.id}/${example.id}` && 'bg-accent text-accent-foreground'
                                )}
                              >
                                {example.title}
                              </Link>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    )
                  })}
                </nav>
              </ScrollArea>
              </div>
            )}

            <div
              className={cn('p-4 border-t border-border/50', isCollapsed && 'flex justify-center')}
            >
              {isCollapsed ? (
                <div className="flex flex-col items-center gap-2">
                  <FullscreenToggle iconOnly />
                  <ThemeToggle iconOnly />
                  <QRShareButton iconOnly />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <FullscreenToggle />
                  <ThemeToggle />
                  <QRShareButton />
                </div>
              )}
            </div>
          </aside>
        </Collapsible>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>

        <MobileNotice />

        <Suspense>
          <TanStackRouterDevtools position="bottom-right" />
        </Suspense>
      </div>
    </TooltipProvider>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
