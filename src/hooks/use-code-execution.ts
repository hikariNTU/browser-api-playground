import { useCallback, useRef, useState } from 'react'
import type { ConsoleMessage } from '@/demos'

export interface ExecutionState {
  isRunning: boolean
  messages: ConsoleMessage[]
  error: string | null
}

export function useCodeExecution(outputContainerRef: React.RefObject<HTMLDivElement | null>) {
  const [state, setState] = useState<ExecutionState>({
    isRunning: false,
    messages: [],
    error: null,
  })

  const iframeRef = useRef<HTMLIFrameElement | null>(null)

  const execute = useCallback(
    async (code: string, html?: string) => {
      setState({ isRunning: true, messages: [], error: null })

      // Remove existing iframe
      if (iframeRef.current) {
        iframeRef.current.remove()
        iframeRef.current = null
      }

      // Clear output container
      if (outputContainerRef.current) {
        outputContainerRef.current.innerHTML = ''
      }

      // Create visible iframe for user gesture APIs
      const iframe = document.createElement('iframe')
      iframe.style.cssText =
        'width: 100%; height: 100%; border: 0; background: white; border-radius: 8px;'
      iframe.sandbox.add('allow-scripts', 'allow-same-origin', 'allow-modals', 'allow-popups')

      if (outputContainerRef.current) {
        outputContainerRef.current.appendChild(iframe)
      } else {
        // Fallback to hidden iframe
        iframe.style.cssText =
          'position: absolute; width: 0; height: 0; border: 0; visibility: hidden;'
        document.body.appendChild(iframe)
      }
      iframeRef.current = iframe

      const messages: ConsoleMessage[] = []

      // Wait for iframe to load
      await new Promise((resolve) => setTimeout(resolve, 50))

      // Create the execution context
      const iframeDoc = iframe.contentDocument!
      const iframeWin = iframe.contentWindow as Window & typeof globalThis

      // Add base styles to iframe
      const styleEl = iframeDoc.createElement('style')
      styleEl.textContent = `
      * { box-sizing: border-box; }
      body { 
        font-family: system-ui, -apple-system, sans-serif; 
        padding: 16px; 
        margin: 0;
        color: #1a1a1a;
        line-height: 1.5;
      }
      button {
        padding: 8px 16px;
        border-radius: 6px;
        border: 1px solid #e5e7eb;
        background: #f9fafb;
        cursor: pointer;
        font-size: 14px;
      }
      button:hover { background: #f3f4f6; }
      button:active { background: #e5e7eb; }
    `
      iframeDoc.head.appendChild(styleEl)

      // Override console methods
      const originalConsole = iframeWin.console
      const proxyConsole = {
        log: (...args: unknown[]) => {
          messages.push({ type: 'log', args, timestamp: Date.now() })
          setState((s) => ({ ...s, messages: [...messages] }))
          originalConsole.log(...args)
        },
        warn: (...args: unknown[]) => {
          messages.push({ type: 'warn', args, timestamp: Date.now() })
          setState((s) => ({ ...s, messages: [...messages] }))
          originalConsole.warn(...args)
        },
        error: (...args: unknown[]) => {
          messages.push({ type: 'error', args, timestamp: Date.now() })
          setState((s) => ({ ...s, messages: [...messages] }))
          originalConsole.error(...args)
        },
        info: (...args: unknown[]) => {
          messages.push({ type: 'info', args, timestamp: Date.now() })
          setState((s) => ({ ...s, messages: [...messages] }))
          originalConsole.info(...args)
        },
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(iframeWin as any).console = proxyConsole

      try {
        // Wrap code in async IIFE to support top-level await
        const wrappedCode = `
        (async () => {
          try {
            ${code}
          } catch (e) {
            console.error('Error:', e.message || e);
          }
        })();
      `

        // Execute code
        // Inject HTML content if provided
        if (html) {
          iframeDoc.body.innerHTML = html
        }

        const scriptEl = iframeDoc.createElement('script')
        scriptEl.textContent = wrappedCode
        iframeDoc.body.appendChild(scriptEl)

        // Wait a bit for async operations
        await new Promise((resolve) => setTimeout(resolve, 100))

        setState((s) => ({ ...s, isRunning: false }))
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        setState((s) => ({
          ...s,
          isRunning: false,
          error: errorMessage,
        }))
      }
    },
    [outputContainerRef]
  )

  const clearConsole = useCallback(() => {
    setState({ isRunning: false, messages: [], error: null })
  }, [])

  const clear = useCallback(() => {
    setState({ isRunning: false, messages: [], error: null })
    if (iframeRef.current) {
      iframeRef.current.remove()
      iframeRef.current = null
    }
    if (outputContainerRef.current) {
      outputContainerRef.current.innerHTML = ''
    }
  }, [outputContainerRef])

  return { ...state, execute, clear, clearConsole }
}
