import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { QrCode, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface QRShareButtonProps {
  iconOnly?: boolean
}

export function QRShareButton({ iconOnly = false }: QRShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const content = (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size={iconOnly ? 'icon' : 'default'}
          className={iconOnly ? 'h-8 w-8' : 'w-full justify-start gap-2'}
        >
          <QrCode className="h-4 w-4" />
          {!iconOnly && <span>Share QR code</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-lg bg-white p-2">
            <QRCodeSVG value={currentUrl} size={160} level="M" includeMargin={false} />
          </div>
          <p className="text-xs text-muted-foreground max-w-[160px] text-center truncate">
            {currentUrl}
          </p>
          <Button variant="outline" size="sm" onClick={handleCopy} className="w-full gap-2">
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy URL
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )

  if (iconOnly) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span>{content}</span>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Share via QR code</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}
