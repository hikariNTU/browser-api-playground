import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface DeviceStatus {
  name: string
  supported: boolean
  checkFn: () => boolean
}

export function DeviceExperimentalPreview() {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null)
  const [isCharging, setIsCharging] = useState<boolean | null>(null)

  const devices: DeviceStatus[] = [
    {
      name: 'Geolocation',
      supported: 'geolocation' in navigator,
      checkFn: () => 'geolocation' in navigator,
    },
    {
      name: 'Device Orientation',
      supported: 'DeviceOrientationEvent' in window,
      checkFn: () => 'DeviceOrientationEvent' in window,
    },
    {
      name: 'Device Motion',
      supported: 'DeviceMotionEvent' in window,
      checkFn: () => 'DeviceMotionEvent' in window,
    },
    {
      name: 'Battery Status',
      supported: 'getBattery' in navigator,
      checkFn: () => 'getBattery' in navigator,
    },
    {
      name: 'Network Information',
      supported: 'connection' in navigator,
      checkFn: () => 'connection' in navigator,
    },
    { name: 'Vibration', supported: 'vibrate' in navigator, checkFn: () => 'vibrate' in navigator },
    {
      name: 'Bluetooth',
      supported: 'bluetooth' in navigator,
      checkFn: () => 'bluetooth' in navigator,
    },
    { name: 'USB', supported: 'usb' in navigator, checkFn: () => 'usb' in navigator },
    { name: 'NFC', supported: 'NDEFReader' in window, checkFn: () => 'NDEFReader' in window },
    {
      name: 'Ambient Light Sensor',
      supported: 'AmbientLightSensor' in window,
      checkFn: () => 'AmbientLightSensor' in window,
    },
  ]

  useEffect(() => {
    // Try to get battery info
    if ('getBattery' in navigator) {
      // @ts-expect-error - getBattery not in TypeScript
      navigator
        .getBattery()
        .then(
          (battery: {
            level: number
            charging: boolean
            addEventListener: (event: string, handler: () => void) => void
          }) => {
            setBatteryLevel(Math.round(battery.level * 100))
            setIsCharging(battery.charging)

            battery.addEventListener('levelchange', () => {
              setBatteryLevel(Math.round(battery.level * 100))
            })
            battery.addEventListener('chargingchange', () => {
              setIsCharging(battery.charging)
            })
          }
        )
        .catch(() => {})
    }
  }, [])

  const supportedCount = devices.filter((d) => d.supported).length

  return (
    <div className="space-y-4">
      {/* Battery widget */}
      {batteryLevel !== null && (
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{isCharging ? '🔌' : '🔋'}</span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Battery</span>
                <span className="text-sm text-muted-foreground">
                  {batteryLevel}% {isCharging && '(Charging)'}
                </span>
              </div>
              <div className="h-2 bg-background rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all',
                    batteryLevel > 20 ? 'bg-emerald-500' : 'bg-red-500'
                  )}
                  style={{ width: `${batteryLevel}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API support grid */}
      <div>
        <div className="text-sm font-medium mb-3">
          Device APIs ({supportedCount}/{devices.length} supported)
        </div>
        <div className="grid grid-cols-2 gap-2">
          {devices.map((device) => (
            <div
              key={device.name}
              className={cn(
                'px-3 py-2 rounded-lg text-sm flex items-center gap-2',
                device.supported ? 'bg-emerald-500/10' : 'bg-muted/50'
              )}
            >
              <span className={device.supported ? 'text-emerald-500' : 'text-muted-foreground'}>
                {device.supported ? '✓' : '✗'}
              </span>
              <span className={device.supported ? '' : 'text-muted-foreground'}>{device.name}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Access device sensors and hardware capabilities.
      </p>
    </div>
  )
}
