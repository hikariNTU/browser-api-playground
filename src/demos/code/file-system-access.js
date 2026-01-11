// File System Access API - Read/Write local files
// Chrome/Edge only - requires user gesture

const openBtn = document.getElementById('open-btn')
const saveBtn = document.getElementById('save-btn')
const dirBtn = document.getElementById('dir-btn')
const textarea = document.getElementById('file-content')
const dirList = document.getElementById('dir-list')
const status = document.getElementById('status')

let fileHandle = null

openBtn.onclick = async () => {
  try {
    ;[fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: 'Text files',
          accept: { 'text/*': ['.txt', '.md', '.json', '.js', '.ts'] },
        },
      ],
    })

    const file = await fileHandle.getFile()
    const contents = await file.text()

    textarea.value = contents
    textarea.style.display = 'block'
    dirList.style.display = 'none'
    status.textContent = `✅ Opened: ${file.name} (${file.size} bytes)`
    status.style.color = '#22c55e'

    console.log('File opened:', file.name)
    console.log('Size:', file.size, 'bytes')
    console.log('Type:', file.type)
  } catch (e) {
    if (e.name !== 'AbortError') {
      console.error('Error:', e.message)
      status.textContent = '❌ ' + e.message
      status.style.color = '#ef4444'
    }
  }
}

saveBtn.onclick = async () => {
  try {
    let handle = fileHandle

    if (!handle) {
      handle = await window.showSaveFilePicker({
        suggestedName: 'untitled.txt',
        types: [
          {
            description: 'Text file',
            accept: { 'text/plain': ['.txt'] },
          },
        ],
      })
    }

    const writable = await handle.createWritable()
    await writable.write(textarea.value)
    await writable.close()

    fileHandle = handle
    status.textContent = `✅ Saved: ${handle.name}`
    status.style.color = '#22c55e'

    console.log('File saved!')
  } catch (e) {
    if (e.name !== 'AbortError') {
      console.error('Error:', e.message)
      status.textContent = '❌ ' + e.message
      status.style.color = '#ef4444'
    }
  }
}

dirBtn.onclick = async () => {
  try {
    const dirHandle = await window.showDirectoryPicker()

    textarea.style.display = 'none'
    dirList.style.display = 'block'
    dirList.innerHTML = `<div style="font-weight: bold; margin-bottom: 8px;">📁 ${dirHandle.name}</div>`

    const entries = []
    for await (const entry of dirHandle.values()) {
      entries.push(entry)
    }

    // Sort: folders first, then files
    entries.sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === 'directory' ? -1 : 1
      return a.name.localeCompare(b.name)
    })

    entries.forEach((entry) => {
      const icon = entry.kind === 'file' ? '📄' : '📁'
      const div = document.createElement('div')
      div.style.cssText = 'padding: 4px 8px; border-radius: 4px; cursor: default;'
      div.textContent = `${icon} ${entry.name}`
      div.onmouseover = () => (div.style.background = '#334155')
      div.onmouseout = () => (div.style.background = 'transparent')
      dirList.appendChild(div)
    })

    status.textContent = `✅ Directory: ${dirHandle.name} (${entries.length} items)`
    status.style.color = '#8b5cf6'

    console.log('Directory:', dirHandle.name)
    console.log(`${entries.length} entries`)
  } catch (e) {
    if (e.name !== 'AbortError') {
      console.error('Error:', e.message)
      status.textContent = '❌ ' + e.message
      status.style.color = '#ef4444'
    }
  }
}

console.log('File System Access API ready!')
console.log('Click Open to read a file, Save to write, or Browse Directory.')

