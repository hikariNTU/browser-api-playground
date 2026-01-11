// Build a color palette by picking multiple colors
const palette = document.getElementById('palette')
const pickBtn = document.getElementById('pick-btn')
const colors = []

pickBtn.onclick = async () => {
  const eyeDropper = new EyeDropper()

  for (let i = 0; i < 5; i++) {
    console.log(`Pick color ${i + 1} of 5...`)
    try {
      const result = await eyeDropper.open()
      colors.push(result.sRGBHex)
      console.log(`Added: ${result.sRGBHex}`)

      // Add swatch to palette
      const swatch = document.createElement('div')
      swatch.style.cssText = `
        width: 50px;
        height: 50px;
        background: ${result.sRGBHex};
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      `
      swatch.title = result.sRGBHex
      palette.appendChild(swatch)
    } catch {
      console.log('Picking cancelled')
      break
    }
  }

  console.log('Your palette:', colors)
}

console.log('Click "Pick 5 Colors" to start building your palette')
