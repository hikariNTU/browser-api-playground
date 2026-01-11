// Device & Experimental APIs - Feature Detection Overview
// Check which device APIs are available in your browser

const apis = [
  { name: 'Geolocation', check: () => 'geolocation' in navigator },
  { name: 'Device Orientation', check: () => 'DeviceOrientationEvent' in window },
  { name: 'Device Motion', check: () => 'DeviceMotionEvent' in window },
  { name: 'Battery Status', check: () => 'getBattery' in navigator },
  { name: 'Network Information', check: () => 'connection' in navigator },
  { name: 'Idle Detection', check: () => 'IdleDetector' in window },
  { name: 'Compute Pressure', check: () => 'PressureObserver' in window },
  { name: 'Local Font Access', check: () => 'queryLocalFonts' in window },
  {
    name: 'Screen Capture',
    check: () => navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices,
  },
  { name: 'Vibration', check: () => 'vibrate' in navigator },
  { name: 'Wake Lock', check: () => 'wakeLock' in navigator },
  { name: 'Clipboard', check: () => navigator.clipboard && 'writeText' in navigator.clipboard },
]

console.log('📱 Device & Experimental APIs - Feature Detection\n')

const container = document.getElementById('api-list')

apis.forEach((api) => {
  const supported = api.check()
  console.log(`${supported ? '✅' : '❌'} ${api.name}`)

  const item = document.createElement('div')
  item.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: ${supported ? '#ecfdf5' : '#fef2f2'};
    border-radius: 8px;
    margin-bottom: 8px;
  `
  item.innerHTML = `
    <span style="font-weight: 500;">${api.name}</span>
    <span style="color: ${supported ? '#10b981' : '#ef4444'};">${supported ? '✓ Supported' : '✗ Not Available'}</span>
  `
  container.appendChild(item)
})

console.log('\nExplore the examples to see each API in action!')
