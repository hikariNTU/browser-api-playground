// Basic View Transition with toggle button
const text = document.getElementById('text')
const toggleBtn = document.getElementById('toggle-btn')
let isHello = true

toggleBtn.onclick = () => {
  document.startViewTransition(() => {
    isHello = !isHello
    text.textContent = isHello ? 'Hello' : 'World!'
    text.style.color = isHello ? '#1a1a1a' : '#3b82f6'
  })
  console.log(`Transitioned to: ${text.textContent}`)
}

console.log('Click the button to see the view transition')
