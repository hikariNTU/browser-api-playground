// File System Access API - Read/Write local files
// Chrome/Edge only - requires user gesture

let fileHandle = null

// Create UI
const container = document.createElement('div')
container.style.cssText = 'display: flex; flex-direction: column; gap: 12px;'

const btnRow = document.createElement('div')
btnRow.style.cssText = 'display: flex; gap: 8px; flex-wrap: wrap;'

// Open button
const openBtn = document.createElement('button')
openBtn.textContent = '📂 Open File'
openBtn.style.cssText = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`

// Save button
const saveBtn = document.createElement('button')
saveBtn.textContent = '💾 Save File'
saveBtn.style.cssText = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`

// Directory button
const dirBtn = document.createElement('button')
dirBtn.textContent = '📁 Browse Directory'
dirBtn.style.cssText = `
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`

// Text area for content
const textarea = document.createElement('textarea')
textarea.style.cssText = `
  width: 100%;
  height: 150px;
  padding: 12px;
  font-family: monospace;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
`
textarea.placeholder = 'File contents will appear here...'

// Directory listing
const dirList = document.createElement('div')
dirList.style.cssText = 'font-family: monospace; font-size: 13px; max-height: 200px; overflow-y: auto; display: none;'

// Status
const status = document.createElement('p')
status.style.cssText = 'font-size: 14px; color: #666; margin: 0;'

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
    status.style.color = '#10b981'

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
    status.style.color = '#10b981'

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
      div.onmouseover = () => (div.style.background = '#f1f5f9')
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

btnRow.appendChild(openBtn)
btnRow.appendChild(saveBtn)
btnRow.appendChild(dirBtn)
container.appendChild(btnRow)
container.appendChild(textarea)
container.appendChild(dirList)
container.appendChild(status)
document.body.appendChild(container)

console.log('File System Access API ready!')
console.log('Click Open to read a file, Save to write, or Browse Directory.')
