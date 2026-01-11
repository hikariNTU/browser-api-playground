import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  sender: string
  text: string
  isOwn: boolean
}

export function BroadcastChannelPreview() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [tabId] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase())
  const channelRef = useRef<BroadcastChannel | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const isSupported = 'BroadcastChannel' in window

  useEffect(() => {
    if (!isSupported) return

    // Create channel
    const channel = new BroadcastChannel('playground-demo-preview')
    channelRef.current = channel

    // Listen for messages
    channel.onmessage = (event) => {
      const { sender, text } = event.data
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${Math.random()}`,
          sender,
          text,
          isOwn: false,
        },
      ])
    }

    // Announce join
    channel.postMessage({
      sender: tabId,
      text: '👋 joined the channel',
    })

    // Cleanup
    return () => {
      channel.postMessage({
        sender: tabId,
        text: '👋 left the channel',
      })
      channel.close()
    }
  }, [isSupported, tabId])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!inputValue.trim() || !channelRef.current) return

    const text = inputValue.trim()

    // Send to other tabs
    channelRef.current.postMessage({
      sender: tabId,
      text,
    })

    // Add to own messages
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        sender: tabId,
        text,
        isOwn: true,
      },
    ])

    setInputValue('')
  }

  if (!isSupported) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Broadcast Channel API is not supported in this browser.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Status */}
      <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-sm text-muted-foreground">
          Connected to channel: <strong className="text-foreground">playground-demo-preview</strong>
        </span>
      </div>

      {/* Messages */}
      <div className="h-40 overflow-y-auto p-3 bg-background border rounded-lg space-y-2">
        {messages.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-4">
            Open this page in another tab to see messages!
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'max-w-[80%] px-3 py-2 rounded-lg text-sm',
                msg.isOwn ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted'
              )}
            >
              <div className="text-[10px] opacity-70 mb-1">
                {msg.isOwn ? 'You' : `Tab ${msg.sender}`}
              </div>
              <div>{msg.text}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && sendMessage()
          }
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 text-sm bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <Button onClick={sendMessage} disabled={!inputValue.trim()}>
          Send
        </Button>
      </div>

      {/* Tab ID */}
      <p className="text-center text-xs text-muted-foreground">Your tab ID: {tabId}</p>
    </div>
  )
}
