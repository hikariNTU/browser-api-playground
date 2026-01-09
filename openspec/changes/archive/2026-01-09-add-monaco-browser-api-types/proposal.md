# Change: Add Monaco Browser API Types

## Why
Monaco Editor shows TypeScript errors for newer browser APIs like `EyeDropper`, `SpeechRecognition`, `IdleDetector`, etc. because these aren't included in the default TypeScript lib definitions. This creates a poor user experience with red squigglies on valid code.

Example error: `Could not find name 'EyeDropper'. Did you mean 'eyeDropper'?(2570)`

## What Changes

### 1. Add Custom Type Definitions
Use Monaco's `addExtraLib()` API to inject type declarations for browser APIs that our demos use:
- EyeDropper API
- Window Management API (`getScreenDetails`)
- Web Speech API (`SpeechRecognition`, `webkitSpeechRecognition`)
- Idle Detection API (`IdleDetector`)
- Compute Pressure API (`PressureObserver`)
- Local Font Access API (`queryLocalFonts`)
- Battery Status API (`getBattery`)
- Network Information API (`navigator.connection`)
- Screen Capture additions
- MediaRecorder enhancements

### 2. Configure Monaco JavaScript Defaults
In the editor mount handler, configure:
- `javascriptDefaults.addExtraLib()` with our custom `.d.ts` content
- Optionally set compiler options to be less strict for playground use

## Impact
- **New file**: `src/lib/browser-api-types.d.ts` (or inline string)
- **Modified**: `src/components/api-playground.tsx` - add type registration in `handleEditorMount`

## Decisions
1. **Only add experimental APIs not in TypeScript's lib.dom.d.ts** - Monaco already loads built-in types. We only supplement with missing experimental APIs (EyeDropper, IdleDetector, PressureObserver, getScreenDetails, queryLocalFonts, etc.)
2. **Separate file** - `src/lib/browser-api-types.ts` exporting a string constant for clarity and maintainability

