// Toggle wake lock with button
let wakeLock = null
const toggleBtn = document.getElementById('toggle-btn')
const status = document.getElementById('status')

async function toggleWakeLock() {
  if (wakeLock) {
    await wakeLock.release()
    wakeLock = null
    toggleBtn.textContent = '🔓 Acquire Wake Lock'
    status.textContent = 'Status: Released'
    console.log('🔓 Released')
  } else {
    wakeLock = await navigator.wakeLock.request('screen')
    toggleBtn.textContent = '🔒 Release Wake Lock'
    status.textContent = 'Status: Locked'
    console.log('🔒 Acquired')

    wakeLock.addEventListener('release', () => {
      wakeLock = null
      toggleBtn.textContent = '🔓 Acquire Wake Lock'
      status.textContent = 'Status: Released (external)'
      console.log('Released externally')
    })
  }
}

toggleBtn.onclick = toggleWakeLock
console.log('Click the button to toggle wake lock')
