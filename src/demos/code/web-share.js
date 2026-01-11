// Web Share API - Native sharing
// Click the Share button to open your device's share dialog

const shareBtn = document.getElementById('share-btn')
const status = document.getElementById('status')

shareBtn.onclick = async () => {
  const shareData = {
    title: 'Browser API Playground',
    text: 'Check out these cool browser APIs!',
    url: window.location.href,
  }

  try {
    await navigator.share(shareData)
    console.log('Content shared successfully!')
    status.textContent = '✅ Shared successfully!'
    status.style.color = '#22c55e'
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
  console.log('Click the Share button above!')
} else {
  console.log('Web Share API is not supported in this browser')
  shareBtn.disabled = true
  shareBtn.style.opacity = '0.5'
  status.textContent = '⚠️ Web Share not supported in this browser'
}

