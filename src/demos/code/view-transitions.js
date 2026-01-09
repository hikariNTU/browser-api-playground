// View Transitions API - Smooth DOM animations
// Watch the smooth transitions between states

// Add some styles for the demo
const style = document.createElement('style')
style.textContent = `
  .card {
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: bold;
    margin: 20px;
    view-transition-name: card;
  }
  
  .card.small {
    width: 100px;
    height: 100px;
    font-size: 16px;
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  .card.moved {
    margin-left: 200px;
  }
  
  ::view-transition-old(card),
  ::view-transition-new(card) {
    animation-duration: 0.5s;
  }
`
document.head.appendChild(style)

// Create the card
const card = document.createElement('div')
card.className = 'card'
card.textContent = 'Click me!'
document.body.appendChild(card)

// State tracking
let state = 0

// Click handler with view transition
card.onclick = async () => {
  // Start a view transition
  const transition = document.startViewTransition(() => {
    state = (state + 1) % 3

    switch (state) {
      case 0:
        card.className = 'card'
        card.textContent = 'Normal'
        break
      case 1:
        card.className = 'card small'
        card.textContent = 'Small'
        break
      case 2:
        card.className = 'card moved'
        card.textContent = 'Moved'
        break
    }
  })

  // Wait for transition to complete
  await transition.finished
  console.log('Transition complete! State:', state)
}

console.log('Click the card to see view transitions!')
console.log('The API automatically animates between states.')
