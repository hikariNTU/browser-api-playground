import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Mic, Volume2, Square } from 'lucide-react'
import { useDevicePreference } from '@/hooks/use-device-preference'

export function WebSpeechPreview() {
  const [mode, setMode] = useState<'idle' | 'speaking' | 'listening'>('idle')
  const [transcript, setTranscript] = useState('')

  // Plain useState for text and voice (no persistence needed)
  const [text, setText] = useState('Hello! I am the Web Speech API.')
  const [selectedVoice, setSelectedVoice] = useState('')
  // localStorage-persisted device preference for mic
  const [selectedMic, setSelectedMic] = useDevicePreference('preferredMicrophone')

  // Local state for browser-specific data
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Only need refs for ephemeral state used in callbacks
  const modeRef = useRef<'idle' | 'speaking' | 'listening'>('idle')
  const voicesRef = useRef<SpeechSynthesisVoice[]>([])

  // Keep refs in sync with state (only for ephemeral state)
  useEffect(() => {
    modeRef.current = mode
  }, [mode])
  useEffect(() => {
    voicesRef.current = voices
  }, [voices])

  const hasTTS = 'speechSynthesis' in window
  const hasASR = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

  // Request permission and enumerate devices on mount
  useEffect(() => {
    if (hasASR) {
      const enumerateWithPermission = async () => {
        try {
          // Request brief permission to get device labels
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
          stream.getTracks().forEach((t) => t.stop())

          // Now enumerate with labels
          const devices = await navigator.mediaDevices.enumerateDevices()
          const mics = devices.filter((d) => d.kind === 'audioinput')
          setMicrophones(mics)
          if (mics.length > 0 && !selectedMic) {
            setSelectedMic(mics[0].deviceId)
          }
        } catch (err) {
          console.error('Microphone permission denied:', err)
          // Still try to enumerate (will have empty labels)
          const devices = await navigator.mediaDevices.enumerateDevices()
          const mics = devices.filter((d) => d.kind === 'audioinput')
          setMicrophones(mics)
          if (mics.length > 0 && !selectedMic) {
            setSelectedMic(mics[0].deviceId)
          }
        }
      }
      enumerateWithPermission()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasASR])

  useEffect(() => {
    // Load voices
    if (hasTTS) {
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices()
        setVoices(availableVoices)
        if (availableVoices.length > 0 && !selectedVoice) {
          const defaultVoice = availableVoices.find((v) => v.default) || availableVoices[0]
          setSelectedVoice(defaultVoice.name)
        }
      }
      loadVoices()
      speechSynthesis.addEventListener('voiceschanged', loadVoices)
      return () => speechSynthesis.removeEventListener('voiceschanged', loadVoices)
    }
  }, [hasTTS, selectedVoice])

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
      }
      if (hasTTS) {
        speechSynthesis.cancel()
      }
    }
  }, [hasTTS])

  const speak = () => {
    if (!hasTTS || !text) return

    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const voice = voicesRef.current.find((v) => v.name === selectedVoice)
    if (voice) utterance.voice = voice
    utterance.onstart = () => setMode('speaking')
    utterance.onend = () => setMode('idle')
    utterance.onerror = () => setMode('idle')
    speechSynthesis.speak(utterance)
  }

  const listen = async () => {
    if (!hasASR) return

    try {
      // Use nuqs state directly
      const deviceId = selectedMic

      // Acquire stream with selected device
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: deviceId ? { deviceId: { exact: deviceId } } : true,
      })
      streamRef.current = stream

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognitionClass =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognitionClass()
      recognitionRef.current = recognition

      recognition.continuous = false
      recognition.interimResults = true

      recognition.onstart = () => {
        setMode('listening')
        setTranscript('')
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const result = event.results[event.results.length - 1]
        setTranscript(result[0].transcript)
      }

      recognition.onend = () => {
        setMode('idle')
        // Clean up stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop())
          streamRef.current = null
        }
      }

      recognition.onerror = () => {
        setMode('idle')
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop())
          streamRef.current = null
        }
      }

      // Pass the audio track to recognition.start()
      const audioTrack = stream.getAudioTracks()[0]
      recognition.start(audioTrack)
    } catch (err) {
      console.error('Failed to start recognition:', err)
      setMode('idle')
    }
  }

  const stop = () => {
    if (modeRef.current === 'speaking') {
      speechSynthesis.cancel()
    } else if (modeRef.current === 'listening') {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
    }
    setMode('idle')
  }

  return (
    <div className="space-y-4">
      {/* TTS Section */}
      {hasTTS && (
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="tts-text">Text to speak</Label>
            <Textarea
              id="tts-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="h-20 resize-none"
              placeholder="Enter text..."
              disabled={mode !== 'idle'}
            />
          </div>

          {voices.length > 0 && (
            <div className="space-y-2">
              <Label>Voice</Label>
              <Select
                value={selectedVoice}
                onValueChange={setSelectedVoice}
                disabled={mode !== 'idle'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {/* ASR Section */}
      {hasASR && microphones.length > 0 && (
        <div className="space-y-2">
          <Label>Microphone</Label>
          <Select value={selectedMic} onValueChange={setSelectedMic} disabled={mode !== 'idle'}>
            <SelectTrigger>
              <SelectValue placeholder="Select microphone" />
            </SelectTrigger>
            <SelectContent>
              {microphones.map((mic, index) => (
                <SelectItem
                  key={mic.deviceId || `mic-${index}`}
                  value={mic.deviceId || `mic-${index}`}
                >
                  {mic.label || `Microphone ${mic.deviceId.slice(0, 8) || index + 1}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center gap-3">
        {mode === 'idle' ? (
          <>
            {hasTTS && (
              <Button onClick={speak} variant="outline" className="gap-2" disabled={!text}>
                <Volume2 className="h-4 w-4" />
                Speak
              </Button>
            )}
            {hasASR && (
              <Button onClick={listen} variant="outline" className="gap-2">
                <Mic className="h-4 w-4" />
                Listen
              </Button>
            )}
          </>
        ) : (
          <Button onClick={stop} variant="destructive" className="gap-2">
            <Square className="h-4 w-4" />
            Stop
          </Button>
        )}
      </div>

      {mode === 'speaking' && <p className="text-sm animate-pulse">Speaking...</p>}

      {mode === 'listening' && (
        <div className="text-center">
          <p className="text-sm animate-pulse mb-2">Listening...</p>
          {transcript && <p className="text-sm bg-muted px-3 py-2 rounded-md">"{transcript}"</p>}
        </div>
      )}

      {!hasTTS && !hasASR && (
        <p className="text-sm text-destructive">Web Speech API not supported</p>
      )}
    </div>
  )
}
