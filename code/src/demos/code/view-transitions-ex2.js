// View Transition with custom duration
const box = document.getElementById('box')
const changeBtn = document.getElementById('change-btn')

const colors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b']
let colorIndex = 0

changeBtn.onclick = async () => {
  const transition = document.startViewTransition(() => {
    colorIndex = (colorIndex + 1) % colors.length
    box.style.background = colors[colorIndex]
    box.textContent = `Color ${colorIndex + 1}`
  })

  // Set custom duration via CSS
  document.documentElement.style.setProperty('--view-transition-duration', '0.5s')

  await transition.finished
  console.log('Transition complete!')
}

// Add transition duration CSS
const style = document.createElement('style')
style.textContent = `
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation-duration: var(--view-transition-duration, 0.25s);
  }
`
document.head.appendChild(style)

console.log('Click to cycle through colors with slow transition')
