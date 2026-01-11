import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import Markdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { codeToHtml } from 'shiki'
import { useSlides, useSlideNavigation, type Slide } from '@/hooks/use-slides'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  GripHorizontal,
  Loader2,
  Maximize2,
  Minimize2,
  Sparkles,
} from 'lucide-react'
import './slides-panel.css'

// Safari-specific gesture event interface
interface GestureEvent extends UIEvent {
  scale: number
  rotation: number
}

const STORAGE_KEY = 'slides-panel-state'
const BLUR_STORAGE_KEY = 'slides-panel-blur'
const MINIMIZED_STORAGE_KEY = 'slides-panel-minimized'
const DEFAULT_POSITION = { x: -1, y: -1 } // -1 means use default (bottom-right)
const DEFAULT_SIZE = { width: 500, height: 400 }
const MIN_SIZE = { width: 350, height: 280 }
const MINIMIZED_HEIGHT = 48 // Height of minimized strip
const MINIMIZED_WIDTH = 280 // Width of minimized strip

function loadMinimizedState(): boolean {
  try {
    const stored = localStorage.getItem(MINIMIZED_STORAGE_KEY)
    return stored === 'true'
  } catch {
    return false
  }
}

function saveMinimizedState(minimized: boolean) {
  try {
    localStorage.setItem(MINIMIZED_STORAGE_KEY, String(minimized))
  } catch {
    // Ignore storage errors
  }
}

function loadBlurPreference(): boolean {
  try {
    const stored = localStorage.getItem(BLUR_STORAGE_KEY)
    return stored !== 'false' // Default to true
  } catch {
    return true
  }
}

function saveBlurPreference(enabled: boolean) {
  try {
    localStorage.setItem(BLUR_STORAGE_KEY, String(enabled))
  } catch {
    // Ignore storage errors
  }
}

interface PanelState {
  position: { x: number; y: number }
  size: { width: number; height: number }
}

function loadPanelState(): PanelState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // Ignore parse errors
  }
  return { position: DEFAULT_POSITION, size: DEFAULT_SIZE }
}

function savePanelState(state: PanelState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // Ignore storage errors
  }
}

