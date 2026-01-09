// Record and Download Audio File
const recordBtn = document.getElementById('record-btn')
const stopBtn = document.getElementById('stop-btn')
const downloadBtn = document.getElementById('download-btn')
const status = document.getElementById('status')
const timer = document.getElementById('timer')

let mediaRecorder
let audioChunks = []
let audioBlob
let startTime
let timerInterval

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    // Choose supported MIME type and file extension
    const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'

    mediaRecorder = new MediaRecorder(stream, { mimeType })
    audioChunks = []

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data)
      }
    }

    mediaRecorder.onstop = () => {
      audioBlob = new Blob(audioChunks, { type: mimeType })
      status.textContent = `Recording saved (${(audioBlob.size / 1024).toFixed(1)} KB)`
      downloadBtn.disabled = false
      console.log('Recording complete:', audioBlob.size, 'bytes')

      stream.getTracks().forEach((track) => track.stop())
    }

    // Record in chunks every second for better data availability
    mediaRecorder.start(1000)
    startTime = Date.now()

    // Update timer display
    timerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000)
      const mins = Math.floor(elapsed / 60)
        .toString()
        .padStart(2, '0')
      const secs = (elapsed % 60).toString().padStart(2, '0')
      timer.textContent = `${mins}:${secs}`
    }, 100)

    status.textContent = 'Recording...'
    recordBtn.disabled = true
    stopBtn.disabled = false
    downloadBtn.disabled = true
    console.log('Recording started with', mimeType)
  } catch (err) {
    console.error('Error:', err.message)
    status.textContent = 'Error: ' + err.message
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
    clearInterval(timerInterval)
    recordBtn.disabled = false
    stopBtn.disabled = true
  }
}

function downloadRecording() {
  if (!audioBlob) return

  const ext = audioBlob.type.includes('webm') ? 'webm' : 'm4a'
  const url = URL.createObjectURL(audioBlob)
  const a = document.createElement('a')
  a.href = url
  a.download = `recording-${Date.now()}.${ext}`
  a.click()
  URL.revokeObjectURL(url)

  console.log('Downloaded:', a.download)
}

recordBtn.onclick = startRecording
stopBtn.onclick = stopRecording
downloadBtn.onclick = downloadRecording

console.log('Ready to record and download audio')
