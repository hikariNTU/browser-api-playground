// Web Speech API - Voice Selection & Settings
// Choose different voices and adjust pitch and rate

let voices = []

function populateVoices() {
  voices = speechSynthesis.getVoices()
  const select = document.getElementById('voice-select')
  select.innerHTML = ''

  voices.forEach((voice, index) => {
    const option = document.createElement('option')
    option.value = index
    option.textContent = `${voice.name} (${voice.lang})${voice.default ? ' - Default' : ''}`
    select.appendChild(option)
  })

  console.log(`📋 Loaded ${voices.length} voices`)
}

// Populate voices when they're loaded
speechSynthesis.addEventListener('voiceschanged', populateVoices)
populateVoices()

function speak() {
  const text = document.getElementById('text-input').value
  if (!text) return

  speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)

  const voiceIndex = document.getElementById('voice-select').value
  if (voices[voiceIndex]) {
    utterance.voice = voices[voiceIndex]
  }

  utterance.pitch = parseFloat(document.getElementById('pitch').value)
  utterance.rate = parseFloat(document.getElementById('rate').value)

  console.log(`🔊 Speaking with: ${utterance.voice?.name || 'default voice'}`)
  console.log(`   Pitch: ${utterance.pitch}, Rate: ${utterance.rate}`)

  utterance.onend = () => console.log('✅ Done')

  speechSynthesis.speak(utterance)
}

document.getElementById('speak-btn').addEventListener('click', speak)

// Update displayed values
document.getElementById('pitch').addEventListener('input', (e) => {
  document.getElementById('pitch-value').textContent = e.target.value
})
document.getElementById('rate').addEventListener('input', (e) => {
  document.getElementById('rate-value').textContent = e.target.value
})

console.log('🎤 Voice Selection Demo')
console.log('Choose a voice and adjust pitch/rate settings')
