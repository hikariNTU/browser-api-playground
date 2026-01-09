// EyeDropper API - Pick colors from anywhere on screen
// Click the button in the Output panel to pick a color

// Create a button (requires user gesture)
const button = document.createElement('button')
button.textContent = '🎨 Pick a Color'
button.style.cssText = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
`
button.onmouseover = () => (button.style.background = '#2563eb')
button.onmouseout = () => (button.style.background = '#3b82f6')

// Color display container
const resultContainer = document.createElement('div')
resultContainer.style.marginTop = '16px'

button.onclick = async () => {
  const eyeDropper = new EyeDropper()

  try {
    const result = await eyeDropper.open()
    console.log('Selected color:', result.sRGBHex)

    // Display a preview
    resultContainer.innerHTML = ''
    const preview = document.createElement('div')
    preview.style.cssText = `
      width: 100px;
      height: 100px;
      background: ${result.sRGBHex};
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `
    resultContainer.appendChild(preview)

    const label = document.createElement('p')
    label.textContent = result.sRGBHex
    label.style.cssText = 'font-family: monospace; margin-top: 8px;'
    resultContainer.appendChild(label)
  } catch (e) {
    console.log('Color picking cancelled')
  }
}

document.body.appendChild(button)
document.body.appendChild(resultContainer)
console.log('Click the button above to pick a color!')
