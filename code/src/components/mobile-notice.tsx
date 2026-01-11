import { useState, useEffect } from 'react'
import { X, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MobileNotice() {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('mobile-notice-dismissed') === 'true'
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768
      setIsMobile(mobile)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (dismissed || !isMobile) {
    return null
  }

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem('mobile-notice-dismissed', 'true')
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4">
        <div className="flex items-start gap-3">
          <Monitor className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm">Best experienced on desktop</p>
            <p className="text-xs text-muted-foreground mt-1">
              Many browser APIs in this playground require desktop features like multi-screen
              support, serial ports, or gamepads.
            </p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 flex-shrink-0"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
