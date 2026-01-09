const eyeDropper = new EyeDropper()
const result = await eyeDropper.open()
console.log('Color:', result.sRGBHex)
