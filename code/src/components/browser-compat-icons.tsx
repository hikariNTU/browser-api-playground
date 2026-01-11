import { useEffect, useState } from 'react'
import {
  getBrowserCompat,
  getBrowserCompatAsync,
  BROWSER_INFO,
  type BrowserKey,
  type BrowserCompatResult,
} from '@/lib/browser-compat'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface BrowserCompatIconsProps {
  compatKey?: string
  size?: 'sm' | 'md'
  className?: string
}

const BROWSER_ORDER: BrowserKey[] = ['chrome', 'firefox', 'safari', 'safari_ios', 'chrome_android']

/**
 * Hook to load browser compat data asynchronously
 */
function useBrowserCompat(compatKey?: string): {
  compat: BrowserCompatResult | null
  loading: boolean
} {
  // Try sync first (cached)
  const syncResult = compatKey ? getBrowserCompat(compatKey) : null
  const [compat, setCompat] = useState<BrowserCompatResult | null>(syncResult)
  const [loading, setLoading] = useState(!syncResult && !!compatKey)

  useEffect(() => {
    let cancelled = false

    if (!compatKey) {
      // Defer state updates to avoid sync setState in effect
      queueMicrotask(() => {
        if (cancelled) return
        setCompat(null)
        setLoading(false)
      })
      return () => {
        cancelled = true
      }
    }

    // If we already have sync result, no need to fetch
    const cached = getBrowserCompat(compatKey)
    if (cached) {
      queueMicrotask(() => {
        if (cancelled) return
        setCompat(cached)
        setLoading(false)
      })
      return () => {
        cancelled = true
      }
    }

    // Fetch async
    queueMicrotask(() => {
      if (!cancelled) setLoading(true)
    })
    getBrowserCompatAsync(compatKey)
      .then((result) => {
        if (!cancelled) setCompat(result)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [compatKey])

  return { compat, loading }
}

// Browser icons as simple SVG components
function ChromeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" />
    </svg>
  )
}

function FirefoxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.824 7.287c.008 0 .004 0 0 0zm-2.8-1.4c.006 0 .003 0 0 0zm16.754 2.161c-.505-1.215-1.53-2.528-2.333-2.943.654 1.283 1.033 2.57 1.177 3.53l.002.02c-1.314-3.278-3.544-4.6-5.366-7.477-.091-.147-.184-.292-.273-.446a3.545 3.545 0 0 1-.13-.24 2.118 2.118 0 0 1-.172-.46.03.03 0 0 0-.027-.03.038.038 0 0 0-.021 0l-.006.001-.006.001-.008.001c-2.044 1.198-2.736 3.41-2.8 4.518a4.258 4.258 0 0 0-2.346.909 2.56 2.56 0 0 0-.219-.18 3.936 3.936 0 0 1-.02-2.063 6.555 6.555 0 0 0-2.138 1.652 4.057 4.057 0 0 0-.7-.037c-.727 0-1.398.213-1.94.567a6.992 6.992 0 0 1 .168-.89l-.013-.002a4.003 4.003 0 0 0-1.262 1.546 8.084 8.084 0 0 0-.252.567l-.017.047-.012.033-.01.034c-.021.065-.04.13-.058.198A8.024 8.024 0 0 0 3.956 8.78l-.007.078-.006.065-.003.05-.003.055-.002.074-.001.037c-.003.103-.005.206-.004.31 0 5.46 4.432 9.884 9.892 9.884 4.87 0 8.915-3.521 9.733-8.156.013-.096.025-.192.036-.289.068-.61.075-1.237.012-1.862z" />
    </svg>
  )
}

function SafariIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.276-4.438l2.184-5.47 5.47-2.184-2.184 5.47-5.47 2.184zM12 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-.5-9h1v2h-1V4zm0 14h1v2h-1v-2zM4 11.5v-1h2v1H4zm14 0v-1h2v1h-2z" />
    </svg>
  )
}

function SafariIOSIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.276-4.438l2.184-5.47 5.47-2.184-2.184 5.47-5.47 2.184zM12 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-.5-9h1v2h-1V4zm0 14h1v2h-1v-2zM4 11.5v-1h2v1H4zm14 0v-1h2v1h-2z" />
    </svg>
  )
}

function ChromeAndroidIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z" />
    </svg>
  )
}

const BROWSER_ICONS: Record<BrowserKey, React.FC<{ className?: string }>> = {
  chrome: ChromeIcon,
  firefox: FirefoxIcon,
  safari: SafariIcon,
  safari_ios: SafariIOSIcon,
  chrome_android: ChromeAndroidIcon,
}

export function BrowserCompatIcons({ compatKey, size = 'sm', className }: BrowserCompatIconsProps) {
  const { compat, loading } = useBrowserCompat(compatKey)

  if (loading) {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!compat) {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <span className="text-xs text-muted-foreground">Compat data unavailable</span>
      </div>
    )
  }

  const iconSizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {BROWSER_ORDER.map((browser) => {
        const support = compat[browser]
        const info = BROWSER_INFO[browser]
        const IconComponent = BROWSER_ICONS[browser]

        return (
          <Tooltip key={browser}>
            <TooltipTrigger asChild>
              <span
                className={cn(
                  'flex items-center justify-center rounded p-1',
                  support.supported
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-red-500/10 text-red-600 dark:text-red-400 opacity-50'
                )}
              >
                <IconComponent className={iconSizeClass} />
              </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <div className="font-medium">{info.name}</div>
              {support.supported ? (
                <div className="text-emerald-600 dark:text-emerald-400">
                  ✓ {support.version ? `v${support.version}+` : 'Supported'}
                </div>
              ) : (
                <div className="text-red-600 dark:text-red-400">✗ Not supported</div>
              )}
            </TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  )
}

// Larger variant for intro pages with full browser names
export function BrowserCompatList({
  compatKey,
  className,
}: {
  compatKey?: string
  className?: string
}) {
  const { compat, loading } = useBrowserCompat(compatKey)

  if (loading) {
    return (
      <div className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}>
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading browser compatibility...</span>
      </div>
    )
  }

  if (!compat) {
    return (
      <div className={cn('text-sm text-muted-foreground', className)}>
        Browser compatibility data unavailable
      </div>
    )
  }

  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-2', className)}>
      {BROWSER_ORDER.map((browser) => {
        const support = compat[browser]
        const info = BROWSER_INFO[browser]
        const IconComponent = BROWSER_ICONS[browser]

        return (
          <div
            key={browser}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
              support.supported
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                : 'bg-red-500/10 text-red-700 dark:text-red-300 opacity-70'
            )}
          >
            <IconComponent
              className={cn('h-5 w-5', support.supported ? 'text-emerald-600' : 'text-red-600')}
            />
            <div className="flex flex-col leading-none gap-0.5">
              <span className="font-medium">{info.name}</span>
              {support.supported ? (
                <span className="text-xs opacity-75">
                  {support.version ? `v${support.version}+` : 'Supported'}
                </span>
              ) : (
                <span className="text-xs opacity-75">Not supported</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
