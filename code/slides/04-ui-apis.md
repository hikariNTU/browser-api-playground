# UI Enhancement APIs

Modern browser features for better UX

---

## EyeDropper

Native color picker tool:

- Pick any color from screen
- Works outside browser window
- Returns sRGB hex value

```js
const eyeDropper = new EyeDropper()
const result = await eyeDropper.open()
console.log(result.sRGBHex) // "#ff0000"
```

[Try EyeDropper Demo →](/api/eyedropper)

---

## View Transitions

Smooth page transitions:

- Cross-document animations
- Element morphing effects
- Native browser support

[Try View Transitions Demo →](/api/view-transitions)

---

## Window Management

Multi-monitor support:

- Detect connected screens
- Position windows precisely
- Fullscreen on specific display

[Try Window Management Demo →](/api/window-management)
