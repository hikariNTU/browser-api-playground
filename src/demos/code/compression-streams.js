// Compression Streams API - Native gzip/deflate compression
// Compress and decompress text data with format comparison

const textarea = document.getElementById('input-text')
const compressBtn = document.getElementById('compress-btn')
const decompressBtn = document.getElementById('decompress-btn')
const compareBtn = document.getElementById('compare-btn')
const result = document.getElementById('result')

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
    <span style="color: #22c55e">Saved: ${ratio}%</span>
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
  html += '<table style="width:100%; border-collapse: collapse; color: #e2e8f0;">'
  html +=
    '<tr style="border-bottom: 1px solid #475569;"><th style="text-align:left; padding:4px;">Format</th><th style="text-align:right; padding:4px;">Size</th><th style="text-align:right; padding:4px;">Saved</th></tr>'

  results.forEach((r) => {
    html += `<tr><td style="padding:4px;">${r.format}</td><td style="text-align:right; padding:4px;">${r.size} bytes</td><td style="text-align:right; padding:4px; color:#22c55e;">${r.ratio}%</td></tr>`
  })
  html += '</table>'

  result.innerHTML = html
  console.log('Comparison:', results)
}

console.log('Compression Streams API ready!')
console.log('Enter text and click Compress, or Compare All Formats.')
