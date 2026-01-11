// Screen Wake Lock API - Keep the screen awake
// Useful for presentations, videos, or long-running tasks

let wakeLock = null

// Create toggle button
const button = document.createElement('button')
button.style.cssText = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
`

const statusDiv = document.createElement('div')
statusDiv.style.cssText = 'margin-top: 16px; padding: 16px; border-radius: 8px;'

function updateUI(isLocked) {
  if (isLocked) {
    button.textContent = '🔓 Release Wake Lock'
    button.style.background = '#ef4444'
    statusDiv.innerHTML =
      '🔒 <strong>Wake Lock Active</strong><br><small>Screen will stay on</small>'
    statusDiv.style.background = '#10b98120'
    statusDiv.style.border = '1px solid #10b981'
    statusDiv.style.color = '#10b981'
  } else {
    button.textContent = '🔒 Acquire Wake Lock'
    button.style.background = '#6366f1'
    statusDiv.innerHTML =
      '💤 <strong>Wake Lock Inactive</strong><br><small>Screen may dim normally</small>'
    statusDiv.style.background = '#64748b20'
    statusDiv.style.border = '1px solid #64748b'
    statusDiv.style.color = '#64748b'
  }
}

async function toggleWakeLock() {
  if (wakeLock) {
    await wakeLock.release()
    wakeLock = null
    console.log('🔓 Wake lock released - screen can now dim')
    updateUI(false)
  } else {
    try {
      wakeLock = await navigator.wakeLock.request('screen')
      console.log('✅ Wake lock is active!')
      updateUI(true)

      // Listen for release (happens when tab becomes hidden)
      wakeLock.addEventListener('release', () => {
        console.log('⚠️ Wake lock was released (tab hidden?)')
        wakeLock = null
        updateUI(false)
      })
    } catch (err) {
      console.error('Wake lock request failed:', err.message)
    }
  }
}

button.onclick = toggleWakeLock
updateUI(false)

document.body.appendChild(button)
document.body.appendChild(statusDiv)
console.log('Click the button to toggle wake lock!')
