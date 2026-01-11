import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useDevicePreference } from '@/hooks/use-device-preference'

export function WebRTCPreview() {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([])
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([])
  const [selectedCamera, setSelectedCamera] = useDevicePreference('preferredCamera')
  const [selectedMic, setSelectedMic] = useDevicePreference('preferredMicrophone')
  const [includeAudio, setIncludeAudio] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const isSupported = 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices

  // Keep stream ref in sync
  useEffect(() => {
    streamRef.current = stream
  }, [stream])

  useEffect(() => {
    if (isSupported) {
      // Request permission first to get device labels
      const enumerateWithPermission = async () => {
        try {
          const tempStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          tempStream.getTracks().forEach((t) => t.stop())
        } catch {
          // Permission denied, try with just video
          try {
            const tempStream = await navigator.mediaDevices.getUserMedia({ video: true })
            tempStream.getTracks().forEach((t) => t.stop())
          } catch {
            // No permission at all
          }
        }

        // Now enumerate with labels
        const deviceList = await navigator.mediaDevices.enumerateDevices()
        const videoInputs = deviceList.filter((d) => d.kind === 'videoinput')
        const audioInputs = deviceList.filter((d) => d.kind === 'audioinput')

        setCameras(videoInputs)
        setMicrophones(audioInputs)

        if (videoInputs.length > 0 && !selectedCamera) {
          setSelectedCamera(videoInputs[0].deviceId)
        }
        if (audioInputs.length > 0 && !selectedMic) {
          setSelectedMic(audioInputs[0].deviceId)
        }
      }
      enumerateWithPermission()
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSupported])

  const startCamera = async () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      // Use nuqs state directly
      const cameraId = selectedCamera
      const micId = selectedMic
      const withAudio = includeAudio

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: cameraId ? { deviceId: { exact: cameraId } } : true,
        audio: withAudio ? (micId ? { deviceId: { exact: micId } } : true) : false,
      })

      setStream(newStream)
      if (videoRef.current) {
        videoRef.current.srcObject = newStream
      }
    } catch (error) {
      console.error('Failed to start camera:', error)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      setStream(null)
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }

  if (!isSupported) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>WebRTC/getUserMedia is not supported in this browser.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {cameras.length > 0 && (
        <div className="space-y-2">
          <Label>Camera</Label>
          <Select value={selectedCamera} onValueChange={setSelectedCamera} disabled={!!stream}>
            <SelectTrigger>
              <SelectValue placeholder="Select camera" />
            </SelectTrigger>
            <SelectContent>
              {cameras.map((device, index) => (
                <SelectItem
                  key={device.deviceId || `camera-${index}`}
                  value={device.deviceId || `camera-${index}`}
                >
                  {device.label || `Camera ${device.deviceId.slice(0, 8) || index + 1}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {microphones.length > 0 && (
        <div className="space-y-2">
          <Label>Microphone</Label>
          <Select value={selectedMic} onValueChange={setSelectedMic} disabled={!!stream}>
            <SelectTrigger>
              <SelectValue placeholder="Select microphone" />
            </SelectTrigger>
            <SelectContent>
              {microphones.map((device, index) => (
                <SelectItem
                  key={device.deviceId || `mic-${index}`}
                  value={device.deviceId || `mic-${index}`}
                >
                  {device.label || `Microphone ${device.deviceId.slice(0, 8) || index + 1}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Checkbox
              id="include-audio"
              checked={includeAudio}
              onCheckedChange={(checked) => setIncludeAudio(checked === true)}
              disabled={!!stream}
            />
            <Label htmlFor="include-audio" className="font-normal cursor-pointer">
              Include audio in capture
            </Label>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        {!stream ? (
          <Button onClick={startCamera}>📷 Start Camera</Button>
        ) : (
          <Button variant="destructive" onClick={stopCamera}>
            ⏹️ Stop Camera
          </Button>
        )}
      </div>

      <div
        className={cn(
          'relative aspect-video bg-black rounded-lg overflow-hidden',
          !stream && 'flex items-center justify-center'
        )}
      >
        {stream ? (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        ) : (
          <div className="text-muted-foreground text-sm">Camera preview will appear here</div>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        Access your camera and microphone for real-time video/audio.
      </p>
    </div>
  )
}
