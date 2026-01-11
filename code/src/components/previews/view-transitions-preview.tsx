import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export function ViewTransitionsPreview() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState('#3b82f6')
  const boxRef = useRef<HTMLDivElement>(null)
  const isSupported = 'startViewTransition' in document

  const handleIncrement = useCallback(() => {
    if (isSupported) {
      document.startViewTransition(() => {
        setCount((c) => c + 1)
        setColor(COLORS[(count + 1) % COLORS.length])
      })
    } else {
      setCount((c) => c + 1)
      setColor(COLORS[(count + 1) % COLORS.length])
    }
  }, [count, isSupported])

  const handleReset = useCallback(() => {
    if (isSupported) {
      document.startViewTransition(() => {
        setCount(0)
        setColor('#3b82f6')
      })
    } else {
      setCount(0)
      setColor('#3b82f6')
    }
  }, [isSupported])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button onClick={handleIncrement}>✨ Increment</Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div
        ref={boxRef}
        className={cn(
          'w-32 h-32 rounded-xl flex items-center justify-center transition-all',
          'shadow-lg'
        )}
        style={{
          backgroundColor: color,
          viewTransitionName: 'counter-box',
        }}
      >
        <span className="text-4xl font-bold text-white">{count}</span>
      </div>

      <p className="text-sm text-muted-foreground">
        {isSupported
          ? '✅ View Transitions API is supported! Click to see smooth animations.'
          : '❌ View Transitions API not supported. Animations will be instant.'}
      </p>

      <style>{`
        ::view-transition-old(counter-box),
        ::view-transition-new(counter-box) {
          animation-duration: 0.3s;
        }
        ::view-transition-old(counter-box) {
          animation: fade-out 0.3s ease-out;
        }
        ::view-transition-new(counter-box) {
          animation: fade-in 0.3s ease-in;
        }
        @keyframes fade-out {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.8); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(1.2); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
