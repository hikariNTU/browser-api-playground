let wakeLock = null

async function acquireWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen')
    console.log('Wake lock acquired')
  } catch (e) {
    console.log('Failed to acquire:', e.message)
  }
}

// Re-acquire when page becomes visible again
document.addEventListener('visibilitychange', async () => {
  if (document.visibilityState === 'visible' && !wakeLock) {
    await acquireWakeLock()
  }
})

acquireWakeLock()
