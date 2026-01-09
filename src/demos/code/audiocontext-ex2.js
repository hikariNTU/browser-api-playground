// Interactive waveform buttons
const audioCtx = new AudioContext()
const nowPlaying = document.getElementById('now-playing')
const buttons = document.querySelectorAll('.wave-btn')

async function playWaveform(type) {
  // Resume context if suspended (browser autoplay policy)
  if (audioCtx.state === 'suspended') {
    await audioCtx.resume()
  }

  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()

  osc.connect(gain)
  gain.connect(audioCtx.destination)

  osc.type = type
  osc.frequency.value = 440 // A4 note
  gain.gain.value = 0.3

  osc.start()
  osc.stop(audioCtx.currentTime + 0.5)

  nowPlaying.textContent = `Playing: ${type} wave at 440Hz`
  console.log(`Playing ${type} wave`)

  setTimeout(() => {
    nowPlaying.textContent = 'Click a button to hear the waveform'
  }, 500)
}

buttons.forEach((btn) => {
  btn.onclick = () => playWaveform(btn.dataset.type)
})

console.log('Click buttons to hear different waveforms')
