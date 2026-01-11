import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function FileSystemAccessPreview() {
  const [fileInfo, setFileInfo] = useState<{ name: string; size: number; type: string } | null>(
    null
  )
  const [content, setContent] = useState<string | null>(null)
  const isSupported = 'showOpenFilePicker' in window

  const handleOpenFile = async () => {
    if (!isSupported) return

    try {
      // @ts-expect-error - showOpenFilePicker is not in TypeScript yet
      const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: 'Text files',
            accept: { 'text/*': ['.txt', '.md', '.json', '.js', '.ts', '.html', '.css'] },
          },
        ],
      })

      const file = await fileHandle.getFile()
      setFileInfo({
        name: file.name,
        size: file.size,
        type: file.type || 'unknown',
      })

      // Read first 500 chars
      const text = await file.text()
      setContent(text.slice(0, 500) + (text.length > 500 ? '...' : ''))
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Failed to open file:', error)
      }
    }
  }

  if (!isSupported) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>File System Access API is not supported in this browser.</p>
        <p className="text-sm mt-1">Try Chrome or Edge.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Button onClick={handleOpenFile}>📂 Open a Text File</Button>

      {fileInfo && (
        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <div>
              <div className="font-medium">{fileInfo.name}</div>
              <div className="text-xs text-muted-foreground">
                {fileInfo.type} • {(fileInfo.size / 1024).toFixed(2)} KB
              </div>
            </div>
          </div>

          {content && (
            <pre className="mt-3 p-3 bg-background rounded text-xs overflow-auto max-h-32 border">
              {content}
            </pre>
          )}
        </div>
      )}

      {!fileInfo && (
        <p className="text-sm text-muted-foreground">
          Click to open a text file and view its contents.
        </p>
      )}
    </div>
  )
}
