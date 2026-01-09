import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useDevicePreference } from '@/hooks/use-device-preference'

export function MediaRecorderPreview() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [duration, setDuration] = useState(0)
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [selectedDevice, setSelectedDevice] = useDevicePreference('preferredMicrophone')
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<number | null>(null)
  const audioUrlRef = useRef<string | null>(null)
  const isSupported = 'MediaRecorder' in window

  // Keep audio URL ref in sync for cleanup
  useEffect(() => { audioUrlRef.current = audioUrl }, [audioUrl])

  useEffect(() => {
    // Request permission and enumerate audio input devices
    if (isSupported) {
      const enumerateWithPermission = async () => {
        try {
          // Request brief permission to get device labels
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
          stream.getTracks().forEach(t => t.stop())
          
          // Now enumerate with labels
          const deviceList = await navigator.mediaDevices.enumerateDevices()
          const audioInputs = deviceList.filter((d) => d.kind === 'audioinput')
          setDevices(audioInputs)
          if (audioInputs.length > 0 && !selectedDevice) {
            setSelectedDevice(audioInputs[0].deviceId)
          }
        } catch (err) {
          console.error('Microphone permission denied:', err)
          // Still enumerate (will have empty labels)
          const deviceList = await navigator.mediaDevices.enumerateDevices()
          const audioInputs = deviceList.filter((d) => d.kind === 'audioinput')
          setDevices(audioInputs)
        }
      }
      enumerateWithPermission()
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
  }, [isSupported])

  const startRecording = async () => {
    try {
      // Use nuqs state directly
      const deviceId = selectedDevice
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: deviceId ? { deviceId: { exact: deviceId } } : true,
      })
      
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current)
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach((track) => track.stop())
      }
      
      mediaRecorder.start()
      setIsRecording(true)
      setDuration(0)
      
      timerRef.current = window.setInterval(() => {
        setDuration((d) => d + 1)
      }, 1000)
    } catch (error) {
      console.error('Failed to start recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!isSupported) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>MediaRecorder API is not supported in this browser.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {devices.length > 0 && (
        <div className="space-y-2">
          <Label>Microphone</Label>
          <Select
            value={selectedDevice}
            onValueChange={setSelectedDevice}
            disabled={isRecording}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select microphone" />
            </SelectTrigger>
            <SelectContent>
              {devices.map((device, index) => (
                <SelectItem key={device.deviceId || `device-${index}`} value={device.deviceId || `device-${index}`}>
                  {device.label || `Microphone ${device.deviceId.slice(0, 8) || index + 1}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex items-center gap-3">
        {!isRecording ? (
          <Button onClick={startRecording} variant="destructive" size="lg">
            🎙️ Start Recording
          </Button>
        ) : (
          <Button onClick={stopRecording} variant="outline" size="lg">
            ⏹️ Stop Recording
          </Button>
        )}
        
        {isRecording && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-lg">{formatTime(duration)}</span>
          </div>
        )}
      </div>

      {audioUrl && !isRecording && (
        <div className={cn(
          "p-4 bg-muted/50 rounded-lg space-y-3"
        )}>
          <div className="text-sm font-medium">Recording ({formatTime(duration)})</div>
          <audio src={audioUrl} controls className="w-full" />
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        Record audio from your microphone. Grant permission when prompted.
      </p>
    </div>
  )
}
