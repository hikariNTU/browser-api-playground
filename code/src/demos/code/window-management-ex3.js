// Monitor for screen configuration changes
// ⚠️ Requires user gesture (button click) to request permission

let screenDetails = null

async function startMonitoring() {
  try {
    screenDetails = await window.getScreenDetails()

    console.log(`✅ Started monitoring ${screenDetails.screens.length} screen(s)`)

    screenDetails.screens.forEach((screen, i) => {
      console.log(`  Screen ${i + 1}: ${screen.label || screen.width + 'x' + screen.height}`)
    })

    screenDetails.addEventListener('screenschange', () => {
      console.log('🔄 Screen configuration changed!')
      console.log(`Now ${screenDetails.screens.length} screen(s):`)

      screenDetails.screens.forEach((screen, i) => {
        console.log(`  Screen ${i + 1}: ${screen.label || screen.width + 'x' + screen.height}`)
      })
    })

    console.log('')
    console.log('📡 Monitoring for screen changes...')
    console.log('Try connecting/disconnecting a display!')

    document.getElementById('status').textContent = '✅ Monitoring active'
    document.getElementById('status').style.color = '#10b981'
  } catch (e) {
    console.error('Error:', e.message)
  }
}

document.getElementById('monitor-btn').addEventListener('click', startMonitoring)

console.log('👆 Click the button to start monitoring screen changes')
