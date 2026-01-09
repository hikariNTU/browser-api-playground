// WebRTC & WebCodecs - Full encode → decode pipeline demo
// Shows camera capture, video encoding, and decoding with stats

async function runEncodeDecode() {
  const WIDTH = 640
  const HEIGHT = 480
  const CODEC = 'vp8'
  const BITRATE = 1_000_000

  // Stats tracking
  let encodedFrames = 0
  let decodedFrames = 0
  let totalEncodedBytes = 0
  const startTime = performance.now()

  // Create UI
  const container = document.createElement('div')
  container.style.cssText = 'display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0;'

  const inputVideo = document.createElement('video')
  inputVideo.autoplay = true
  inputVideo.muted = true
  inputVideo.style.cssText = 'width: 320px; border-radius: 8px; border: 2px solid #3b82f6;'

  const outputCanvas = document.createElement('canvas')
  outputCanvas.width = WIDTH
  outputCanvas.height = HEIGHT
  outputCanvas.style.cssText = 'width: 320px; border-radius: 8px; border: 2px solid #10b981;'
  const ctx = outputCanvas.getContext('2d')

  const labels = document.createElement('div')
  labels.style.cssText = 'display: flex; gap: 16px; width: 100%;'
  labels.innerHTML = `
    <span style="flex:1; text-align:center; color:#3b82f6; font-weight:500;">📹 Input (Camera)</span>
    <span style="flex:1; text-align:center; color:#10b981; font-weight:500;">🎬 Output (Decoded)</span>
  `

  const statsDiv = document.createElement('div')
  statsDiv.style.cssText = 'width: 100%; font-family: monospace; font-size: 13px; background: #1e293b; padding: 12px; border-radius: 8px; color: #e2e8f0;'

  container.appendChild(inputVideo)
  container.appendChild(outputCanvas)
  container.appendChild(labels)
  container.appendChild(statsDiv)
  document.body.appendChild(container)

  function updateStats() {
    const elapsed = (performance.now() - startTime) / 1000
    const bitrate = totalEncodedBytes * 8 / elapsed / 1000
    statsDiv.innerHTML = `
      <div>⏱️ Elapsed: ${elapsed.toFixed(1)}s</div>
      <div>📤 Encoded: ${encodedFrames} frames (${(totalEncodedBytes / 1024).toFixed(1)} KB)</div>
      <div>📥 Decoded: ${decodedFrames} frames</div>
      <div>📊 Bitrate: ${bitrate.toFixed(0)} kbps</div>
      <div>🎯 Codec: ${CODEC.toUpperCase()}</div>
    `
  }

  try {
    // Check WebCodecs support
    if (!('VideoEncoder' in window)) {
      throw new Error('WebCodecs not supported in this browser')
    }

    console.log('🎬 Starting encode → decode pipeline...')
    console.log(`Codec: ${CODEC}, Resolution: ${WIDTH}x${HEIGHT}, Bitrate: ${BITRATE / 1000} kbps`)

    // Get camera stream
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: WIDTH, height: HEIGHT },
      audio: false,
    })
    inputVideo.srcObject = stream
    console.log('✅ Camera access granted')

    // Create decoder
    const decoder = new VideoDecoder({
      output: (frame) => {
        ctx.drawImage(frame, 0, 0)
        frame.close()
        decodedFrames++
        updateStats()
      },
      error: (e) => console.error('Decoder error:', e),
    })

    await decoder.configure({ codec: CODEC })

    // Create encoder
    const encoder = new VideoEncoder({
      output: (chunk, metadata) => {
        encodedFrames++
        totalEncodedBytes += chunk.byteLength
        // Pass encoded chunk directly to decoder
        decoder.decode(chunk)
      },
      error: (e) => console.error('Encoder error:', e),
    })

    await encoder.configure({
      codec: CODEC,
      width: WIDTH,
      height: HEIGHT,
      bitrate: BITRATE,
    })

    // Create video frame reader
    const track = stream.getVideoTracks()[0]
    const reader = new MediaStreamTrackProcessor({ track }).readable.getReader()

    // Process frames
    let running = true
    const processFrames = async () => {
      while (running) {
        const { value: frame, done } = await reader.read()
        if (done) break
        encoder.encode(frame, { keyFrame: encodedFrames % 60 === 0 })
        frame.close()
      }
    }

    processFrames()

    // Stop button
    const stopBtn = document.createElement('button')
    stopBtn.textContent = '⏹️ Stop Pipeline'
    stopBtn.style.cssText = 'padding: 10px 20px; margin: 12px 0; cursor: pointer; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: 500;'
    stopBtn.onclick = async () => {
      running = false
      stream.getTracks().forEach((t) => t.stop())
      await encoder.flush()
      encoder.close()
      decoder.close()
      console.log(`\n✅ Pipeline stopped. Total: ${encodedFrames} frames encoded/decoded`)
      stopBtn.remove()
    }
    document.body.appendChild(stopBtn)

    console.log('✅ Pipeline running! Encoding → Decoding in real-time')
  } catch (e) {
    console.error('❌ Error:', e.message)
    statsDiv.innerHTML = `<span style="color:#f87171;">Error: ${e.message}</span>`
  }
}

runEncodeDecode()
