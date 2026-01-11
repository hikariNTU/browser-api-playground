// Named View Transitions - each element animates independently
const boxes = document.getElementById('boxes')
const swapBtn = document.getElementById('swap-btn')

swapBtn.onclick = () => {
  document.startViewTransition(() => {
    // Swap the order of children
    const children = Array.from(boxes.children)
    children.reverse().forEach((child) => boxes.appendChild(child))
  })
  console.log('Boxes swapped with named transitions!')
}

console.log('Click Swap to see independent box animations')
