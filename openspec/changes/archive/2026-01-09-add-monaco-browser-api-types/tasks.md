# Implementation Tasks

## 15. Add Monaco Browser API Types

- [ ] 15.1 Create browser API type definitions
  - [ ] Create `src/lib/browser-api-types.ts` with type declaration string
  - [ ] Add EyeDropper interface and global
  - [ ] Add Window Management API types (ScreenDetails, ScreenDetailed)
  - [ ] Add SpeechRecognition types (including webkit prefix)
  - [ ] Add IdleDetector types
  - [ ] Add PressureObserver types
  - [ ] Add Local Font Access types (FontData, queryLocalFonts)
  - [ ] Add Battery Status types (BatteryManager, getBattery)
  - [ ] Add Network Information types (NetworkInformation, connection)
  - [ ] Add MediaRecorder enhancements if needed

- [ ] 15.2 Register types with Monaco
  - [ ] Import type definitions in api-playground.tsx
  - [ ] Call `monaco.languages.typescript.javascriptDefaults.addExtraLib()` in handleEditorMount
  - [ ] Ensure types are registered before editor is fully mounted

- [ ] 15.3 Configure Monaco compiler options (optional)
  - [ ] Set appropriate target/lib for modern browser APIs
  - [ ] Consider disabling strict null checks for playground use

- [ ] 15.4 Test and verify
  - [ ] Verify EyeDropper no longer shows error
  - [ ] Verify SpeechRecognition autocomplete works
  - [ ] Verify other API types are recognized
  - [ ] Test that build still succeeds
