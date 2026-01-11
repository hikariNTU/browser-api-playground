const audioCtx = new AudioContext()
const oscillator = audioCtx.createOscillator()
const gainNode = audioCtx.createGain()

oscillator.connect(gainNode)
gainNode.connect(audioCtx.destination)

oscillator.frequency.value = 440 // A4 note
gainNode.gain.value = 0.5

oscillator.start()
oscillator.stop(audioCtx.currentTime + 0.5)

console.log('Playing 440Hz beep')
