// Enumerate Devices - Device selection UI demo

async function showDeviceSelector() {
  const devices = await navigator.mediaDevices.enumerateDevices()

  const cameras = devices.filter((d) => d.kind === 'videoinput')
  const mics = devices.filter((d) => d.kind === 'audioinput')
  const speakers = devices.filter((d) => d.kind === 'audiooutput')

  // Create UI container
  const container = document.createElement('div')
  container.style.cssText = 'font-family: system-ui; max-width: 500px; margin: 16px 0;'

  function createDeviceSection(title, emoji, deviceList, kind) {
    const section = document.createElement('div')
    section.style.cssText = 'margin-bottom: 16px;'

    const label = document.createElement('label')
    label.style.cssText = 'display: block; font-weight: 600; margin-bottom: 6px; color: #e2e8f0;'
    label.textContent = `${emoji} ${title} (${deviceList.length})`

    const select = document.createElement('select')
    select.style.cssText = 'width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #475569; background: #1e293b; color: #e2e8f0; font-size: 14px;'
    select.id = `select-${kind}`

    if (deviceList.length === 0) {
      const opt = document.createElement('option')
      opt.textContent = 'No devices found'
      select.appendChild(opt)
      select.disabled = true
    } else {
      deviceList.forEach((device, i) => {
        const opt = document.createElement('option')
        opt.value = device.deviceId
        opt.textContent = device.label || `${title} ${i + 1}`
        select.appendChild(opt)
      })
    }

    section.appendChild(label)
    section.appendChild(select)
    return section
  }

  container.appendChild(createDeviceSection('Cameras', '📷', cameras, 'video'))
  container.appendChild(createDeviceSection('Microphones', '🎤', mics, 'audio'))
  container.appendChild(createDeviceSection('Speakers', '🔊', speakers, 'speaker'))

  // Test selected devices button
  const testBtn = document.createElement('button')
  testBtn.textContent = '🔍 Test Selected Camera'
  testBtn.style.cssText = 'padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; margin-top: 8px;'

  const previewContainer = document.createElement('div')
  previewContainer.style.cssText = 'margin-top: 16px;'

  testBtn.onclick = async () => {
    const videoSelect = document.getElementById('select-video')
    const audioSelect = document.getElementById('select-audio')

    previewContainer.innerHTML = ''

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoSelect.value ? { deviceId: { exact: videoSelect.value } } : true,
        audio: audioSelect.value ? { deviceId: { exact: audioSelect.value } } : false,
      })

      const video = document.createElement('video')
      video.srcObject = stream
      video.autoplay = true
      video.muted = true
      video.style.cssText = 'width: 100%; max-width: 400px; border-radius: 8px; margin-top: 12px;'
      previewContainer.appendChild(video)

      const stopBtn = document.createElement('button')
      stopBtn.textContent = '⏹️ Stop'
      stopBtn.style.cssText = 'padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; margin-top: 8px;'
      stopBtn.onclick = () => {
        stream.getTracks().forEach((t) => t.stop())
        previewContainer.innerHTML = '<p style="color: #94a3b8;">Preview stopped</p>'
      }
      previewContainer.appendChild(stopBtn)

      console.log('✅ Streaming from selected devices')
    } catch (e) {
      previewContainer.innerHTML = `<p style="color: #f87171;">Error: ${e.message}</p>`
      console.error('Device access error:', e)
    }
  }

  container.appendChild(testBtn)
  container.appendChild(previewContainer)
  document.body.appendChild(container)

  console.log('📷 Cameras:', cameras.length)
  console.log('🎤 Microphones:', mics.length)
  console.log('🔊 Speakers:', speakers.length)
}

showDeviceSelector()
