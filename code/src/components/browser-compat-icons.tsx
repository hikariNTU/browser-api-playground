import { useEffect, useState } from 'react'
import {
  getBrowserCompat,
  getBrowserCompatAsync,
  BROWSER_INFO,
  type BrowserKey,
  type BrowserCompatResult,
} from '@/lib/browser-compat'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

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
      <path d="M22.56 9.72c-.39-1.26-1.22-2.66-1.93-3.28.53 1.23.86 2.47 1 3.47v.02c-1.1-3.26-2.97-4.58-4.5-7.44-.08-.15-.15-.29-.23-.44-.07-.14-.12-.27-.16-.4-.05-.15-.08-.28-.08-.42 0-.01-.01-.02-.02-.02 0 0-.01 0-.02.01l-.01.01-.01.01c-1.7 1.18-2.28 3.38-2.34 4.48-.82.1-1.6.38-2.29.82-.07-.07-.14-.12-.22-.18-.22-.85-.22-1.75.02-2.6-.94.42-1.78 1.03-2.47 1.78-.22-.02-.44-.03-.66-.03-.72 0-1.4.12-2.04.34.01-.34.06-.67.14-.99-.67.34-1.26.8-1.73 1.36-.1.11-.19.22-.28.34-.54.27-.98.7-1.26 1.22-.02.05-.04.09-.06.14-.06.14-.11.27-.16.41l-.02.05-.01.03-.01.03c-.02.06-.03.11-.05.17-.22.71-.35 1.45-.39 2.2v.07l-.01.07v.05l-.01.05v.07l-.01.04v.03c0 5.46 4.43 9.88 9.89 9.88 4.87 0 8.92-3.52 9.74-8.16.01-.1.03-.19.04-.29.07-.61.08-1.23.01-1.86z" />
    </svg>
  )
}

function SafariIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.5c5.799 0 10.5 4.701 10.5 10.5S17.799 22.5 12 22.5 1.5 17.799 1.5 12 6.201 1.5 12 1.5zm0 .75c-.207 0-.375.168-.375.375v1.5c0 .207.168.375.375.375s.375-.168.375-.375v-1.5c0-.207-.168-.375-.375-.375zm5.303 2.197a.375.375 0 0 0-.265.11l-1.061 1.06a.375.375 0 1 0 .53.531l1.061-1.06a.375.375 0 0 0-.265-.641zM6.697 4.447a.375.375 0 0 0-.265.641l1.061 1.06a.375.375 0 1 0 .53-.53l-1.06-1.061a.375.375 0 0 0-.266-.11zM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 .75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm4.68 1.32L13.2 13.2l-5.13 3.48 3.48-5.13 5.13-3.48zM12 11.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm-9.375-.375a.375.375 0 0 0 0 .75h1.5a.375.375 0 0 0 0-.75h-1.5zm18 0a.375.375 0 0 0 0 .75h1.5a.375.375 0 0 0 0-.75h-1.5zm-14.118 5.617a.375.375 0 0 0-.265.641l1.061 1.06a.375.375 0 1 0 .53-.53l-1.06-1.061a.375.375 0 0 0-.266-.11zm11.986 0a.375.375 0 0 0-.265.11l-1.061 1.061a.375.375 0 1 0 .53.53l1.061-1.06a.375.375 0 0 0-.265-.641zM12 19.875c-.207 0-.375.168-.375.375v1.5c0 .207.168.375.375.375s.375-.168.375-.375v-1.5c0-.207-.168-.375-.375-.375z" />
    </svg>
  )
}

function SafariIOSIcon({ className }: { className?: string }) {
  // iOS icon - iPhone with Safari compass
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* iPhone body */}
      <rect
        x="5"
        y="1"
        width="14"
        height="22"
        rx="2.5"
        ry="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Screen area with Safari compass */}
      <circle cx="12" cy="11" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
      {/* Compass needle */}
      <path d="M14.5 8.5L11 12l-2.5 3.5 3.5-2.5 2.5-4.5z" />
      <circle cx="12" cy="11" r="0.75" />
      {/* Home indicator */}
      <rect x="9" y="20" width="6" height="1.5" rx="0.75" />
    </svg>
  )
}

function ChromeAndroidIcon({ className }: { className?: string }) {
  // Android icon with Chrome colors representation
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* Android robot head */}
      <path d="M6 10v6c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V17h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V17h1c.55 0 1-.45 1-1v-6H6z" />
      <path d="M3.5 10c-.83 0-1.5.67-1.5 1.5v5c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-5c0-.83-.67-1.5-1.5-1.5zm17 0c-.83 0-1.5.67-1.5 1.5v5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5c0-.83-.67-1.5-1.5-1.5z" />
      <path d="M15.53 2.16l1.3-1.3a.4.4 0 0 0-.56-.56l-1.43 1.43A5.95 5.95 0 0 0 12 1c-.98 0-1.9.24-2.73.63L7.84.2a.4.4 0 0 0-.56.56l1.3 1.3A5.96 5.96 0 0 0 6 7v1h12V7c0-1.86-.86-3.52-2.2-4.62l-.27-.22zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
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

  const iconSizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  const skeletonSizeClass = size === 'sm' ? 'h-6 w-6' : 'h-7 w-7'

  if (loading) {
    return (
      <div className={cn('flex items-center gap-1.5', className)}>
        {BROWSER_ORDER.map((browser) => (
          <Skeleton key={browser} className={cn('rounded', skeletonSizeClass)} />
        ))}
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
      <div className={cn('grid grid-cols-2 sm:grid-cols-3 gap-2', className)}>
        {BROWSER_ORDER.map((browser) => (
          <div key={browser} className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50">
            <Skeleton className="h-5 w-5 rounded" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-3.5 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        ))}
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
