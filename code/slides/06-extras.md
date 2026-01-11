# EyeDropper API

Pick any color from anywhere on screen:

```js
const dropper = new EyeDropper()
const { sRGBHex } = await dropper.open()
// "#ff6b6b"
```

Perfect for design tools, color pickers, accessibility

[Try EyeDropper Demo](/api/eyedropper)

---

## Screen Wake Lock

Keep the screen on:

```js
const wakeLock = await navigator.wakeLock.request('screen')
// Screen won't dim or lock
```

Great for:
- 🎵 Music/video apps
- 👨‍🍳 Recipe apps
- 📊 Dashboard displays
- 🎤 Presentation mode

[Try Wake Lock Demo](/api/screen-wake-lock)

---

## View Transitions API

Smooth animations between page states:

```js
document.startViewTransition(() => {
  // Update the DOM
  updateContent()
})
```

Native-feeling page transitions without libraries

[Try View Transitions Demo](/api/view-transitions)

---

## Window Management API

Multi-monitor awareness:

```js
const screens = await window.getScreenDetails()
// Know about all connected displays

await popup.moveTo(screens[1].left, screens[1].top)
// Position windows on specific monitors
```

![Google Slides uses this to let you choose which monitor for fullscreen presentation](/slides/google-slide-presentation-screen-management.png)

[Try Window Management Demo](/api/window-management)
