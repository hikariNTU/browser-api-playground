// Combined Audio Visualizer - Waveform & Spectrum with toggle
const canvas = document.getElementById('visualizer')
const ctx = canvas.getContext('2d')
const startBtn = document.getElementById('start-btn')
const stopBtn = document.getElementById('stop-btn')
const modeSelect = document.getElementById('mode-select')
const status = document.getElementById('status')

let audioCtx, analyser, source, animationId, stream
let dataArray, bufferLength

const BAR_COUNT = 64
const BAR_GAP = 2

async function startVisualization() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true })

    audioCtx = new AudioContext()
    analyser = audioCtx.createAnalyser()
    analyser.fftSize = 2048
    analyser.smoothingTimeConstant = 0.8

    bufferLength = analyser.frequencyBinCount
    dataArray = new Uint8Array(bufferLength)

    source = audioCtx.createMediaStreamSource(stream)
    source.connect(analyser)

    startBtn.disabled = true
    stopBtn.disabled = false
    status.textContent = 'Listening... Make some noise!'

    draw()
    console.log('Visualizer started in', modeSelect.value, 'mode')
  } catch (err) {
    console.error('Error:', err.message)
    status.textContent = 'Error: ' + err.message
  }
}

function drawWaveform() {
  analyser.getByteTimeDomainData(dataArray)

  // Clear canvas
  ctx.fillStyle = '#1f2937'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw waveform
  ctx.lineWidth = 2
  ctx.strokeStyle = '#22c55e'
  ctx.beginPath()

  const sliceWidth = canvas.width / bufferLength
  let x = 0

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0
    const y = (v * canvas.height) / 2

    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
    x += sliceWidth
  }

  ctx.lineTo(canvas.width, canvas.height / 2)
  ctx.stroke()

  // Draw center line
  ctx.strokeStyle = '#374151'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, canvas.height / 2)
  ctx.lineTo(canvas.width, canvas.height / 2)
  ctx.stroke()
}

function drawSpectrum() {
  analyser.getByteFrequencyData(dataArray)

  // Clear canvas
  ctx.fillStyle = '#1f2937'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const barWidth = (canvas.width - BAR_GAP * (BAR_COUNT - 1)) / BAR_COUNT

  for (let i = 0; i < BAR_COUNT; i++) {
    const index = Math.floor((i / BAR_COUNT) * (bufferLength / 2))
    const value = dataArray[index]
    const barHeight = (value / 255) * canvas.height

    // Gradient from green to yellow to red
    const hue = 120 - (value / 255) * 120
    ctx.fillStyle = `hsl(${hue}, 80%, 50%)`

    const x = i * (barWidth + BAR_GAP)
    const y = canvas.height - barHeight

    ctx.fillRect(x, y, barWidth, barHeight)
  }
}

function draw() {
  animationId = requestAnimationFrame(draw)

  if (modeSelect.value === 'waveform') {
    drawWaveform()
  } else {
    drawSpectrum()
  }
}

function stopVisualization() {
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
  }
  if (audioCtx) {
    audioCtx.close()
  }

  startBtn.disabled = false
  stopBtn.disabled = true
  status.textContent = 'Stopped'

  ctx.fillStyle = '#1f2937'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  console.log('Visualizer stopped')
}

modeSelect.onchange = () => {
  console.log('Switched to', modeSelect.value, 'mode')
}

startBtn.onclick = startVisualization
stopBtn.onclick = stopVisualization

// Initial canvas setup
ctx.fillStyle = '#1f2937'
ctx.fillRect(0, 0, canvas.width, canvas.height)

console.log('Combined audio visualizer ready')
console.log('Toggle between waveform and spectrum modes!')
