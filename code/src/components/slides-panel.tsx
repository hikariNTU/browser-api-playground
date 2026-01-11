import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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
  GripHorizontal,
  Loader2,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import './slides-panel.css'

const STORAGE_KEY = 'slides-panel-state'
const DEFAULT_POSITION = { x: -1, y: -1 } // -1 means use default (bottom-right)
const DEFAULT_SIZE = { width: 500, height: 400 }
const MIN_SIZE = { width: 350, height: 280 }

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
            className="shrink-0"
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
                <div className="sticky left-0 z-10 w-0 h-0">
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
            className="shrink-0"
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
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
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
          <div className="slide-content text-xs leading-relaxed [&_h1]:text-sm [&_h2]:text-xs [&_p]:text-xs">
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

// Custom image/video component
function SlideMedia({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const isVideo = src && /\.(mp4|webm|ogg)$/i.test(src)

  if (isVideo) {
    return (
      <video
        src={src}
        controls
        className="max-w-full h-auto rounded-md my-2"
        {...(props as React.VideoHTMLAttributes<HTMLVideoElement>)}
      />
    )
  }

  return <img src={src} alt={alt || ''} className="max-w-full h-auto rounded-md my-2" {...props} />
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
  const [isMaximized, setIsMaximized] = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const resizeStartRef = useRef({ width: 0, height: 0, x: 0, y: 0 })

  // Compute actual position (default to bottom-right if -1)
  const actualPosition = useMemo(() => {
    if (isMaximized) {
      return { x: 20, y: 20 }
    }
    const { x, y } = panelState.position
    if (x === -1 || y === -1) {
      return {
        x: window.innerWidth - panelState.size.width - 20,
        y: window.innerHeight - panelState.size.height - 20,
      }
    }
    return { x, y }
  }, [panelState.position, panelState.size, isMaximized])

  const actualSize = isMaximized
    ? { width: window.innerWidth - 40, height: window.innerHeight - 40 }
    : panelState.size

  // Save panel state when it changes
  useEffect(() => {
    if (!isMaximized) {
      savePanelState(panelState)
    }
  }, [panelState, isMaximized])

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if we're in an input element
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
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
  }, [open, navigation, onClose])

  // Drag handlers
  const handleDragStart = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return
      e.preventDefault()
      setIsDragging(true)
      dragStartRef.current = {
        x: e.clientX - actualPosition.x,
        y: e.clientY - actualPosition.y,
      }
    },
    [actualPosition, isMaximized]
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
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, panelState.size])

  // Resize handlers
  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      if (isMaximized) return
      e.preventDefault()
      e.stopPropagation()
      setIsResizing(true)
      resizeStartRef.current = {
        width: panelState.size.width,
        height: panelState.size.height,
        x: e.clientX,
        y: e.clientY,
      }
    },
    [panelState.size, isMaximized]
  )

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStartRef.current.x
      const deltaY = e.clientY - resizeStartRef.current.y

      const maxWidth = Math.min(window.innerWidth * 0.8, window.innerWidth - actualPosition.x - 20)
      const maxHeight = Math.min(
        window.innerHeight * 0.8,
        window.innerHeight - actualPosition.y - 20
      )

      const newWidth = Math.max(
        MIN_SIZE.width,
        Math.min(resizeStartRef.current.width + deltaX, maxWidth)
      )
      const newHeight = Math.max(
        MIN_SIZE.height,
        Math.min(resizeStartRef.current.height + deltaY, maxHeight)
      )

      setPanelState((prev) => ({
        ...prev,
        size: { width: newWidth, height: newHeight },
      }))
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, actualPosition])

  const currentSlide = slides[navigation.currentIndex]

  if (!open) return null

  return (
    <div
      ref={panelRef}
      className={cn(
        'fixed z-50 flex flex-col bg-background border rounded-lg shadow-xl overflow-hidden',
        isDragging && 'cursor-grabbing select-none',
        isResizing && 'select-none'
      )}
      style={{
        left: actualPosition.x,
        top: actualPosition.y,
        width: actualSize.width,
        height: actualSize.height,
      }}
      tabIndex={0}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between px-3 py-2 border-b bg-muted/30 transition-colors',
          !isMaximized && 'cursor-grab hover:bg-muted/50'
        )}
        onMouseDown={handleDragStart}
        onDoubleClick={() => setIsMaximized((prev) => !prev)}
      >
        <div className="flex items-center gap-2">
          <GripHorizontal className="size-4 text-muted-foreground" />
          <span className="text-sm font-medium truncate max-w-[200px]">
            {currentSlide?.title || 'Slides'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-muted-foreground mr-2">
            {slides.length > 0 ? `${navigation.currentIndex + 1} / ${slides.length}` : ''}
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsMaximized(!isMaximized)}
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={onClose} title="Close (Esc)">
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

      {/* Resize handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={handleResizeStart}
        >
          <svg
            className="absolute bottom-1 right-1 size-3 text-muted-foreground/50"
            viewBox="0 0 10 10"
          >
            <path d="M9 1L1 9M9 5L5 9M9 9L9 9" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}
    </div>
  )
}
