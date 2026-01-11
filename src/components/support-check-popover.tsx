import { type ReactNode, useState, useRef, useCallback } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface SupportCheckPopoverProps {
  isSupported: boolean
  supportCheck?: string
  children?: ReactNode
  className?: string
}

export function SupportCheckPopover({
  isSupported,
  supportCheck,
  children,
  className,
}: SupportCheckPopoverProps) {
  const [open, setOpen] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false)
    }, 150)
  }, [])

  const badge = children || (
    <Badge
      variant={isSupported ? 'default' : 'secondary'}
      className={cn(
        'text-xs cursor-pointer',
        isSupported
          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
          : 'bg-muted text-muted-foreground hover:bg-muted/80',
        className
      )}
    >
      {isSupported ? 'Supported' : 'Unsupported'}
    </Badge>
  )

  if (!supportCheck) {
    return badge
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {badge}
        </span>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto max-w-sm p-3"
        side="bottom"
        align="end"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">Feature detection code:</div>
          <pre className="bg-muted px-3 py-2 rounded-md text-xs font-mono overflow-x-auto">
            <code>{supportCheck}</code>
          </pre>
          <div className="text-xs text-muted-foreground">
            {isSupported ? (
              <span className="text-emerald-600 dark:text-emerald-400">
                ✓ This browser supports this API
              </span>
            ) : (
              <span className="text-red-600 dark:text-red-400">
                ✗ This browser does not support this API
              </span>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
