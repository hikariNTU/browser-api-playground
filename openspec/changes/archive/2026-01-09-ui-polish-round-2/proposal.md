# Change: UI Polish Round 2

## Why
Follow-up UI improvements to enhance user experience: fullscreen mode, tooltip visibility fixes, auto-run on example load, navbar collapsed state styling, and addressing Window Management API transient activation errors. Also adding new API demos.

## What Changes

### 1. Fullscreen Button
Add a fullscreen toggle button in the sidebar footer alongside QR code and theme toggle buttons.

### 2. Tooltip Color Scheme Fix
Fix the support check tooltip visibility issue - the code snippet inside uses `bg-muted` which may blend with tooltip background. Ensure consistent styling across all support check tooltips (sidebar badges and header badge).

### 3. Auto-run on Example Load
When user clicks "Load Example" in the examples drawer, automatically execute the loaded code (similar to auto-run on tab switch).

### 4. Window Management API User Gesture Fix
The Window Management API examples fail with "Transient activation is required to request permission." Add a button-triggered approach for all examples that require user gesture/transient activation.

### 5. Collapsed Navbar Styling
Replace the badge-style abbreviation with:
- A rounded filled square div with bold 2-letter initials
- Support checkmark as a floating badge on top-right corner (not inside the square)

### 6. New Demo: Web Speech API
Add demo for speech synthesis (text-to-speech) and speech recognition (speech-to-text/ASR).

### 7. New Demo: Device & Experimental APIs
Combine multiple device/experimental APIs into a single showcase demo:
- Geolocation API
- Device Orientation API
- Battery Status API
- Network Information API
- Idle Detection API
- Compute Pressure API
- Local Font Access API
- Keyboard Lock API
- Screen Capture API
- Content Index API

## Impact
- Affected code: `__root.tsx`, `api-playground.tsx`, window-management example files
- New component: `FullscreenToggle` (or inline in root)
- New demos: `web-speech.ts`, `device-experimental.ts`

## Questions Before Implementation
None - requirements are clear.
