import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const compressionFormats = ['gzip', 'deflate', 'deflate-raw'] as const
type CompressionFormat = typeof compressionFormats[number]

export function CompressionStreamsPreview() {
  const [input, setInput] = useState('Hello, World! This is some text that will be compressed using the Compression Streams API.')
  const [format, setFormat] = useState<CompressionFormat>('gzip')
  const [result, setResult] = useState<{ original: number; compressed: number } | null>(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const isSupported = 'CompressionStream' in window

  const handleCompress = async () => {
    if (!isSupported || !input) return
    
    setIsCompressing(true)
    try {
      const encoder = new TextEncoder()
      const stream = new Blob([encoder.encode(input)])
        .stream()
        .pipeThrough(new CompressionStream(format as CompressionFormat))

      const compressedBlob = await new Response(stream).blob()
      
      setResult({
        original: new Blob([encoder.encode(input)]).size,
        compressed: compressedBlob.size,
      })
    } catch (error) {
      console.error('Compression failed:', error)
    } finally {
      setIsCompressing(false)
    }
  }

  if (!isSupported) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Compression Streams API is not supported in this browser.</p>
      </div>
    )
  }

  const ratio = result ? ((1 - result.compressed / result.original) * 100).toFixed(1) : null

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="compress-input">Text to compress</Label>
        <Textarea
          id="compress-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-24 resize-none"
          placeholder="Enter text to compress..."
        />
      </div>

      <div className="flex items-center gap-4">
        <Label>Format:</Label>
        <RadioGroup
          value={format}
          onValueChange={(value) => setFormat(value as CompressionFormat)}
          className="flex gap-4"
        >
          {compressionFormats.map((f) => (
            <div key={f} className="flex items-center gap-1.5">
              <RadioGroupItem value={f} id={`format-${f}`} />
              <Label htmlFor={`format-${f}`} className="font-normal cursor-pointer">{f}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Button onClick={handleCompress} disabled={isCompressing || !input}>
        {isCompressing ? 'Compressing...' : '🗜️ Compress'}
      </Button>

      {result && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">{result.original}</div>
            <div className="text-xs text-muted-foreground">Original (bytes)</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">{result.compressed}</div>
            <div className="text-xs text-muted-foreground">Compressed (bytes)</div>
          </div>
          <div className={cn(
            "text-center p-3 rounded-lg",
            Number(ratio) > 0 ? "bg-emerald-500/10" : "bg-amber-500/10"
          )}>
            <div className={cn(
              "text-2xl font-bold",
              Number(ratio) > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
            )}>
              {ratio}%
            </div>
            <div className="text-xs text-muted-foreground">Saved</div>
          </div>
        </div>
      )}
    </div>
  )
}
