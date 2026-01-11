// Screen Capture API
// Capture your screen, window, or browser tab

async function startCapture() {
  if (!navigator.mediaDevices?.getDisplayMedia) {
    console.log('❌ Screen Capture API not supported')
    return
  }

  try {
    console.log('🖥️ Requesting screen capture...')

    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: 'monitor', // or 'window', 'browser'
      },
      audio: false,
    })

    const video = document.getElementById('preview')
    video.srcObject = stream
    video.play()

    console.log('✅ Screen capture started')

    // Get track info
    const track = stream.getVideoTracks()[0]
    const settings = track.getSettings()
    console.log(`   Resolution: ${settings.width}x${settings.height}`)
    console.log(`   Frame Rate: ${settings.frameRate}fps`)

    document.getElementById('capture-info').innerHTML = `
      <strong>Capturing:</strong> ${settings.displaySurface || 'screen'}<br>
      <strong>Resolution:</strong> ${settings.width}x${settings.height}<br>
      <strong>Frame Rate:</strong> ${Math.round(settings.frameRate)}fps
    `

    // Handle track ending (user clicks "Stop sharing")
    track.addEventListener('ended', () => {
      console.log('⏹️ Screen capture stopped')
      video.srcObject = null
      document.getElementById('capture-info').textContent = 'Capture stopped'
    })

    document.getElementById('stop-btn').disabled = false
    document.getElementById('stop-btn').onclick = () => {
      stream.getTracks().forEach((t) => t.stop())
    }
  } catch (e) {
    if (e.name === 'NotAllowedError') {
      console.log('❌ User cancelled or permission denied')
    } else {
      console.error('Error:', e.message)
    }
  }
}

document.getElementById('capture-btn').addEventListener('click', startCapture)

console.log('🖥️ Screen Capture Demo')
console.log('Click the button to start capturing your screen')
