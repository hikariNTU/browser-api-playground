// Broadcast Channel API - Cross-Tab Messaging
// Send and receive messages between browser tabs on the same origin

// Generate a unique tab ID for this session
const tabId = Math.random().toString(36).substring(2, 8).toUpperCase()
document.getElementById('tab-info').textContent = `This tab ID: ${tabId}`

// Create a broadcast channel - all tabs using the same channel name can communicate
const channel = new BroadcastChannel('playground-demo')

const messageInput = document.getElementById('message-input')
const sendBtn = document.getElementById('send-btn')
const messagesContainer = document.getElementById('messages')

// Track if we've received any messages
let hasReceivedMessages = false

function addMessage(text, sender, isOwn = false) {
  // Clear the placeholder if this is the first message
  if (!hasReceivedMessages) {
    messagesContainer.innerHTML = ''
    hasReceivedMessages = true
  }

  const msgEl = document.createElement('div')
  msgEl.style.cssText = `
    padding: 8px 12px;
    border-radius: 8px;
    max-width: 80%;
    ${
      isOwn
        ? 'background: #3b82f6; color: white; align-self: flex-end;'
        : 'background: #334155; color: #e2e8f0; align-self: flex-start;'
    }
  `

  const senderEl = document.createElement('div')
  senderEl.style.cssText = 'font-size: 10px; opacity: 0.7; margin-bottom: 4px;'
  senderEl.textContent = isOwn ? 'You' : `Tab ${sender}`

  const textEl = document.createElement('div')
  textEl.textContent = text

  msgEl.appendChild(senderEl)
  msgEl.appendChild(textEl)
  messagesContainer.appendChild(msgEl)

  // Auto-scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

function sendMessage() {
  const text = messageInput.value.trim()
  if (!text) return

  // Send message to all other tabs
  channel.postMessage({
    sender: tabId,
    text: text,
    timestamp: Date.now(),
  })

  // Show in our own UI
  addMessage(text, tabId, true)
  console.log(`📤 Sent: "${text}"`)

  // Clear input
  messageInput.value = ''
}

// Listen for messages from other tabs
channel.onmessage = (event) => {
  const { sender, text, timestamp } = event.data
  addMessage(text, sender, false)
  console.log(`📩 Received from Tab ${sender}: "${text}"`)
}

// Send on button click
sendBtn.onclick = sendMessage

// Send on Enter key
messageInput.onkeydown = (e) => {
  if (e.key === 'Enter') {
    sendMessage()
  }
}

// Announce when tab joins
channel.postMessage({
  sender: tabId,
  text: '👋 joined the channel',
  timestamp: Date.now(),
})

console.log('📺 Broadcast Channel connected!')
console.log(`🆔 Your tab ID: ${tabId}`)
console.log('💡 Open this page in another tab to chat!')

// Clean up when page closes
window.addEventListener('beforeunload', () => {
  channel.postMessage({
    sender: tabId,
    text: '👋 left the channel',
    timestamp: Date.now(),
  })
  channel.close()
})
