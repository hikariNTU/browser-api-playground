import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ScreenInfo {
  label: string
  width: number
  height: number
  isPrimary: boolean
  isInternal: boolean
}

export function WindowManagementPreview() {
  const [screens, setScreens] = useState<ScreenInfo[]>([])
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const isSupported = 'getScreenDetails' in window

  const requestPermission = async () => {
    if (!isSupported) return

    try {
      // @ts-expect-error - getScreenDetails not in TypeScript
      const screenDetails = (await window.getScreenDetails()) as { screens: ScreenInfo[] }
      setHasPermission(true)

      const screenList: ScreenInfo[] = screenDetails.screens.map((screen, i) => ({
        label: screen.label || `Screen ${i + 1}`,
        width: screen.width,
        height: screen.height,
        isPrimary: screen.isPrimary,
        isInternal: screen.isInternal,
      }))

      setScreens(screenList)
    } catch (error) {
      if ((error as Error).name === 'NotAllowedError') {
        setHasPermission(false)
      }
      console.error('Failed to get screen details:', error)
    }
  }

  useEffect(() => {
    // Show basic screen info if API not supported
    if (!isSupported) {
      // Defer state update to avoid sync setState in effect
      queueMicrotask(() => {
        setScreens([
          {
            label: 'Current Screen',
            width: window.screen.width,
            height: window.screen.height,
            isPrimary: true,
            isInternal: true,
          },
        ])
      })
    }
  }, [isSupported])

  if (!isSupported) {
    return (
      <div className="space-y-4">
        <div className="text-center py-4 text-muted-foreground">
          <p>Window Management API is not supported in this browser.</p>
          <p className="text-sm mt-1">Try Chrome with the flag enabled.</p>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-sm font-medium mb-2">Basic Screen Info:</div>
          <div className="text-sm text-muted-foreground">
            {window.screen.width} × {window.screen.height}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {hasPermission === null && (
        <Button onClick={requestPermission}>🖥️ Detect Connected Screens</Button>
      )}

      {hasPermission === false && (
        <div className="p-4 bg-amber-500/10 rounded-lg text-amber-600 dark:text-amber-400 text-sm">
          Permission denied. Please allow screen access to use this feature.
        </div>
      )}

      {screens.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm font-medium">
            {screens.length} screen{screens.length > 1 ? 's' : ''} detected
          </div>

          <div className="grid gap-3">
            {screens.map((screen, i) => (
              <div
                key={i}
                className={cn(
                  'p-4 rounded-lg border',
                  screen.isPrimary ? 'bg-primary/5 border-primary/20' : 'bg-muted/50'
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🖥️</span>
                  <span className="font-medium">{screen.label}</span>
                  {screen.isPrimary && (
                    <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                      Primary
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {screen.width} × {screen.height}
                  {screen.isInternal && ' • Built-in'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Detect and manage windows across multiple displays.
      </p>
    </div>
  )
}
