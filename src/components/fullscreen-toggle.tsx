import { useEffect, useState } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface FullscreenToggleProps {
  iconOnly?: boolean
}

export function FullscreenToggle({ iconOnly = false }: FullscreenToggleProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await document.documentElement.requestFullscreen()
      }
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }

  if (iconOnly) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="h-8 w-8">
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Button
      variant="ghost"
      onClick={toggleFullscreen}
      className="w-full justify-start gap-2 text-sm"
    >
      {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    </Button>
  )
}
