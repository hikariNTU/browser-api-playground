import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ScreenWakeLockPreview() {
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null)
  const [isActive, setIsActive] = useState(false)
  const isSupported = 'wakeLock' in navigator

  useEffect(() => {
    // Release wake lock when component unmounts
    return () => {
      if (wakeLock) {
        wakeLock.release()
      }
    }
  }, [wakeLock])

  const toggleWakeLock = async () => {
    if (!isSupported) return

    if (isActive && wakeLock) {
      await wakeLock.release()
      setWakeLock(null)
      setIsActive(false)
    } else {
      try {
        const lock = await navigator.wakeLock.request('screen')
        setWakeLock(lock)
        setIsActive(true)
        
        lock.addEventListener('release', () => {
          setIsActive(false)
          setWakeLock(null)
        })
      } catch (error) {
        console.error('Wake lock failed:', error)
      }
    }
  }

  if (!isSupported) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Screen Wake Lock API is not supported in this browser.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Button 
        onClick={toggleWakeLock}
        variant={isActive ? 'destructive' : 'default'}
        size="lg"
      >
        {isActive ? '🔓 Release Wake Lock' : '🔒 Request Wake Lock'}
      </Button>

      <div className={cn(
        "p-4 rounded-lg flex items-center gap-3",
        isActive ? "bg-emerald-500/10" : "bg-muted/50"
      )}>
        <div className={cn(
          "w-3 h-3 rounded-full",
          isActive ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/30"
        )} />
        <div>
          <div className={cn(
            "font-medium",
            isActive ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
          )}>
            {isActive ? 'Screen will stay awake' : 'Screen may dim normally'}
          </div>
          <div className="text-xs text-muted-foreground">
            {isActive 
              ? 'The display won\'t turn off while wake lock is active'
              : 'Click to prevent the screen from dimming'
            }
          </div>
        </div>
      </div>
    </div>
  )
}
