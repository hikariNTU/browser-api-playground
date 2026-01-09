import { useCallback, useEffect, useRef, useState } from 'react'
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels'
import Editor, { type Monaco } from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  Trash2,
  Circle,
  AlignLeft,
  HelpCircle,
  Monitor,
  Terminal,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { experimentalBrowserAPITypes } from '@/lib/browser-api-types'
import type { ApiDemo, DemoExample, ConsoleMessage } from '@/demos'
import { useCodeExecution } from '@/hooks/use-code-execution'

interface ApiPlaygroundProps {
  demo: ApiDemo
  example: DemoExample
}

const STORAGE_KEY_PREFIX = 'browser-api-playground-code-'

function getStorageKey(demoId: string, exampleId: string): string {
  return `${STORAGE_KEY_PREFIX}${demoId}-${exampleId}`
}

function getStoredCode(demoId: string, exampleId: string): string | null {
  return localStorage.getItem(getStorageKey(demoId, exampleId))
}

function setStoredCode(demoId: string, exampleId: string, code: string) {
  localStorage.setItem(getStorageKey(demoId, exampleId), code)
}

function clearStoredCode(demoId: string, exampleId: string) {
  localStorage.removeItem(getStorageKey(demoId, exampleId))
}

export function ApiPlayground({ demo, example }: ApiPlaygroundProps) {
  // Use lazy initializer to load stored code on mount
  const [code, setCode] = useState(() => {
    const stored = getStoredCode(demo.id, example.id)
    return stored || example.code
  })
  const [currentHtml, setCurrentHtml] = useState<string | undefined>(example.html)
  const [copied, setCopied] = useState(false)
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark')
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const outputContainerRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { isRunning, messages, error, execute, clear, clearConsole } =
    useCodeExecution(outputContainerRef)
  const isSupported = demo.checkSupport()
  const isModified = code !== example.code

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, error])

  // Sync theme with document
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      setTheme(isDark ? 'vs-dark' : 'light')
    }
    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  // Persist code changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (code && code !== example.code) {
        setStoredCode(demo.id, example.id, code)
      }
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [code, demo.id, example.id, example.code])

  const handleRun = useCallback(() => {
    execute(code, currentHtml)
  }, [code, currentHtml, execute])

  const handleReset = useCallback(() => {
    setCode(example.code)
    setCurrentHtml(example.html)
    clearStoredCode(demo.id, example.id)
    clear()
  }, [example.code, example.html, demo.id, example.id, clear])

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [code])

  const handleFormat = useCallback(async () => {
    if (editorRef.current) {
      // Use Monaco's built-in format action
      editorRef.current.getAction('editor.action.formatDocument')?.run()
    }
  }, [])

  // Auto-run code on first mount (when user switches tabs)
  useEffect(() => {
    if (isSupported) {
      execute(code, currentHtml)
    }
    // Only run on mount - component remounts when demo changes due to key={demo.id}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Store handleRun in a ref so Monaco commands can access the latest version
  const handleRunRef = useRef(handleRun)
  handleRunRef.current = handleRun

  // Keyboard shortcuts (for when editor is not focused)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        handleRun()
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'f') {
        e.preventDefault()
        handleFormat()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        // Code is auto-saved, just show feedback
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleRun, handleFormat])

  const handleEditorMount = (editor: editor.IStandaloneCodeEditor, monacoInstance: Monaco) => {
    editorRef.current = editor

    // Add experimental browser API type definitions to suppress type errors
    monacoInstance.languages.typescript.javascriptDefaults.addExtraLib(
      experimentalBrowserAPITypes,
      'experimental-browser-apis.d.ts'
    )

    // Add Cmd+Enter to run code (works when editor is focused)
    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter, () => {
      handleRunRef.current()
    })

    // Add Cmd+Shift+P for Monaco command palette
    editor.addCommand(
      monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyMod.Shift | monacoInstance.KeyCode.KeyP,
      () => {
        editor.trigger('keyboard', 'editor.action.quickCommand', null)
      }
    )
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="h-full min-h-0 flex flex-col overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-border/50 px-6 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight">{demo.name}</h1>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Badge
                        variant={isSupported ? 'default' : 'secondary'}
                        className={cn(
                          'cursor-help',
                          isSupported
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        )}
                      >
                        {isSupported ? 'Supported' : 'Not Supported'}
                      </Badge>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="max-w-xs">
                    <p className="text-xs mb-1">Check availability:</p>
                    <code className="text-xs font-mono bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded">
                      {demo.supportCheck || `'${demo.name.replace(' API', '')}' in window`}
                    </code>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-muted-foreground">{demo.description}</p>
            </div>

            <a
              href={demo.mdnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              MDN Docs
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </header>

        {/* Main Content */}
        <PanelGroup orientation="horizontal" className="flex-1">
          {/* Editor Panel */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col">
              {/* Editor Toolbar */}
              <ScrollArea className="border-b border-border/50 bg-muted/30">
                <div className="flex items-center justify-between gap-4 px-4 py-2">
                  <div className="flex items-center gap-2 shrink-0">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          onClick={handleRun}
                          disabled={isRunning || !isSupported}
                          className="gap-1.5"
                        >
                          {isRunning ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Play className="h-3.5 w-3.5" />
                          )}
                          Run
                          <kbd className="ml-1 text-[10px] opacity-60">⌘↵</kbd>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Execute the code (⌘+Enter)</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleReset}
                          className="gap-1.5"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          Reset
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Reset to default code</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Modified indicator - dot only, after Reset button */}
                    {isModified && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center">
                            <Circle className="h-2 w-2 fill-amber-500 text-amber-500" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Code modified from default. Click Reset to restore.</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={handleFormat}
                          className="h-8 w-8"
                        >
                          <AlignLeft className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Format code <kbd className="ml-1 text-[10px] opacity-60">⌘⇧F</kbd>
                        </p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={handleCopy}
                          className="h-8 w-8"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copied ? 'Copied!' : 'Copy code'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              {/* Monaco Editor */}
              <div className="flex-1">
                <Editor
                  height="100%"
                  language="javascript"
                  theme={theme}
                  value={code}
                  onChange={(value) => setCode(value || '')}
                  onMount={handleEditorMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    tabSize: 2,
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                    renderWhitespace: 'all',
                    fixedOverflowWidgets: true,
                  }}
                />
              </div>
            </div>
          </Panel>

          {/* Resize Handle */}
          <PanelResizeHandle className="w-1 bg-border/50 hover:bg-border transition-colors" />

          {/* Output Panel */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup orientation="vertical">
              {/* Visual Output Area */}
              <Panel defaultSize={40} minSize={20}>
                <div className="h-full flex flex-col bg-background">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-muted/30">
                    <div className="flex items-center gap-1.5">
                      <Monitor className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Output</span>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Click buttons in this area for user gesture APIs</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div ref={outputContainerRef} className="flex-1 p-4 overflow-auto" />
                </div>
              </Panel>

              <PanelResizeHandle className="h-1 bg-border/50 hover:bg-border transition-colors" />

              {/* Console Panel */}
              <Panel defaultSize={60} minSize={20}>
                <div className="h-full flex flex-col bg-muted/20">
                  {/* Output Header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Console</span>
                      {isRunning && (
                        <Badge variant="secondary" className="gap-1">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Running
                        </Badge>
                      )}
                    </div>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={clearConsole}
                          className="gap-1.5 h-7"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Clear
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Clear console output</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Console Output */}
                  <div className="flex-1 min-h-0">
                    <ScrollArea className="h-full">
                      <div className="space-y-1 font-mono text-sm p-4">
                        {messages.length === 0 && !error && (
                          <p className="text-muted-foreground">Click Run to execute the code...</p>
                        )}

                        {messages.map((msg, idx) => (
                          <ConsoleMessageLine key={idx} message={msg} />
                        ))}

                        {error && (
                          <div className="text-red-500 dark:text-red-400">Error: {error}</div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </TooltipProvider>
  )
}

function ConsoleMessageLine({ message }: { message: ConsoleMessage }) {
  const colorClass = {
    log: 'text-foreground',
    info: 'text-blue-500 dark:text-blue-400',
    warn: 'text-amber-500 dark:text-amber-400',
    error: 'text-red-500 dark:text-red-400',
  }[message.type]

  const formatArg = (arg: unknown): string => {
    if (typeof arg === 'object') {
      try {
        return JSON.stringify(arg, null, 2)
      } catch {
        return String(arg)
      }
    }
    return String(arg)
  }

  return (
    <div className={cn('py-0.5', colorClass)}>
      <span className="text-muted-foreground text-xs mr-2">
        {new Date(message.timestamp).toLocaleTimeString()}
      </span>
      {message.args.map((arg, idx) => (
        <span key={idx}>
          {idx > 0 && ' '}
          {formatArg(arg)}
        </span>
      ))}
    </div>
  )
}
