// Gamepad API - Read controller input
// Connect a gamepad and press any button to activate it

let animationId = null

function updateGamepadDisplay() {
  const gamepads = navigator.getGamepads()

  // Find first connected gamepad
  const gamepad = [...gamepads].find((gp) => gp !== null)

  if (!gamepad) {
    animationId = requestAnimationFrame(updateGamepadDisplay)
    return
  }

  // Clear and update display
  let display = document.getElementById('gamepad-display')
  if (!display) {
    display = document.createElement('div')
    display.id = 'gamepad-display'
    display.style.cssText = 'font-family: monospace; padding: 16px;'
    document.body.appendChild(display)

    // Add vibration button if supported
    if (gamepad.vibrationActuator) {
      const vibrateBtn = document.createElement('button')
      vibrateBtn.id = 'vibrate-btn'
      vibrateBtn.textContent = '📳 Test Vibration'
      vibrateBtn.style.cssText = 'padding: 10px 20px; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; margin: 12px 0; font-weight: 500;'
      vibrateBtn.onclick = async () => {
        const gp = [...navigator.getGamepads()].find((g) => g?.vibrationActuator)
        if (gp?.vibrationActuator) {
          vibrateBtn.textContent = '📳 Vibrating...'
          await gp.vibrationActuator.playEffect('dual-rumble', {
            startDelay: 0,
            duration: 500,
            weakMagnitude: 0.5,
            strongMagnitude: 1.0,
          })
          vibrateBtn.textContent = '📳 Test Vibration'
          console.log('✅ Vibration complete!')
        }
      }
      display.before(vibrateBtn)
    }
  }

  // Build display HTML
  let html = `<h3>🎮 ${gamepad.id}</h3>`

  // Vibration support indicator
  html += `<p style="color: ${gamepad.vibrationActuator ? '#22c55e' : '#ef4444'}; margin: 8px 0;">
    Vibration: ${gamepad.vibrationActuator ? '✅ Supported' : '❌ Not supported'}
  </p>`

  // Buttons
  html += '<div style="margin: 16px 0;"><strong>Buttons:</strong><br>'
  html += '<div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">'
  gamepad.buttons.forEach((button, i) => {
    const pressed = button.pressed
    const value = button.value.toFixed(2)
    html += `
      <div style="
        width: 40px;
        height: 40px;
        background: ${pressed ? '#3b82f6' : '#e5e7eb'};
        color: ${pressed ? 'white' : '#374151'};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        font-size: 12px;
      ">
        ${i}
      </div>
    `
  })
  html += '</div></div>'

  // Axes
  html += '<div style="margin: 16px 0;"><strong>Axes:</strong><br>'
  html += '<div style="display: flex; gap: 24px; margin-top: 8px;">'

  for (let i = 0; i < gamepad.axes.length; i += 2) {
    const x = gamepad.axes[i] || 0
    const y = gamepad.axes[i + 1] || 0

    // Visual joystick
    const dotX = 30 + x * 25
    const dotY = 30 + y * 25

    html += `
      <div style="text-align: center;">
        <svg width="60" height="60" style="background: #f3f4f6; border-radius: 50%;">
          <circle cx="30" cy="30" r="25" fill="none" stroke="#d1d5db" stroke-width="1"/>
          <circle cx="${dotX}" cy="${dotY}" r="8" fill="#3b82f6"/>
        </svg>
        <div style="font-size: 11px; margin-top: 4px;">
          X: ${x.toFixed(2)}<br>Y: ${y.toFixed(2)}
        </div>
      </div>
    `
  }
  html += '</div></div>'

  display.innerHTML = html

  animationId = requestAnimationFrame(updateGamepadDisplay)
}

// Listen for gamepad connections
window.addEventListener('gamepadconnected', (e) => {
  console.log('🎮 Gamepad connected:', e.gamepad.id)
  console.log('Buttons:', e.gamepad.buttons.length)
  console.log('Axes:', e.gamepad.axes.length)
  console.log('Vibration:', e.gamepad.vibrationActuator ? 'Supported' : 'Not supported')
})

window.addEventListener('gamepaddisconnected', (e) => {
  console.log('🎮 Gamepad disconnected:', e.gamepad.id)
})

console.log('Waiting for gamepad...')
console.log('Connect a controller and press any button!')

// Start polling
updateGamepadDisplay()
