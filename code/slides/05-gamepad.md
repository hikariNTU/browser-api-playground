# Gamepad API

Read controller input directly in the browser:

```js
window.addEventListener('gamepadconnected', (e) => {
  const gamepad = e.gamepad
  // Access buttons, axes, vibration
})
```

![DualShock Tools - Apply stick drift correction](/slides/dualshock-fix.png)

Real-world use: [DualShock Tools](https://dualshock-tools.github.io/) uses this to apply analog stick drift correction

[Try Gamepad Demo](/api/gamepad)
