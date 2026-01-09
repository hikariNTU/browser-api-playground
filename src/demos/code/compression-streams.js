// Compression Streams API - Native gzip/deflate compression
// Compress and decompress text data with format comparison

async function compress(text, format = 'gzip') {
  const encoder = new TextEncoder()
  const stream = new Blob([encoder.encode(text)])
    .stream()
    .pipeThrough(new CompressionStream(format))

  const compressedBlob = await new Response(stream).blob()
  return compressedBlob
}

async function decompress(blob, format = 'gzip') {
  const stream = blob.stream().pipeThrough(new DecompressionStream(format))
  const text = await new Response(stream).text()
  return text
}

// Create UI
const container = document.createElement('div')
container.style.cssText = 'display: flex; flex-direction: column; gap: 12px;'

const textarea = document.createElement('textarea')
textarea.style.cssText = `
  width: 100%;
  height: 100px;
  padding: 12px;
  font-family: monospace;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
`
textarea.value =
  'Hello, World! This is some text that will be compressed using the Compression Streams API. The more repetitive content, the better the compression ratio!'

// Format selector
const formatRow = document.createElement('div')
formatRow.style.cssText = 'display: flex; gap: 16px; align-items: center;'
formatRow.innerHTML = `
  <span style="font-weight: 500;">Format:</span>
  <label><input type="radio" name="format" value="gzip" checked> gzip</label>
  <label><input type="radio" name="format" value="deflate"> deflate</label>
  <label><input type="radio" name="format" value="deflate-raw"> deflate-raw</label>
`

const btnRow = document.createElement('div')
btnRow.style.cssText = 'display: flex; gap: 8px; flex-wrap: wrap;'

const compressBtn = document.createElement('button')
compressBtn.textContent = '🗜️ Compress'
compressBtn.style.cssText = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`

const decompressBtn = document.createElement('button')
decompressBtn.textContent = '📂 Decompress'
decompressBtn.style.cssText = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`
decompressBtn.disabled = true

const compareBtn = document.createElement('button')
compareBtn.textContent = '📊 Compare All Formats'
compareBtn.style.cssText = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`

const result = document.createElement('div')
result.style.cssText = `
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
`
result.textContent = 'Results will appear here...'

let compressedData = null
let currentFormat = 'gzip'

function getSelectedFormat() {
  return document.querySelector('input[name="format"]:checked')?.value || 'gzip'
}

compressBtn.onclick = async () => {
  const text = textarea.value
  const originalSize = new TextEncoder().encode(text).length
  currentFormat = getSelectedFormat()

  compressedData = await compress(text, currentFormat)
  const compressedSize = compressedData.size
  const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1)

  result.innerHTML = `
    <strong>Compression Results (${currentFormat}):</strong><br>
    Original: ${originalSize} bytes<br>
    Compressed: ${compressedSize} bytes<br>
    <span style="color: #10b981">Saved: ${ratio}%</span>
  `

  console.log(`[${currentFormat}] Original:`, originalSize, 'bytes')
  console.log(`[${currentFormat}] Compressed:`, compressedSize, 'bytes')
  console.log(`[${currentFormat}] Ratio:`, ratio + '%')

  decompressBtn.disabled = false
}

decompressBtn.onclick = async () => {
  if (!compressedData) return

  const decompressed = await decompress(compressedData, currentFormat)
  textarea.value = decompressed

  result.innerHTML += '<br><br><span style="color: #3b82f6">✅ Decompressed successfully!</span>'
  console.log('Decompressed text:', decompressed)
}

compareBtn.onclick = async () => {
  const text = textarea.value
  const originalSize = new TextEncoder().encode(text).length
  const formats = ['gzip', 'deflate', 'deflate-raw']
  const results = []

  for (const fmt of formats) {
    const compressed = await compress(text, fmt)
    const ratio = ((1 - compressed.size / originalSize) * 100).toFixed(1)
    results.push({ format: fmt, size: compressed.size, ratio })
  }

  let html = `<strong>Format Comparison:</strong><br>Original: ${originalSize} bytes<br><br>`
  html += '<table style="width:100%; border-collapse: collapse;">'
  html += '<tr style="border-bottom: 1px solid #ccc;"><th style="text-align:left; padding:4px;">Format</th><th style="text-align:right; padding:4px;">Size</th><th style="text-align:right; padding:4px;">Saved</th></tr>'

  results.forEach((r) => {
    html += `<tr><td style="padding:4px;">${r.format}</td><td style="text-align:right; padding:4px;">${r.size} bytes</td><td style="text-align:right; padding:4px; color:#10b981;">${r.ratio}%</td></tr>`
  })
  html += '</table>'

  result.innerHTML = html
  console.log('Comparison:', results)
}

btnRow.appendChild(compressBtn)
btnRow.appendChild(decompressBtn)
btnRow.appendChild(compareBtn)
container.appendChild(textarea)
container.appendChild(formatRow)
container.appendChild(btnRow)
container.appendChild(result)
document.body.appendChild(container)

console.log('Compression Streams API ready!')
console.log('Enter text and click Compress, or Compare All Formats.')
