// EyeDropper API - Pick colors from anywhere on screen
// Click the button in the Output panel to pick a color

const pickBtn = document.getElementById('pick-btn')
const colorResult = document.getElementById('color-result')
const colorPreview = document.getElementById('color-preview')
const colorValue = document.getElementById('color-value')

pickBtn.onclick = async () => {
  const eyeDropper = new EyeDropper()

  try {
    const result = await eyeDropper.open()
    console.log('Selected color:', result.sRGBHex)

    // Show the color preview
    colorResult.style.display = 'block'
    colorPreview.style.background = result.sRGBHex
    colorValue.textContent = result.sRGBHex
  } catch (e) {
    console.log('Color picking cancelled')
  }
}

console.log('Click the button above to pick a color!')
