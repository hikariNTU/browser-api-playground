// Idle Detection + Compute Pressure APIs
// Monitor user activity and CPU pressure

// Idle Detection API
async function startIdleDetection() {
  if (!('IdleDetector' in window)) {
    console.log('❌ Idle Detection API not supported')
    document.getElementById('idle-status').textContent = 'Not supported'
    return
  }

  try {
    const permission = await IdleDetector.requestPermission()
    if (permission !== 'granted') {
      console.log('❌ Idle detection permission denied')
      return
    }

    const idleDetector = new IdleDetector()

    idleDetector.addEventListener('change', () => {
      const { userState, screenState } = idleDetector
      console.log(`👤 User: ${userState}, Screen: ${screenState}`)

      document.getElementById('idle-status').innerHTML = `
        <strong>User:</strong> ${userState}<br>
        <strong>Screen:</strong> ${screenState}
      `
    })

    await idleDetector.start({ threshold: 60000 }) // 60 second threshold
    console.log('✅ Idle detection started (60s threshold)')
    document.getElementById('idle-btn').textContent = '✅ Monitoring'
    document.getElementById('idle-btn').disabled = true
  } catch (e) {
    console.error('Error:', e.message)
  }
}

// Compute Pressure API
async function startPressureMonitoring() {
  if (!('PressureObserver' in window)) {
    console.log('❌ Compute Pressure API not supported')
    document.getElementById('pressure-status').textContent = 'Not supported'
    return
  }

  try {
    const observer = new PressureObserver((records) => {
      const latest = records[records.length - 1]
      console.log(`⚡ CPU Pressure: ${latest.state}`)

      const stateColors = {
        nominal: '#10b981',
        fair: '#f59e0b',
        serious: '#ef4444',
        critical: '#dc2626',
      }

      document.getElementById('pressure-status').innerHTML = `
        <strong>State:</strong> <span style="color: ${stateColors[latest.state]}">${latest.state}</span><br>
        <strong>Time:</strong> ${new Date(latest.time).toLocaleTimeString()}
      `
    })

    await observer.observe('cpu', { sampleInterval: 1000 })
    console.log('✅ Pressure monitoring started')
    document.getElementById('pressure-btn').textContent = '✅ Monitoring'
    document.getElementById('pressure-btn').disabled = true
  } catch (e) {
    console.error('Error:', e.message)
  }
}

document.getElementById('idle-btn').addEventListener('click', startIdleDetection)
document.getElementById('pressure-btn').addEventListener('click', startPressureMonitoring)

console.log('👁️ Idle Detection + Compute Pressure Demo')
console.log('Click buttons to start monitoring')
