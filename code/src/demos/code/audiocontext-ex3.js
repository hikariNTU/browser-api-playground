const audioCtx = new AudioContext()
const osc = audioCtx.createOscillator()
const gain = audioCtx.createGain()

osc.connect(gain)
gain.connect(audioCtx.destination)

// Start at 200Hz, sweep to 800Hz over 2 seconds
osc.frequency.setValueAtTime(200, audioCtx.currentTime)
osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 2)

gain.gain.setValueAtTime(0.3, audioCtx.currentTime)
gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 2)

osc.start()
osc.stop(audioCtx.currentTime + 2)

console.log('Sweeping 200Hz → 800Hz')
