import type { ComponentType, ReactNode } from 'react'

export interface ApiDemo {
  id: string
  name: string
  description: string
  mdnUrl: string
  defaultCode: string
  defaultHtml?: string
  checkSupport: () => boolean
  /** Code snippet showing how to check support, e.g., "'EyeDropper' in window" */
  supportCheck?: string
  /** MDN compat data path for browser support lookup, e.g., "api.EyeDropper" */
  compatKey?: string
  examples?: DemoExample[]
  referenceContent?: ReactNode
  /** Optional React component for interactive preview on intro page */
  PreviewComponent?: ComponentType
}

export interface DemoExample {
  /** URL-safe slug for the example, e.g., "node-editor" */
  id: string
  title: string
  description: string
  code: string
  html?: string
}

export interface ExecutionResult {
  success: boolean
  output: ConsoleMessage[]
  error?: string
  timestamp: number
}

export interface ConsoleMessage {
  type: 'log' | 'warn' | 'error' | 'info'
  args: unknown[]
  timestamp: number
}
