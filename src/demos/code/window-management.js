// Window Management API - Multi-screen support
// Query connected screens and manage window placement
// ⚠️ Requires user gesture (button click) to request permission

async function getScreenInfo() {
  try {
    // Request permission to access screen details
    const screenDetails = await window.getScreenDetails()

    console.log('📺 Screen Information:')
    console.log('Number of screens:', screenDetails.screens.length)
    console.log('')

    screenDetails.screens.forEach((screen, index) => {
      console.log(`Screen ${index + 1}:`)
      console.log(`  Label: ${screen.label || 'Unknown'}`)
      console.log(`  Size: ${screen.width} x ${screen.height}`)
      console.log(`  Position: (${screen.left}, ${screen.top})`)
      console.log(`  Device Pixel Ratio: ${screen.devicePixelRatio}`)
      console.log(`  Primary: ${screen.isPrimary}`)
      console.log(`  Internal: ${screen.isInternal}`)
      console.log('')
    })

    // Calculate bounding box of all screens
    const screens = screenDetails.screens
    const minX = Math.min(...screens.map((s) => s.left))
    const minY = Math.min(...screens.map((s) => s.top))
    const maxX = Math.max(...screens.map((s) => s.left + s.width))
    const maxY = Math.max(...screens.map((s) => s.top + s.height))
    const totalWidth = maxX - minX
    const totalHeight = maxY - minY

    // Find current screen (where the window is located)
    const currentScreen = screenDetails.currentScreen

    // Container setup
    const container = document.getElementById('screen-display')
    const maxContainerWidth = 400
    const maxContainerHeight = 300

    // Compute scale to fit within container
    const scaleX = maxContainerWidth / totalWidth
    const scaleY = maxContainerHeight / totalHeight
    const scale = Math.min(scaleX, scaleY, 0.15) // Cap at 0.15 for very large setups

    const containerWidth = totalWidth * scale
    const containerHeight = totalHeight * scale

    container.innerHTML = ''
    container.style.cssText = `
      position: relative;
      width: ${containerWidth}px;
      height: ${containerHeight}px;
      background: #1e293b;
      border-radius: 12px;
      padding: 0;
      margin: 16px 0;
    `

    // Add origin marker
    const origin = document.createElement('div')
    origin.style.cssText = `
      position: absolute;
      left: ${(0 - minX) * scale - 2}px;
      top: ${(0 - minY) * scale - 2}px;
      width: 6px;
      height: 6px;
      background: #f59e0b;
      border-radius: 50%;
      z-index: 10;
    `
    origin.title = 'Origin (0, 0)'
    container.appendChild(origin)

    // Render each screen at its actual position
    screens.forEach((screen, index) => {
      const isCurrent = currentScreen && screen.label === currentScreen.label
      const card = document.createElement('div')

      // Translate position relative to bounding box origin
      const left = (screen.left - minX) * scale
      const top = (screen.top - minY) * scale
      const width = screen.width * scale
      const height = screen.height * scale

      card.style.cssText = `
        position: absolute;
        left: ${left}px;
        top: ${top}px;
        width: ${width}px;
        height: ${height}px;
        background: ${screen.isPrimary ? '#3b82f6' : '#6b7280'};
        ${isCurrent ? 'box-shadow: 0 0 0 3px #22c55e;' : ''}
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        font-size: 10px;
        flex-direction: column;
        gap: 2px;
        overflow: hidden;
        box-sizing: border-box;
      `
      card.innerHTML = `
        <strong style="font-size: 11px;">Screen ${index + 1}</strong>
        <span>${screen.width}×${screen.height}</span>
        <span style="opacity: 0.7; font-size: 9px;">(${screen.left}, ${screen.top})</span>
        ${screen.isPrimary ? '<span style="font-size: 8px; background: rgba(255,255,255,0.2); padding: 1px 4px; border-radius: 2px;">Primary</span>' : ''}
        ${isCurrent ? '<span style="font-size: 8px; background: #22c55e; padding: 1px 4px; border-radius: 2px;">Current</span>' : ''}
      `
      container.appendChild(card)
    })

    // Legend
    const legend = document.createElement('div')
    legend.style.cssText = 'display: flex; gap: 12px; margin-top: 8px; font-size: 11px; color: #94a3b8;'
    legend.innerHTML = `
      <span><span style="display: inline-block; width: 10px; height: 10px; background: #3b82f6; border-radius: 2px; margin-right: 4px;"></span>Primary</span>
      <span><span style="display: inline-block; width: 10px; height: 10px; background: #6b7280; border-radius: 2px; margin-right: 4px;"></span>Secondary</span>
      <span><span style="display: inline-block; width: 10px; height: 10px; border: 2px solid #22c55e; border-radius: 2px; margin-right: 4px; box-sizing: border-box;"></span>Current</span>
      <span><span style="display: inline-block; width: 6px; height: 6px; background: #f59e0b; border-radius: 50%; margin-right: 4px;"></span>Origin</span>
    `
    container.parentElement.appendChild(legend)

    // Listen for screen changes
    screenDetails.addEventListener('screenschange', () => {
      console.log('🔄 Screens changed!')
    })
  } catch (e) {
    console.error('Failed to get screen details:', e.message)
    console.log('This API requires user permission and HTTPS')
  }
}

// Attach to button click
document.getElementById('get-screens-btn').addEventListener('click', getScreenInfo)

console.log('👆 Click "Get Screen Info" to request permission and view connected screens')
