// Auto-cancel after 5 seconds
const eyeDropper = new EyeDropper()
const controller = new AbortController()

setTimeout(() => {
  controller.abort()
  console.log('Picker timed out after 5 seconds')
}, 5000)

try {
  console.log('Pick a color within 5 seconds...')
  const result = await eyeDropper.open({ signal: controller.signal })
  console.log('Selected:', result.sRGBHex)
} catch (e) {
  if (e.name === 'AbortError') {
    console.log('Selection was aborted')
  }
}
