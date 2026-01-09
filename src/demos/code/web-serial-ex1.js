const port = await navigator.serial.requestPort()
await port.open({ baudRate: 9600 })

console.log('Connected!')
console.log('Port info:', port.getInfo())

// Close when done
// await port.close();
