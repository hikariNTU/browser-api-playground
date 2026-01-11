// Fullscreen on a specific screen (secondary display if available)
// ⚠️ Requires user gesture (button click) to request permission

async function goFullscreenOnSecondary() {
  try {
    const screenDetails = await window.getScreenDetails()
    const screens = screenDetails.screens

    if (screens.length > 1) {
      // Get the non-primary screen
      const secondaryScreen = screens.find((s) => !s.isPrimary)

      console.log(`Opening fullscreen on: ${secondaryScreen.label || 'Secondary Screen'}`)

      await document.documentElement.requestFullscreen({
        screen: secondaryScreen,
      })
    } else {
      console.log('Only one screen detected - going fullscreen on primary')
      await document.documentElement.requestFullscreen()
    }
  } catch (e) {
    console.error('Error:', e.message)
  }
}

document.getElementById('fullscreen-btn').addEventListener('click', goFullscreenOnSecondary)

console.log('👆 Click the button to go fullscreen on secondary display')
console.log('Press ESC to exit fullscreen')
