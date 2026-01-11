// Basic MediaRecorder - Record and playback audio with device selection
const recordBtn = document.getElementById('record-btn')
const stopBtn = document.getElementById('stop-btn')
const micSelect = document.getElementById('mic-select')
const audioPlayback = document.getElementById('audio-playback')
const status = document.getElementById('status')

let mediaRecorder
let audioChunks = []

// Populate microphone dropdown
async function populateMicrophoneList() {
  try {
    // Request permission first to get device labels
    await navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((s) => s.getTracks().forEach((t) => t.stop()))

    const devices = await navigator.mediaDevices.enumerateDevices()
    const mics = devices.filter((d) => d.kind === 'audioinput')

    micSelect.innerHTML = ''
    mics.forEach((mic, i) => {
      const opt = document.createElement('option')
      opt.value = mic.deviceId
      opt.textContent = mic.label || `Microphone ${i + 1}`
      micSelect.appendChild(opt)
    })

    console.log('Found', mics.length, 'microphone(s)')
  } catch (err) {
    console.error('Error enumerating devices:', err.message)
    micSelect.innerHTML = '<option value="">Default microphone</option>'
  }
}

async function startRecording() {
  try {
    const constraints = {
      audio: micSelect.value ? { deviceId: { exact: micSelect.value } } : true,
    }
    const stream = await navigator.mediaDevices.getUserMedia(constraints)

    // Choose supported MIME type
    const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'

    mediaRecorder = new MediaRecorder(stream, { mimeType })
    audioChunks = []

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data)
      }
    }

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType })
      const audioUrl = URL.createObjectURL(audioBlob)
      audioPlayback.src = audioUrl
      status.textContent = 'Recording complete! Click play to listen.'
      console.log('Recording saved:', audioBlob.size, 'bytes')

      // Stop all tracks
      stream.getTracks().forEach((track) => track.stop())
    }

    mediaRecorder.start()
    status.textContent = 'Recording...'
    recordBtn.disabled = true
    stopBtn.disabled = false
    micSelect.disabled = true
    console.log('Recording started with', mimeType)
  } catch (err) {
    console.error('Error accessing microphone:', err.message)
    status.textContent = 'Error: ' + err.message
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
    recordBtn.disabled = false
    stopBtn.disabled = true
    micSelect.disabled = false
  }
}

recordBtn.onclick = startRecording
stopBtn.onclick = stopRecording

// Initialize
populateMicrophoneList()

console.log('MediaRecorder API ready')
console.log(
  'Supported MIME types:',
  ['audio/webm', 'audio/mp4', 'audio/ogg'].filter((t) => MediaRecorder.isTypeSupported(t))
)
