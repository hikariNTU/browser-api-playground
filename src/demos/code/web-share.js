// Web Share API - Native sharing
// Click the Share button to open your device's share dialog

// Create share button (requires user gesture)
const button = document.createElement('button')
button.textContent = '📤 Share This Page'
button.style.cssText = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
`
button.onmouseover = () => (button.style.background = '#059669')
button.onmouseout = () => (button.style.background = '#10b981')

const status = document.createElement('p')
status.style.cssText = 'margin-top: 12px; color: #666;'

button.onclick = async () => {
  const shareData = {
    title: 'Browser API Playground',
    text: 'Check out these cool browser APIs!',
    url: window.location.href,
  }

  try {
    await navigator.share(shareData)
    console.log('Content shared successfully!')
    status.textContent = '✅ Shared successfully!'
    status.style.color = '#10b981'
  } catch (e) {
    if (e.name === 'AbortError') {
      console.log('Share cancelled by user')
      status.textContent = '❌ Share cancelled'
      status.style.color = '#f59e0b'
    } else {
      console.error('Share failed:', e.message)
      status.textContent = '❌ Share failed: ' + e.message
      status.style.color = '#ef4444'
    }
  }
}

// Check if sharing is supported
if (navigator.share) {
  console.log('Web Share API is supported!')
  document.body.appendChild(button)
  document.body.appendChild(status)
  console.log('Click the Share button above!')
} else {
  console.log('Web Share API is not supported in this browser')
  status.textContent = '⚠️ Web Share not supported'
  document.body.appendChild(status)
}
