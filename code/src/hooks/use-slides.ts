import { useState, useEffect, useCallback } from 'react'

export interface Slide {
  id: string
  title: string
  content: string
  fileSource: string
  index: number
}

interface SlidesState {
  slides: Slide[]
  isLoading: boolean
  error: string | null
}

// Lazy load slide files only when needed
// Path is relative to the project root (where vite.config.ts is)
const slideModules = import.meta.glob('/slides/*.md', {
  query: '?raw',
  import: 'default',
})

function extractTitle(content: string): string {
  // Extract first # heading as title
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : 'Untitled Slide'
}

function parseSlideFile(filename: string, content: string, startIndex: number): Slide[] {
  // Split on --- (horizontal rule) to get individual slides
  const parts = content.split(/\n---\n/).filter((part) => part.trim())

  return parts.map((part, idx) => ({
    id: `${filename}-${idx}`,
    title: extractTitle(part),
    content: part.trim(),
    fileSource: filename,
    index: startIndex + idx,
  }))
}

export function useSlides() {
  const [state, setState] = useState<SlidesState>({
    slides: [],
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    async function loadSlides() {
      try {
        const paths = Object.keys(slideModules).sort()
        const allSlides: Slide[] = []

        for (const path of paths) {
          const filename = path.split('/').pop() || path
          const content = (await slideModules[path]()) as string
          const slides = parseSlideFile(filename, content, allSlides.length)
          allSlides.push(...slides)
        }

        // Re-index after all slides loaded
        allSlides.forEach((slide, idx) => {
          slide.index = idx
        })

        setState({
          slides: allSlides,
          isLoading: false,
          error: null,
        })
      } catch (err) {
        setState({
          slides: [],
          isLoading: false,
          error: err instanceof Error ? err.message : 'Failed to load slides',
        })
      }
    }

    loadSlides()
  }, [])

  return state
}

// Hook for managing slide navigation state
export function useSlideNavigation(totalSlides: number) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalSlides) {
        setCurrentIndex(index)
      }
    },
    [totalSlides]
  )

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1))
  }, [totalSlides])

  const goPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const goFirst = useCallback(() => {
    setCurrentIndex(0)
  }, [])

  const goLast = useCallback(() => {
    setCurrentIndex(totalSlides - 1)
  }, [totalSlides])

  return {
    currentIndex,
    goToSlide,
    goNext,
    goPrevious,
    goFirst,
    goLast,
    isFirst: currentIndex === 0,
    isLast: currentIndex === totalSlides - 1,
  }
}
