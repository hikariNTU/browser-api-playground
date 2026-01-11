// List all connected screens with basic info
// ⚠️ Requires user gesture (button click) to request permission

async function listScreens() {
  try {
    const screenDetails = await window.getScreenDetails()

    console.log('📺 Connected Screens:')
    screenDetails.screens.forEach((screen, i) => {
      console.log(`Screen ${i + 1}: ${screen.width}x${screen.height}`)
      console.log(`  Primary: ${screen.isPrimary}`)
      console.log(`  Label: ${screen.label || 'Unknown'}`)
    })
  } catch (e) {
    console.error('Error:', e.message)
  }
}

document.getElementById('list-screens-btn').addEventListener('click', listScreens)

console.log('👆 Click the button to list all connected screens')
