# Implementation Tasks

## 12. UI Polish Round 2

- [x] 12.1 Add fullscreen toggle button
  - [x] Create fullscreen toggle using `document.documentElement.requestFullscreen()` / `document.exitFullscreen()`
  - [x] Add `Maximize2` / `Minimize2` icons from lucide-react
  - [x] Place in sidebar footer alongside theme toggle and QR share button
  - [x] Handle fullscreen change events to sync button state

- [x] 12.2 Fix support tooltip visibility
  - [x] Update tooltip content styling to use contrasting colors
  - [x] Change `bg-muted` to explicit dark/light aware background
  - [x] Ensure code snippet is readable in both themes
  - [x] Apply same tooltip to sidebar badges (collapsed state) showing supportCheck code

- [x] 12.3 Auto-run code on example load
  - [x] Modify `handleLoadExample` to call `execute()` after setting code/html
  - [x] Ensure clear() happens before execute() to reset state
  - [x] Only auto-run if API is supported

- [x] 12.4 Fix Window Management API user gesture requirement
  - [x] Update `window-management.js` default code to use button click
  - [x] Update `window-management-ex1.js` to wrap in button handler
  - [x] Update `window-management-ex2.js` to wrap in button handler  
  - [x] Update `window-management-ex3.js` to wrap in button handler
  - [x] Add HTML templates with buttons for each example

- [x] 12.5 Redesign collapsed navbar item styling
  - [x] Replace Badge with a rounded square div (12x12 or similar)
  - [x] Use solid background color (accent when active, muted when inactive)
  - [x] Display bold 2-letter initials centered
  - [x] Add floating checkmark badge on top-right for supported APIs
  - [x] Add X badge for unsupported APIs

## 13. New API Demos

- [x] 13.1 Create Web Speech API demo
  - [x] Create `src/demos/web-speech.ts` demo definition
  - [x] Create `src/demos/code/web-speech.js` - Default: Text-to-speech synthesis
  - [x] Create `src/demos/code/web-speech.html` - HTML with text input and speak button
  - [x] Create `src/demos/code/web-speech-ex1.js` - Example 1: Voice selection and settings
  - [x] Create `src/demos/code/web-speech-ex1.html`
  - [x] Create `src/demos/code/web-speech-ex2.js` - Example 2: Speech recognition (ASR/STT)
  - [x] Create `src/demos/code/web-speech-ex2.html` - HTML with microphone button and transcript area
  - [x] Create `src/demos/code/web-speech-ex3.js` - Example 3: Continuous recognition with interim results
  - [x] Create `src/demos/code/web-speech-ex3.html`
  - [x] Add to `src/demos/index.ts`

- [x] 13.2 Create Device & Experimental APIs demo
  - [x] Create `src/demos/device-experimental.ts` demo definition
  - [x] Create `src/demos/code/device-experimental.js` - Default: Feature detection overview
  - [x] Create `src/demos/code/device-experimental.html`
  - [x] Create `src/demos/code/device-experimental-ex1.js` - Example 1: Geolocation + Device Orientation
  - [x] Create `src/demos/code/device-experimental-ex1.html`
  - [x] Create `src/demos/code/device-experimental-ex2.js` - Example 2: Battery + Network Info
  - [x] Create `src/demos/code/device-experimental-ex2.html`
  - [x] Create `src/demos/code/device-experimental-ex3.js` - Example 3: Idle Detection + Compute Pressure
  - [x] Create `src/demos/code/device-experimental-ex3.html`
  - [x] Create `src/demos/code/device-experimental-ex4.js` - Example 4: Local Font Access
  - [x] Create `src/demos/code/device-experimental-ex4.html`
  - [x] Create `src/demos/code/device-experimental-ex5.js` - Example 5: Screen Capture
  - [x] Create `src/demos/code/device-experimental-ex5.html`
  - [x] Add to `src/demos/index.ts`
