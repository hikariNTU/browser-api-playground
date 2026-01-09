import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Play, Square, ExternalLink } from 'lucide-react'

const MORSE_CODE_URL = 'https://hikarintu.github.io/morse-code/'

export function AudioContextPreview() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [frequency, setFrequency] = useState(440)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const hasAudioContext = 'AudioContext' in window
  
  // Check if the linked URL has the same origin (both on github.io)
  const isSameOrigin = (() => {
    try {
      const currentHost = window.location.hostname
      const linkHost = new URL(MORSE_CODE_URL).hostname
      // Both are on github.io subdomains
      return currentHost.endsWith('.github.io') && linkHost.endsWith('.github.io')
    } catch {
      return false
    }
  })()

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop() } catch {}
        oscillatorRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
      }
    }
  }, [])

  const play = () => {
    if (!hasAudioContext) return

    const ctx = new AudioContext()
    audioContextRef.current = ctx

    const oscillator = ctx.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)
    oscillatorRef.current = oscillator

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gainRef.current = gain

    oscillator.connect(gain)
    gain.connect(ctx.destination)
    oscillator.start()

    setIsPlaying(true)
  }

  const stop = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop()
      oscillatorRef.current = null
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    setIsPlaying(false)
  }

  const handleFrequencyChange = (value: number[]) => {
    const newFreq = value[0]
    setFrequency(newFreq)
    if (oscillatorRef.current && audioContextRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(
        newFreq,
        audioContextRef.current.currentTime
      )
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-muted-foreground text-center">
        Generate a tone with the Web Audio API
      </p>

      {hasAudioContext ? (
        <>
          <div className="flex items-center gap-4">
            {isPlaying ? (
              <Button onClick={stop} variant="destructive" className="gap-2">
                <Square className="h-4 w-4" />
                Stop
              </Button>
            ) : (
              <Button onClick={play} className="gap-2">
                <Play className="h-4 w-4" />
                Play Tone
              </Button>
            )}
          </div>

          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-sm">
              <Label className="text-muted-foreground">Frequency</Label>
              <span className="font-mono">{frequency} Hz</span>
            </div>
            <Slider
              value={[frequency]}
              onValueChange={handleFrequencyChange}
              min={100}
              max={2000}
              step={10}
              className="w-full"
            />
          </div>
        </>
      ) : (
        <p className="text-sm text-destructive">AudioContext not supported</p>
      )}

      {isSameOrigin ? (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-xs text-muted-foreground hover:text-foreground underline cursor-pointer"
          >
            See also: Morse Code Generator →
          </button>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-4xl w-[90vw] h-[80vh] flex flex-col p-0 gap-0">
              <DialogHeader className="p-4 pb-2 shrink-0">
                <DialogTitle className="flex items-center gap-2">
                  Morse Code Generator
                  <a
                    href={MORSE_CODE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </DialogTitle>
              </DialogHeader>
              <iframe
                src={MORSE_CODE_URL}
                className="w-full flex-1 min-h-0 border-t"
                title="Morse Code Generator"
              />
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <a
          href={MORSE_CODE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground underline"
        >
          See also: Morse Code Generator →
        </a>
      )}
    </div>
  )
}
