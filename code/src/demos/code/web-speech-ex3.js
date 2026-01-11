// Web Speech API - Continuous Recognition with language and mic selection
// See real-time transcription as you speak

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

if (!SpeechRecognition) {
  console.error('❌ Speech Recognition not supported')
} else {
  const recognition = new SpeechRecognition()
  const langSelect = document.getElementById('lang-select')
  const micSelect = document.getElementById('mic-select')

  recognition.lang = langSelect.value
  recognition.continuous = true
  recognition.interimResults = true

  let isListening = false
  let finalTranscript = ''
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
    finalTranscript = ''
    console.log(`🎤 Continuous listening started (${recognition.lang})`)
    document.getElementById('mic-btn').textContent = '🔴 Stop'
    document.getElementById('mic-btn').style.background = '#ef4444'
    document.getElementById('final-transcript').textContent = ''
    document.getElementById('interim-transcript').textContent = ''
    langSelect.disabled = true
    micSelect.disabled = true
  }

  recognition.onresult = (event) => {
    let interim = ''

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i]
      if (result.isFinal) {
        finalTranscript += result[0].transcript + ' '
        console.log(`✅ Final: "${result[0].transcript}"`)
      } else {
        interim += result[0].transcript
      }
    }

    document.getElementById('final-transcript').textContent = finalTranscript
    document.getElementById('interim-transcript').textContent = interim
  }

  recognition.onerror = (event) => {
    console.error('Error:', event.error)
  }

  recognition.onend = () => {
    isListening = false
    document.getElementById('mic-btn').textContent = '🎤 Start'
    document.getElementById('mic-btn').style.background = '#3b82f6'
    langSelect.disabled = false
    micSelect.disabled = false
    console.log('⏹️ Stopped listening')
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

  document.getElementById('clear-btn').addEventListener('click', () => {
    finalTranscript = ''
    document.getElementById('final-transcript').textContent = ''
    document.getElementById('interim-transcript').textContent = ''
    console.log('🗑️ Cleared transcript')
  })

  // Initialize
  populateMicrophoneList()

  console.log('🎤 Continuous Recognition Demo')
  console.log('Select a language and microphone, speak continuously')
}
