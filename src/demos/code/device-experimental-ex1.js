// Geolocation + Device Orientation APIs
// Get your current location and device orientation (tilt/compass)

// Geolocation
function getLocation() {
  if (!('geolocation' in navigator)) {
    console.error('❌ Geolocation not supported')
    return
  }

  console.log('📍 Getting location...')
  document.getElementById('location-status').textContent = 'Requesting location...'

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords
      console.log(`📍 Location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`)
      console.log(`   Accuracy: ±${accuracy.toFixed(0)}m`)

      document.getElementById('location-status').innerHTML = `
        <strong>Lat:</strong> ${latitude.toFixed(6)}<br>
        <strong>Lng:</strong> ${longitude.toFixed(6)}<br>
        <strong>Accuracy:</strong> ±${accuracy.toFixed(0)}m
      `
    },
    (error) => {
      console.error('Error:', error.message)
      document.getElementById('location-status').textContent = 'Error: ' + error.message
    },
    { enableHighAccuracy: true }
  )
}

// Device Orientation
let orientationHandler = null

function startOrientation() {
  if (!('DeviceOrientationEvent' in window)) {
    console.error('❌ Device Orientation not supported')
    return
  }

  // iOS 13+ requires permission
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission().then((response) => {
      if (response === 'granted') {
        addOrientationListener()
      }
    })
  } else {
    addOrientationListener()
  }
}

function addOrientationListener() {
  console.log('🧭 Orientation tracking started')

  orientationHandler = (event) => {
    const { alpha, beta, gamma } = event

    document.getElementById('orientation-status').innerHTML = `
      <strong>Alpha (Z):</strong> ${alpha?.toFixed(1) ?? 'N/A'}°<br>
      <strong>Beta (X):</strong> ${beta?.toFixed(1) ?? 'N/A'}°<br>
      <strong>Gamma (Y):</strong> ${gamma?.toFixed(1) ?? 'N/A'}°
    `
  }

  window.addEventListener('deviceorientation', orientationHandler)
  document.getElementById('orientation-btn').textContent = '⏹️ Stop Orientation'
}

document.getElementById('location-btn').addEventListener('click', getLocation)
document.getElementById('orientation-btn').addEventListener('click', () => {
  if (orientationHandler) {
    window.removeEventListener('deviceorientation', orientationHandler)
    orientationHandler = null
    document.getElementById('orientation-btn').textContent = '🧭 Start Orientation'
    document.getElementById('orientation-status').textContent = 'Stopped'
    console.log('⏹️ Orientation tracking stopped')
  } else {
    startOrientation()
  }
})

console.log('📍 Geolocation + Device Orientation Demo')
console.log('Click the buttons to get location or track device orientation')
