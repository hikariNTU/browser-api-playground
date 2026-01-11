// AudioContext API - Web Audio synthesis
// Click the buttons to play different tones

const audioCtx = new AudioContext()

function playTone(frequency, duration = 0.5, type = 'sine') {
  const oscillator = audioCtx.createOscillator()
  const gainNode = audioCtx.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioCtx.destination)

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime)

  // Envelope for smooth sound
  gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
  gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.01)
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration)

  oscillator.start(audioCtx.currentTime)
  oscillator.stop(audioCtx.currentTime + duration)

  console.log(`Playing ${type} wave at ${frequency}Hz for ${duration}s`)
}

// Create UI
const container = document.createElement('div')
container.style.cssText = 'display: flex; flex-direction: column; gap: 12px;'

const notes = [
  { name: 'C4', freq: 261.63 },
  { name: 'E4', freq: 329.63 },
  { name: 'G4', freq: 392.0 },
  { name: 'C5', freq: 523.25 },
]

const btnContainer = document.createElement('div')
btnContainer.style.cssText = 'display: flex; gap: 8px; flex-wrap: wrap;'

notes.forEach((note) => {
  const btn = document.createElement('button')
  btn.textContent = note.name
  btn.style.cssText = `
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 500;
    background: #8b5cf6;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  `
  btn.onclick = () => playTone(note.freq)
  btnContainer.appendChild(btn)
})

// Chord button
const chordBtn = document.createElement('button')
chordBtn.textContent = '🎵 Play Chord'
chordBtn.style.cssText = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
`
chordBtn.onclick = () => {
  playTone(261.63, 1)
  playTone(329.63, 1)
  playTone(392.0, 1)
  console.log('Playing C major chord')
}

container.appendChild(btnContainer)
container.appendChild(chordBtn)
document.body.appendChild(container)

console.log('Click the buttons to play notes!')
