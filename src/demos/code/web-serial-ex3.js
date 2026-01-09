// Get ports that user has previously granted access to
const ports = await navigator.serial.getPorts()

if (ports.length === 0) {
  console.log('No previously authorized ports')
} else {
  console.log(`Found ${ports.length} authorized port(s):`)
  ports.forEach((port, i) => {
    const info = port.getInfo()
    console.log(`  Port ${i + 1}:`, info)
  })
}
