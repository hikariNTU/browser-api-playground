# Change: Consolidate Demo Examples & Add Broadcast Channel API

## Why
1. Several API demos have redundant examples that are either:
   - Tiny code snippets (3-17 lines) that don't work standalone or provide meaningful interactivity
   - Duplicate functionality already covered by the default example
   - Fragments that require UI elements not provided

2. The Broadcast Channel API is a useful, well-supported API for cross-tab communication that's currently only in the appendix. It would make a great interactive demo.

## What Changes

### Remove Redundant Examples
- **Web Serial**: Remove 3 redundant examples (ex1, ex2, ex3) - keep only the default which has full UI and actually works
- **Screen Wake Lock**: Remove ex1 (tiny snippet) - keep default, visibility handler, and toggle examples
- **EyeDropper**: Remove ex1 (3-line snippet) - keep default, palette builder, and abort controller examples

### Add New Demo
- **Broadcast Channel API**: Add new demo for cross-tab messaging with live multi-tab communication

## Impact
- Affected specs: `api-demos`
- Affected code:
  - `src/demos/web-serial.ts` - reduce from 4 to 1 example
  - `src/demos/screen-wake-lock.ts` - reduce from 4 to 3 examples
  - `src/demos/eyedropper.ts` - reduce from 4 to 3 examples
  - `src/demos/code/` - remove unused JS/HTML files
  - `src/demos/broadcast-channel.ts` - new demo file
  - `src/demos/code/broadcast-channel.js` - new code file
  - `src/demos/code/broadcast-channel.html` - new HTML file
  - `src/demos/index.ts` - add broadcast channel to registry
  - `src/components/previews/` - add preview component
  - `src/routes/api/` - add route
  - `src/data/appendix-apis.ts` - remove from appendix (promoted to demo)

## Examples Analysis

### Web Serial (4 → 1)
| Example | Lines | Issue |
|---------|-------|-------|
| default | 125 | ✅ Full UI, works |
| ex1 | 8 | ❌ No UI, incomplete |
| ex2 | 10 | ❌ No UI, incomplete |
| ex3 | 13 | ❌ No UI, incomplete |

### Screen Wake Lock (4 → 3)
| Example | Lines | Issue |
|---------|-------|-------|
| default | 73 | ✅ Full toggle UI |
| ex1 | 9 | ❌ Tiny snippet, auto-releases |
| ex2 | 21 | ✅ Visibility change handler |
| ex3 | 32 | ✅ Toggle with HTML |

### EyeDropper (4 → 3)
| Example | Lines | Issue |
|---------|-------|-------|
| default | ~50 | ✅ Full UI |
| ex1 | 3 | ❌ Just `open()` call |
| ex2 | 35 | ✅ Palette builder |
| ex3 | 18 | ✅ AbortController |

### Broadcast Channel (NEW)
The demo will show:
- Create/join a named channel
- Send messages to other tabs
- Receive messages from other tabs
- Visual indicator showing connected tabs
- Works without user gesture (no permission required)
