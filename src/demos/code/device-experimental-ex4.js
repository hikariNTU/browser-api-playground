// Local Font Access API
// Enumerate and preview locally installed fonts

async function listFonts() {
  if (!('queryLocalFonts' in window)) {
    console.log('❌ Local Font Access API not supported')
    document.getElementById('font-list').innerHTML = '<p>Not supported in this browser</p>'
    return
  }

  try {
    console.log('📝 Requesting font access...')
    const fonts = await window.queryLocalFonts()

    console.log(`✅ Found ${fonts.length} fonts`)

    // Group by family
    const families = new Map()
    fonts.forEach((font) => {
      if (!families.has(font.family)) {
        families.set(font.family, [])
      }
      families.get(font.family).push(font)
    })

    console.log(`📁 ${families.size} font families`)

    // Display first 20 families
    const container = document.getElementById('font-list')
    container.innerHTML = ''

    let count = 0
    for (const [family, variants] of families) {
      if (count >= 20) break
      count++

      const item = document.createElement('div')
      item.style.cssText = `
        padding: 12px;
        border-bottom: 1px solid #e5e7eb;
      `
      item.innerHTML = `
        <div style="font-family: '${family}', sans-serif; font-size: 18px; margin-bottom: 4px;">
          ${family}
        </div>
        <div style="font-size: 11px; color: #6b7280;">
          ${variants.length} variant${variants.length > 1 ? 's' : ''}: ${variants.map((v) => v.style).join(', ')}
        </div>
      `
      container.appendChild(item)
    }

    document.getElementById('font-count').textContent =
      `Showing 20 of ${families.size} font families`
  } catch (e) {
    console.error('Error:', e.message)
    if (e.name === 'SecurityError') {
      console.log('Permission denied - user must grant access')
    }
  }
}

document.getElementById('list-fonts-btn').addEventListener('click', listFonts)

console.log('📝 Local Font Access Demo')
console.log('Click the button to enumerate installed fonts')
