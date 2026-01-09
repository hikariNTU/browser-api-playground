// Web Speech API - Speech Recognition (ASR/STT) with language and mic selection
// Click the mic button and speak to see your words transcribed

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

if (!SpeechRecognition) {
  console.error('❌ Speech Recognition not supported in this browser')
  console.log('Try using Chrome or Edge')
} else {
  const recognition = new SpeechRecognition()
  const langSelect = document.getElementById('lang-select')
  const micSelect = document.getElementById('mic-select')

  recognition.lang = langSelect.value
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  let isListening = false
  let activeStream = null

  // Enumerate microphones on load (permission-first pattern)
  async function populateMicrophoneList() {
    try {
      // Request permission first to get device labels
      const tempStream = await navigator.mediaDevices.getUserMedia({ audio: true })
      tempStream.getTracks().forEach((t) => t.stop())

      const devices = await navigator.mediaDevices.enumerateDevices()
      const mics = devices.filter((d) => d.kind === 'audioinput')

      micSelect.innerHTML = ''
      mics.forEach((mic, i) => {
        const opt = document.createElement('option')
        opt.value = mic.deviceId
        opt.textContent = mic.label || `Microphone ${i + 1}`
        micSelect.appendChild(opt)
      })

      console.log(`Found ${mics.length} microphone(s)`)
    } catch (err) {
      console.error('Error enumerating devices:', err.message)
      micSelect.innerHTML = '<option value="">Default microphone</option>'
    }
  }

  langSelect.onchange = () => {
    recognition.lang = langSelect.value
    console.log('Language set to:', langSelect.value)
  }

  recognition.onstart = () => {
    isListening = true
    console.log(`🎤 Listening in ${recognition.lang}... Speak now!`)
    document.getElementById('mic-btn').textContent = '🔴 Listening...'
    document.getElementById('mic-btn').style.background = '#ef4444'
    langSelect.disabled = true
    micSelect.disabled = true
  }

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    const confidence = (event.results[0][0].confidence * 100).toFixed(1)

    console.log(`📝 "${transcript}"`)
    console.log(`   Confidence: ${confidence}%`)

    document.getElementById('transcript').textContent = transcript
  }

  recognition.onerror = (event) => {
    console.error('Error:', event.error)
    if (event.error === 'not-allowed') {
      console.log('Please allow microphone access')
    }
  }

  recognition.onend = () => {
    isListening = false
    document.getElementById('mic-btn').textContent = '🎤 Start Listening'
    document.getElementById('mic-btn').style.background = '#3b82f6'
    langSelect.disabled = false
    micSelect.disabled = false
    // Clean up stream
    if (activeStream) {
      activeStream.getTracks().forEach((t) => t.stop())
      activeStream = null
    }
  }

  document.getElementById('mic-btn').addEventListener('click', async () => {
    if (isListening) {
      recognition.stop()
    } else {
      // Get stream from selected microphone and pass track to recognition
      try {
        const constraints = {
          audio: micSelect.value ? { deviceId: { exact: micSelect.value } } : true,
        }
        activeStream = await navigator.mediaDevices.getUserMedia(constraints)
        const audioTrack = activeStream.getAudioTracks()[0]
        recognition.start(audioTrack)
      } catch (err) {
        console.error('Failed to access microphone:', err.message)
      }
    }
  })

  // Initialize
  populateMicrophoneList()

  console.log('🎤 Speech Recognition Demo')
  console.log('Select a language and microphone, then click the mic button')
}
