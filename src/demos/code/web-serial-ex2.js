const port = await navigator.serial.requestPort()
await port.open({ baudRate: 9600 })

const encoder = new TextEncoder()
const writer = port.writable.getWriter()

await writer.write(encoder.encode('Hello Arduino!\n'))
console.log('Data sent!')

writer.releaseLock()
