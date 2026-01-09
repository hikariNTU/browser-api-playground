// Web Speech API - Text-to-Speech Synthesis
// Enter text and click Speak to hear it read aloud

function speak() {
  const text = document.getElementById('text-input').value
  if (!text) {
    console.log('Please enter some text to speak')
    return
  }

  // Cancel any ongoing speech
  speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)

  utterance.onstart = () => console.log('🔊 Speaking...')
  utterance.onend = () => console.log('✅ Finished speaking')
  utterance.onerror = (e) => console.error('Error:', e.error)

  speechSynthesis.speak(utterance)
}

function stop() {
  speechSynthesis.cancel()
  console.log('⏹️ Speech stopped')
}

// Set up event listeners
document.getElementById('speak-btn').addEventListener('click', speak)
document.getElementById('stop-btn').addEventListener('click', stop)

console.log('🎤 Web Speech API - Text-to-Speech Demo')
console.log('Enter text and click "Speak" to hear it read aloud')
