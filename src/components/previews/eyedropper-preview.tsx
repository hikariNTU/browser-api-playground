import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Pipette } from 'lucide-react'

export function EyeDropperPreview() {
  const [color, setColor] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const pickColor = async () => {
    if (!('EyeDropper' in window)) {
      setError('EyeDropper API not supported')
      return
    }

    try {
      // @ts-expect-error EyeDropper is experimental
      const eyeDropper = new EyeDropper()
      const result = await eyeDropper.open()
      setColor(result.sRGBHex)
      setError(null)
    } catch (e) {
      if ((e as Error).name !== 'AbortError') {
        setError('Failed to pick color')
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground text-center">
        Click the button to pick any color from your screen
      </p>
      
      <div className="flex items-center gap-4">
        <Button onClick={pickColor} className="gap-2">
          <Pipette className="h-4 w-4" />
          Pick Color
        </Button>
        
        {color && (
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-md border border-border shadow-sm"
              style={{ backgroundColor: color }}
            />
            <span className="font-mono text-sm">{color}</span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
