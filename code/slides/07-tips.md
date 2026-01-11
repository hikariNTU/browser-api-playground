# 🔐 Permission UX Matters

Users reject prompts they don't understand:

**❌ Bad:** Request permission on page load  
**✅ Good:** Request after user action + explanation

```js
// Explain first, then request
showExplanationModal()
  .then(() => navigator.mediaDevices.getUserMedia(...))
```

---

## 🔍 Feature Detection

Not all browsers support all APIs:

```js
// Always check before using
if ('wakeLock' in navigator) {
  // Safe to use
} else {
  // Show fallback or hide feature
}
```

Check [caniuse.com](https://caniuse.com) for support tables

---

## 🔒 HTTPS Required

Most powerful APIs require **secure context**:

- ✅ `https://` 
- ✅ `localhost` (for development)
- ❌ `http://` on production

---

## 🎯 Progressive Enhancement

Don't break the app if API isn't available:

1. Check if API exists
2. Provide fallback experience
3. Enhance when supported
