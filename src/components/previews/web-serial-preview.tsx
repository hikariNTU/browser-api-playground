import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function WebSerialPreview() {
  const [port, setPort] = useState<any | null>(null)
  const [portInfo, setPortInfo] = useState<{ usbVendorId?: number; usbProductId?: number } | null>(null)
  const [status, setStatus] = useState<'disconnected' | 'connected' | 'error'>('disconnected')
  const isSupported = 'serial' in navigator

  const handleConnect = async () => {
    if (!isSupported) return
    
    try {
      // @ts-ignore - Web Serial API not fully typed
      const selectedPort = await navigator.serial.requestPort()
      await selectedPort.open({ baudRate: 9600 })
      
      setPort(selectedPort)
      setPortInfo(selectedPort.getInfo())
      setStatus('connected')
    } catch (error) {
      if ((error as Error).name !== 'NotFoundError') {
        console.error('Serial connection failed:', error)
        setStatus('error')
      }
    }
  }

  const handleDisconnect = async () => {
    if (port) {
      await port.close()
      setPort(null)
      setPortInfo(null)
      setStatus('disconnected')
    }
  }

  if (!isSupported) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Web Serial API is not supported in this browser.</p>
        <p className="text-sm mt-1">Try Chrome or Edge.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {status === 'disconnected' && (
        <Button onClick={handleConnect}>
          🔌 Connect to Serial Device
        </Button>
      )}
      
      {status === 'connected' && (
        <Button variant="destructive" onClick={handleDisconnect}>
          ⏏️ Disconnect
        </Button>
      )}

      <div className={cn(
        "p-4 rounded-lg flex items-center gap-3",
        status === 'connected' ? "bg-emerald-500/10" : "bg-muted/50"
      )}>
        <div className={cn(
          "w-3 h-3 rounded-full",
          status === 'connected' ? "bg-emerald-500" : 
          status === 'error' ? "bg-red-500" : "bg-muted-foreground/30"
        )} />
        <div>
          <div className={cn(
            "font-medium",
            status === 'connected' ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
          )}>
            {status === 'connected' ? 'Connected' : 
             status === 'error' ? 'Connection Failed' : 'Not Connected'}
          </div>
          {portInfo && (
            <div className="text-xs text-muted-foreground">
              Vendor: {portInfo.usbVendorId?.toString(16) || 'N/A'} | 
              Product: {portInfo.usbProductId?.toString(16) || 'N/A'}
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Connect to Arduino, microcontrollers, and other serial devices directly from your browser.
      </p>
    </div>
  )
}
