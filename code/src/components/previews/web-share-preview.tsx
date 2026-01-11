import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function WebSharePreview() {
  const [status, setStatus] = useState<'idle' | 'shared' | 'cancelled' | 'error'>('idle')
  const isSupported = 'share' in navigator

  const handleShare = async () => {
    if (!isSupported) return

    try {
      await navigator.share({
        title: 'Browser API Playground',
        text: 'Check out these cool browser APIs!',
        url: window.location.href,
      })
      setStatus('shared')
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        setStatus('cancelled')
      } else {
        setStatus('error')
      }
    }

    setTimeout(() => setStatus('idle'), 3000)
  }

  if (!isSupported) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Web Share API is not supported in this browser.</p>
        <p className="text-sm mt-1">Try on mobile or use Safari/Edge.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleShare} size="lg">
        📤 Share This Page
      </Button>

      {status === 'shared' && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">✅ Shared successfully!</p>
      )}
      {status === 'cancelled' && (
        <p className="text-sm text-amber-600 dark:text-amber-400">❌ Share cancelled</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400">❌ Share failed</p>
      )}

      <p className="text-sm text-muted-foreground">
        Opens the native share dialog to share URLs, text, and files.
      </p>
    </div>
  )
}
