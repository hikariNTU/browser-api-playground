const wakeLock = await navigator.wakeLock.request('screen')
console.log('Wake lock active!')

// Release after 5 seconds
setTimeout(async () => {
  await wakeLock.release()
  console.log('Wake lock released')
}, 5000)
