// Battery Status + Network Information APIs
// Monitor battery level and network connection

// Battery Status API
async function getBatteryInfo() {
  if (!('getBattery' in navigator)) {
    console.log('❌ Battery Status API not supported')
    document.getElementById('battery-status').textContent = 'Not supported in this browser'
    return
  }

  const battery = await navigator.getBattery()

  function updateBatteryInfo() {
    const level = (battery.level * 100).toFixed(0)
    const charging = battery.charging ? '⚡ Charging' : '🔋 On Battery'

    console.log(`🔋 Battery: ${level}% ${charging}`)

    document.getElementById('battery-status').innerHTML = `
      <strong>Level:</strong> ${level}%<br>
      <strong>Status:</strong> ${charging}<br>
      <strong>Charging Time:</strong> ${battery.chargingTime === Infinity ? 'N/A' : Math.round(battery.chargingTime / 60) + ' min'}<br>
      <strong>Discharging Time:</strong> ${battery.dischargingTime === Infinity ? 'N/A' : Math.round(battery.dischargingTime / 60) + ' min'}
    `

    // Update battery icon
    const icon = document.getElementById('battery-icon')
    icon.style.background = `linear-gradient(to right, ${battery.charging ? '#10b981' : '#3b82f6'} ${level}%, #e5e7eb ${level}%)`
  }

  updateBatteryInfo()
  battery.addEventListener('chargingchange', updateBatteryInfo)
  battery.addEventListener('levelchange', updateBatteryInfo)
}

// Network Information API
function getNetworkInfo() {
  if (!('connection' in navigator)) {
    console.log('❌ Network Information API not supported')
    document.getElementById('network-status').textContent = 'Not supported in this browser'
    return
  }

  const connection = navigator.connection

  function updateNetworkInfo() {
    console.log(`🌐 Network: ${connection.effectiveType}`)
    console.log(`   Downlink: ${connection.downlink} Mbps`)

    document.getElementById('network-status').innerHTML = `
      <strong>Type:</strong> ${connection.effectiveType}<br>
      <strong>Downlink:</strong> ${connection.downlink} Mbps<br>
      <strong>RTT:</strong> ${connection.rtt}ms<br>
      <strong>Save Data:</strong> ${connection.saveData ? 'Yes' : 'No'}
    `
  }

  updateNetworkInfo()
  connection.addEventListener('change', updateNetworkInfo)
}

// Initialize
getBatteryInfo()
getNetworkInfo()

console.log('🔋 Battery + Network Information Demo')
console.log('Values update automatically when changes occur')
