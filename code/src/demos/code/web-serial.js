// Web Serial API - Connect to serial devices
// Click the button to select a serial device

let port = null
let reader = null

// Create UI
const container = document.createElement('div')

const connectBtn = document.createElement('button')
connectBtn.textContent = '🔌 Connect Serial Device'
connectBtn.style.cssText = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 8px;
`

const disconnectBtn = document.createElement('button')
disconnectBtn.textContent = '❌ Disconnect'
disconnectBtn.style.cssText = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: none;
`

const terminal = document.createElement('pre')
terminal.style.cssText = `
  background: #1e1e1e;
  color: #00ff00;
  padding: 16px;
  border-radius: 8px;
  font-family: monospace;
  max-height: 200px;
  overflow: auto;
  margin: 16px 0;
  display: none;
`
terminal.textContent = 'Serial Terminal:\n'

const status = document.createElement('p')
status.style.cssText = 'margin-top: 12px; color: #666;'

connectBtn.onclick = async () => {
  try {
    // Request a serial port (requires user gesture)
    port = await navigator.serial.requestPort()

    // Open the port at 9600 baud
    await port.open({ baudRate: 9600 })

    console.log('✅ Serial port connected!')
    console.log('Port info:', port.getInfo())

    terminal.style.display = 'block'
    connectBtn.style.display = 'none'
    disconnectBtn.style.display = 'inline-block'
    status.textContent = '✅ Connected'
    status.style.color = '#10b981'

    // Read data from the serial port
    const textDecoder = new TextDecoderStream()
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable)
    reader = textDecoder.readable.getReader()

    console.log('📡 Listening for data...')

    // Read loop
    while (true) {
      const { value, done } = await reader.read()
      if (done) {
        break
      }
      terminal.textContent += value
      terminal.scrollTop = terminal.scrollHeight
      console.log('Received:', value)
    }
  } catch (e) {
    if (e.name === 'NotFoundError') {
      console.log('No serial port selected')
      status.textContent = '⚠️ No port selected'
      status.style.color = '#f59e0b'
    } else {
      console.error('Serial error:', e.message)
      status.textContent = '❌ Error: ' + e.message
      status.style.color = '#ef4444'
    }
  }
}

disconnectBtn.onclick = async () => {
  if (reader) {
    await reader.cancel()
    reader = null
  }
  if (port) {
    await port.close()
    port = null
  }
  terminal.style.display = 'none'
  connectBtn.style.display = 'inline-block'
  disconnectBtn.style.display = 'none'
  status.textContent = '🔌 Disconnected'
  status.style.color = '#666'
  console.log('Disconnected from serial port')
}

container.appendChild(connectBtn)
container.appendChild(disconnectBtn)
container.appendChild(terminal)
container.appendChild(status)
document.body.appendChild(container)
console.log('Click Connect to select a serial device!')