// Preview strip showing mini slide thumbnails with hover preview
function SlidePreviewStrip({
  slides,
  currentIndex,
  onSelectSlide,
  onPrevious,
  onNext,
  isFirst,
  isLast,
}: {
  slides: Slide[]
  currentIndex: number
  onSelectSlide: (index: number) => void
  onPrevious: () => void
  onNext: () => void
  isFirst: boolean
  isLast: boolean
}) {
  const stripRef = useRef<HTMLDivElement>(null)

  // Group slides by fileSource
  const groupedSlides = useMemo(() => {
    const groups: { name: string; slides: { slide: Slide; globalIndex: number }[] }[] = []
    let currentGroup: (typeof groups)[0] | null = null

    slides.forEach((slide, idx) => {
      if (slide.isFirstInGroup || !currentGroup) {
        currentGroup = { name: slide.fileGroup, slides: [] }
        groups.push(currentGroup)
      }
      currentGroup.slides.push({ slide, globalIndex: idx })
    })

    return groups
  }, [slides])

  // Scroll to keep current slide visible
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return

    const currentThumb = strip.querySelector(`[data-index="${currentIndex}"]`) as HTMLElement
    if (currentThumb) {
      currentThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }, [currentIndex])

  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {/* Previous button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onPrevious}
            disabled={isFirst}
            className="shrink-0 focus:ring-0 focus-visible:ring-0 focus:outline-none"
          >
            <ChevronLeft className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Previous (←)</p>
        </TooltipContent>
      </Tooltip>

      {/* Thumbnail strip */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <ScrollArea className="w-full">
          <div ref={stripRef} className="flex py-1 items-start">
            {groupedSlides.map((group, groupIdx) => (
              <div
                key={group.name}
                className="flex items-start shrink-0"
                style={{ marginLeft: groupIdx > 0 ? '12px' : '0' }}
              >
                {/* Sticky container - 0 width so it doesn't take space */}
                <div className="sticky left-0 z-10 w-0 h-0 pointer-events-none">
                  <span className="absolute top-0 left-0 text-[9px] font-medium text-muted-foreground whitespace-nowrap px-1.5 py-0.5 rounded bg-muted/80 border border-border/50">
                    {group.name}
                  </span>
                </div>
                {/* Group thumbnails */}
                <div className="flex gap-1.5">
                  {group.slides.map(({ slide, globalIndex }) => (
                    <SlidePreviewThumbnail
                      key={slide.id}
                      slide={slide}
                      index={globalIndex}
                      isActive={globalIndex === currentIndex}
                      onSelect={() => onSelectSlide(globalIndex)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Next button */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onNext}
            disabled={isLast}
            className="shrink-0 focus:ring-0 focus-visible:ring-0 focus:outline-none"
          >
            <ChevronRight className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Next (→)</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

// Individual thumbnail with popover preview
function SlidePreviewThumbnail({
  slide,
  index,
  isActive,
  onSelect,
}: {
  slide: Slide
  index: number
  isActive: boolean
  onSelect: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150)
  }, [])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          data-index={index}
          onClick={onSelect}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn(
            'shrink-0 w-16 h-12 rounded border text-[6px] leading-tight p-1 overflow-hidden transition-all',
            'hover:border-primary/50 hover:bg-accent/50',
            'focus:outline-none focus-visible:outline-none',
            isActive
              ? 'border-primary bg-primary/10 ring-2 ring-primary/30'
              : 'border-border bg-muted/30'
          )}
        >
          <div className="font-medium truncate text-[8px]">{index + 1}</div>
          <div className="text-muted-foreground truncate">{slide.title}</div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        className="w-72 max-h-48 p-3 overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="text-xs font-medium text-muted-foreground mb-1">Slide {index + 1}</div>
        <div className="text-sm font-semibold mb-2 truncate">{slide.title}</div>
        <ScrollArea className="h-28">
          <div className="slide-content origin-top-left scale-50 w-[200%]">
            <Markdown remarkPlugins={[remarkGfm]}>
              {slide.content.slice(0, 500) + (slide.content.length > 500 ? '...' : '')}
            </Markdown>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

// Custom link component that handles internal navigation
function SlideLink({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href?.startsWith('/')) {
      e.preventDefault()
      navigate({ to: href })
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-primary underline underline-offset-2 hover:text-primary/80"
      target={href?.startsWith('/') ? undefined : '_blank'}
      rel={href?.startsWith('/') ? undefined : 'noopener noreferrer'}
      {...props}
    >
      {children}
    </a>
  )
}

// Custom image/video component - handles base path for absolute URLs
function SlideMedia({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  // Prepend base URL for absolute paths (e.g., /slides/image.png -> /browser-api-playground/slides/image.png)
  const resolvedSrc = src?.startsWith('/')
    ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${src}`
    : src
  const isVideo = resolvedSrc && /\.(mp4|webm|ogg)$/i.test(resolvedSrc)

  if (isVideo) {
    return (
      <video
        src={resolvedSrc}
        controls
        className="max-w-full h-auto rounded-md my-2"
        {...(props as React.VideoHTMLAttributes<HTMLVideoElement>)}
      />
    )
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt || ''}
      className="max-w-full h-auto rounded-md my-2"
      {...props}
    />
  )
}

// Inner component that handles highlighting with proper state reset
function HighlightedCodeInner({
  code,
  language,
  isDark,
  className,
  ...props
}: {
  code: string
  language: string
  isDark: boolean
  className?: string
} & React.HTMLAttributes<HTMLElement>) {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    codeToHtml(code, {
      lang: language,
      theme: isDark ? 'github-dark' : 'github-light',
    })
      .then((html) => {
        if (!cancelled) {
          // Extract just the inner content from shiki's <pre><code>...</code></pre>
          // to avoid double wrapping since react-markdown already provides <pre><code>
          const match = html.match(/<pre[^>]*><code[^>]*>([\s\S]*)<\/code><\/pre>/)
          const innerHtml = match ? match[1] : html
          setHighlightedHtml(innerHtml)
        }
      })
      .catch(() => {
        // If language is not supported, keep null to show plain code
      })

    return () => {
      cancelled = true
    }
  }, [code, language, isDark])

  // While loading, render plain code
  if (highlightedHtml === null) {
    return (
      <code className={className} {...props}>
        {code}
      </code>
    )
  }

  // Render highlighted code
  return (
    <code
      className={cn(className, 'shiki-code')}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      {...props}
    />
  )
}

// Syntax highlighted code block component
function SlideCodeBlock({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }) {
  // Extract language from className (e.g., "language-js" -> "js")
  const languageMatch = className?.match(/language-(\w+)/)
  const language = languageMatch?.[1]

  // Get current theme from document root class
  const isDark =
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')

  const code = String(children).replace(/\n$/, '')

  // For inline code (no language), render plain code
  if (!language) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }

  // Use key to reset state when code/language/theme changes
  return (
    <HighlightedCodeInner
      key={`${code}-${language}-${isDark}`}
      code={code}
      language={language}
      isDark={isDark}
      className={className}
      {...props}
    />
  )
}

// Custom pre component with ScrollArea for horizontal scrolling
function SlidePreBlock({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement> & { children?: React.ReactNode }) {
  return (
    <ScrollArea className="slide-pre-scroll">
      <pre {...props}>{children}</pre>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

interface SlidesPanelProps {
  open: boolean
  onClose: () => void
}

export default function SlidesPanel({ open, onClose }: SlidesPanelProps) {
  const { slides, isLoading, error } = useSlides()
  const navigation = useSlideNavigation(slides.length)

  const [panelState, setPanelState] = useState<PanelState>(loadPanelState)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeEdges, setResizeEdges] = useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  })
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(loadMinimizedState)
  const [isBlurEnabled, setIsBlurEnabled] = useState(loadBlurPreference)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  // Listen to window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleBlur = useCallback(() => {
    setIsBlurEnabled((prev) => {
      const next = !prev
      saveBlurPreference(next)
      return next
    })
  }, [])

  const toggleMinimized = useCallback(() => {
    setIsMinimized((prev) => {
      const next = !prev
      saveMinimizedState(next)
      return next
    })
  }, [])

  const panelRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const resizeStartRef = useRef({ width: 0, height: 0, x: 0, y: 0, posX: 0, posY: 0 })
  const pinchStartScaleRef = useRef(1)
  const pinchAccumulatorRef = useRef(0)
  const pinchResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pinchCooldownRef = useRef(false)

  // Compute actual position (default to bottom-right if -1)
  const actualPosition = useMemo(() => {
    if (isMaximized) {
      return { x: 20, y: 20 }
    }
    if (isMinimized) {
      // Position minimized strip at bottom-right
      return {
        x: windowSize.width - MINIMIZED_WIDTH - 20,
        y: windowSize.height - MINIMIZED_HEIGHT - 20,
      }
    }
    const { x, y } = panelState.position
    if (x === -1 || y === -1) {
      return {
        x: windowSize.width - panelState.size.width - 20,
        y: windowSize.height - panelState.size.height - 20,
      }
    }
    return { x, y }
  }, [panelState.position, panelState.size, isMaximized, isMinimized, windowSize])

  const actualSize = isMaximized
    ? { width: windowSize.width - 40, height: windowSize.height - 40 }
    : isMinimized
      ? { width: MINIMIZED_WIDTH, height: MINIMIZED_HEIGHT }
      : panelState.size

  // Pinch gesture handlers for trackpad (Safari uses gesturestart/gesturechange, others use wheel with ctrlKey for pinch)
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    if (!panel) return

    // Safari-specific gesture events
    const handleGestureStart = (e: Event) => {
      e.preventDefault()
      pinchStartScaleRef.current = (e as GestureEvent).scale
    }

    const handleGestureChange = (e: Event) => {
      e.preventDefault()
      if (pinchCooldownRef.current) return
      const gestureEvent = e as GestureEvent
      const scaleDelta = gestureEvent.scale - pinchStartScaleRef.current

      // Gesture flow: Maximized ←→ Normal ←→ Minimized
      // Pinch in (scaleDelta < 0): Maximize → Normal → Minimize
      // Pinch out (scaleDelta > 0): Minimize → Normal → Maximize
      if (scaleDelta < -0.15) {
        if (isMaximized) {
          setIsMaximized(false)
          pinchCooldownRef.current = true
        } else if (!isMinimized) {
          setIsMinimized(true)
          saveMinimizedState(true)
          pinchCooldownRef.current = true
        }
      } else if (scaleDelta > 0.15) {
        if (isMinimized) {
          setIsMinimized(false)
          saveMinimizedState(false)
          pinchCooldownRef.current = true
        } else if (!isMaximized) {
          setIsMaximized(true)
          pinchCooldownRef.current = true
        }
      }
    }

    const handleGestureEnd = (e: Event) => {
      e.preventDefault()
      pinchStartScaleRef.current = 1
      pinchCooldownRef.current = false
    }

    // For non-Safari browsers, detect pinch via wheel event with ctrlKey
    // (trackpad pinch triggers wheel events with ctrlKey=true)
    // Chrome sends many small deltaY values, so we accumulate them
    const handleWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return
      e.preventDefault()

      // Clear any existing reset timeout
      if (pinchResetTimeoutRef.current) {
        clearTimeout(pinchResetTimeoutRef.current)
      }

      // If in cooldown, don't accumulate but wait for gesture to end
      if (pinchCooldownRef.current) {
        pinchResetTimeoutRef.current = setTimeout(() => {
          pinchAccumulatorRef.current = 0
          pinchCooldownRef.current = false
        }, 300)
        return
      }

      // Accumulate deltaY values
      pinchAccumulatorRef.current += e.deltaY

      // Reset accumulator after 200ms of no pinch events
      pinchResetTimeoutRef.current = setTimeout(() => {
        pinchAccumulatorRef.current = 0
        pinchCooldownRef.current = false
      }, 200)

      // Gesture flow: Maximized ←→ Normal ←→ Minimized
      // Positive deltaY (pinch in): Maximize → Normal → Minimize
      // Negative deltaY (pinch out): Minimize → Normal → Maximize
      if (pinchAccumulatorRef.current > 25) {
        if (isMaximized) {
          setIsMaximized(false)
          pinchAccumulatorRef.current = 0
          pinchCooldownRef.current = true
        } else if (!isMinimized) {
          setIsMinimized(true)
          saveMinimizedState(true)
          pinchAccumulatorRef.current = 0
          pinchCooldownRef.current = true
        }
      } else if (pinchAccumulatorRef.current < -25) {
        if (isMinimized) {
          setIsMinimized(false)
          saveMinimizedState(false)
          pinchAccumulatorRef.current = 0
          pinchCooldownRef.current = true
        } else if (!isMaximized) {
          setIsMaximized(true)
          pinchAccumulatorRef.current = 0
          pinchCooldownRef.current = true
        }
      }
    }

    // Add Safari gesture events
    panel.addEventListener('gesturestart', handleGestureStart)
    panel.addEventListener('gesturechange', handleGestureChange)
    panel.addEventListener('gestureend', handleGestureEnd)
    // Add wheel event for non-Safari trackpad pinch
    panel.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      panel.removeEventListener('gesturestart', handleGestureStart)
      panel.removeEventListener('gesturechange', handleGestureChange)
      panel.removeEventListener('gestureend', handleGestureEnd)
      panel.removeEventListener('wheel', handleWheel)
      if (pinchResetTimeoutRef.current) {
        clearTimeout(pinchResetTimeoutRef.current)
      }
    }
  }, [open, isMinimized, isMaximized])

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if we're in an input element
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // If minimized, restore on any navigation key
      if (isMinimized) {
        if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
          e.preventDefault()
          setIsMinimized(false)
          saveMinimizedState(false)
          return
        }
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          navigation.goNext()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          navigation.goPrevious()
          break
        case 'Home':
          e.preventDefault()
          navigation.goFirst()
          break
        case 'End':
          e.preventDefault()
          navigation.goLast()
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, navigation, onClose, isMinimized])

  // Drag handlers
  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized || isMinimized) return
      e.preventDefault()
      setIsDragging(true)
      dragStartRef.current = {
        x: e.clientX - actualPosition.x,
        y: e.clientY - actualPosition.y,
      }
    },
    [actualPosition, isMaximized, isMinimized]
  )

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(
        0,
        Math.min(e.clientX - dragStartRef.current.x, window.innerWidth - panelState.size.width)
      )
      const newY = Math.max(
        0,
        Math.min(e.clientY - dragStartRef.current.y, window.innerHeight - panelState.size.height)
      )
      setPanelState((prev) => ({
        ...prev,
        position: { x: newX, y: newY },
      }))
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      savePanelState({ position: panelState.position, size: panelState.size })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, panelState.size, panelState.position])

  // Resize handlers
  const handleResizeStart = useCallback(
    (
      e: React.MouseEvent,
      edges: { top?: boolean; right?: boolean; bottom?: boolean; left?: boolean }
    ) => {
      if (isMaximized || isMinimized) return
      e.preventDefault()
      e.stopPropagation()
      setIsResizing(true)
      setResizeEdges({
        top: !!edges.top,
        right: !!edges.right,
        bottom: !!edges.bottom,
        left: !!edges.left,
      })
      resizeStartRef.current = {
        width: panelState.size.width,
        height: panelState.size.height,
        x: e.clientX,
        y: e.clientY,
        posX: actualPosition.x,
        posY: actualPosition.y,
      }
    },
    [panelState.size, isMaximized, isMinimized, actualPosition]
  )

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStartRef.current.x
      const deltaY = e.clientY - resizeStartRef.current.y

      let newWidth = resizeStartRef.current.width
      let newHeight = resizeStartRef.current.height
      let newX = resizeStartRef.current.posX
      let newY = resizeStartRef.current.posY

      // Handle right edge resize
      if (resizeEdges.right) {
        const maxWidth = Math.min(window.innerWidth * 0.8, window.innerWidth - newX - 20)
        newWidth = Math.max(
          MIN_SIZE.width,
          Math.min(resizeStartRef.current.width + deltaX, maxWidth)
        )
      }

      // Handle left edge resize
      if (resizeEdges.left) {
        const potentialWidth = resizeStartRef.current.width - deltaX
        if (potentialWidth >= MIN_SIZE.width && resizeStartRef.current.posX + deltaX >= 20) {
          newWidth = potentialWidth
          newX = resizeStartRef.current.posX + deltaX
        }
      }

      // Handle bottom edge resize
      if (resizeEdges.bottom) {
        const maxHeight = Math.min(window.innerHeight * 0.8, window.innerHeight - newY - 20)
        newHeight = Math.max(
          MIN_SIZE.height,
          Math.min(resizeStartRef.current.height + deltaY, maxHeight)
        )
      }

      // Handle top edge resize
      if (resizeEdges.top) {
        const potentialHeight = resizeStartRef.current.height - deltaY
        if (potentialHeight >= MIN_SIZE.height && resizeStartRef.current.posY + deltaY >= 20) {
          newHeight = potentialHeight
          newY = resizeStartRef.current.posY + deltaY
        }
      }

      setPanelState((prev) => ({
        ...prev,
        size: { width: newWidth, height: newHeight },
        position: { x: newX, y: newY },
      }))
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      setResizeEdges({ top: false, right: false, bottom: false, left: false })
      savePanelState({ position: panelState.position, size: panelState.size })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, resizeEdges])

  const currentSlide = slides[navigation.currentIndex]

  if (!open) return null

  return (
    <>
      {/* Invisible overlay during drag/resize to capture mouse events over iframes */}
      {(isDragging || isResizing) && (
        <div
          className="fixed inset-0 z-[49]"
          style={{ cursor: isDragging ? 'grabbing' : 'auto' }}
        />
      )}
      {/* Backdrop when maximized - blocks clicks to underlying content */}
      {isMaximized && (
        <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setIsMaximized(false)} />
      )}
      <div
        ref={panelRef}
        className={cn(
          'fixed z-50 flex flex-col border rounded-lg shadow-xl overflow-hidden',
          // Disable backdrop blur during drag/resize for performance
          isBlurEnabled && !isDragging && !isResizing
            ? 'bg-white/60 dark:bg-background/80 backdrop-blur-xl backdrop-saturate-150 border-white/40 dark:border-border shadow-2xl'
            : 'bg-background',
          isDragging && 'cursor-grabbing select-none',
          isResizing && 'select-none'
        )}
        style={{
          // Use transform for GPU-accelerated movement during drag/resize
          left: 0,
          top: 0,
          transform: `translate(${actualPosition.x}px, ${actualPosition.y}px)`,
          width: actualSize.width,
          height: actualSize.height,
          willChange: isDragging || isResizing ? 'transform' : 'auto',
          transition:
            isDragging || isResizing
              ? 'none'
              : 'width 0.2s ease-out, height 0.2s ease-out, transform 0.2s ease-out',
        }}
        tabIndex={0}
      >
        {/* Minimized View */}
        {isMinimized ? (
          <div
            className="flex items-center justify-between px-3 py-2 h-full cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={toggleMinimized}
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-xs text-muted-foreground shrink-0">
                {slides.length > 0 ? `${navigation.currentIndex + 1}/${slides.length}` : ''}
              </span>
              <span
                className="text-sm font-medium min-w-0 flex-1"
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {currentSlide?.title || 'Slides'}
              </span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 focus:ring-0 focus-visible:ring-0 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleMinimized()
                  }}
                >
                  <ChevronsUpDown className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Expand (pinch out)</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <>
            {/* Header */}
            <div
              className={cn(
                'flex items-center justify-between px-3 py-2 border-b bg-muted/30 transition-colors flex-nowrap',
                !isMaximized && !isMinimized && 'cursor-grab hover:bg-muted/50'
              )}
              onMouseDown={handleDragStart}
              onDoubleClick={() => setIsMaximized((prev) => !prev)}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <GripHorizontal className="size-4 text-muted-foreground shrink-0" />
                <span
                  className="text-sm font-medium min-w-0 flex-1"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {currentSlide?.title || 'Slides'}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-xs text-muted-foreground mr-2 whitespace-nowrap">
                  {slides.length > 0 ? `${navigation.currentIndex + 1} / ${slides.length}` : ''}
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className={cn(
                        'focus:ring-0 focus-visible:ring-0 focus:outline-none',
                        isBlurEnabled && 'text-primary'
                      )}
                      onClick={toggleBlur}
                    >
                      <Sparkles className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{isBlurEnabled ? 'Disable' : 'Enable'} glass effect</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="focus:ring-0 focus-visible:ring-0 focus:outline-none"
                      onClick={toggleMinimized}
                    >
                      <Minimize2 className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Minimize (pinch in)</p>
                  </TooltipContent>
                </Tooltip>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="focus:ring-0 focus-visible:ring-0 focus:outline-none"
                  onClick={() => setIsMaximized(!isMaximized)}
                  title={isMaximized ? 'Restore' : 'Maximize'}
                >
                  {isMaximized ? (
                    <Minimize2 className="size-4" />
                  ) : (
                    <Maximize2 className="size-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="focus:ring-0 focus-visible:ring-0 focus:outline-none"
                  onClick={onClose}
                  title="Close (Esc)"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>

            {/* Content with floating navigation */}
            <div className="flex-1 min-h-0 overflow-hidden relative">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="size-6 animate-spin text-muted-foreground" />
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full p-4 text-destructive">
                  {error}
                </div>
              ) : slides.length === 0 ? (
                <div className="flex items-center justify-center h-full p-4 text-muted-foreground">
                  No slides found in /slides/ directory
                </div>
              ) : (
                <ScrollArea className="h-full">
                  <div className="slide-content p-4 max-w-none @container">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: SlideLink,
                        img: SlideMedia,
                        code: SlideCodeBlock as Components['code'],
                        pre: SlidePreBlock as Components['pre'],
                      }}
                    >
                      {currentSlide?.content || ''}
                    </Markdown>
                  </div>
                </ScrollArea>
              )}
            </div>

            {/* Preview Strip */}
            {slides.length > 0 && (
              <div className="border-t bg-muted/20">
                <SlidePreviewStrip
                  slides={slides}
                  currentIndex={navigation.currentIndex}
                  onSelectSlide={navigation.goToSlide}
                  onPrevious={navigation.goPrevious}
                  onNext={navigation.goNext}
                  isFirst={navigation.isFirst}
                  isLast={navigation.isLast}
                />
              </div>
            )}

            {/* Resize handles - edges and corners */}
            {!isMaximized && (
              <>
                {/* Edge handles */}
                <div
                  className="absolute top-0 left-2 right-2 h-1 cursor-n-resize"
                  onMouseDown={(e) => handleResizeStart(e, { top: true })}
                />
                <div
                  className="absolute bottom-0 left-2 right-2 h-1 cursor-s-resize"
                  onMouseDown={(e) => handleResizeStart(e, { bottom: true })}
                />
                <div
                  className="absolute left-0 top-2 bottom-2 w-1 cursor-w-resize"
                  onMouseDown={(e) => handleResizeStart(e, { left: true })}
                />
                <div
                  className="absolute right-0 top-2 bottom-2 w-1 cursor-e-resize"
                  onMouseDown={(e) => handleResizeStart(e, { right: true })}
                />
                {/* Corner handles */}
                <div
                  className="absolute top-0 left-0 w-2 h-2 cursor-nw-resize"
                  onMouseDown={(e) => handleResizeStart(e, { top: true, left: true })}
                />
                <div
                  className="absolute top-0 right-0 w-2 h-2 cursor-ne-resize"
                  onMouseDown={(e) => handleResizeStart(e, { top: true, right: true })}
                />
                <div
                  className="absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize"
                  onMouseDown={(e) => handleResizeStart(e, { bottom: true, left: true })}
                />
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                  onMouseDown={(e) => handleResizeStart(e, { bottom: true, right: true })}
                >
                  <svg
                    className="absolute bottom-1 right-1 size-3 text-muted-foreground/50"
                    viewBox="0 0 10 10"
                  >
                    <path d="M9 1L1 9M9 5L5 9M9 9L9 9" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}
