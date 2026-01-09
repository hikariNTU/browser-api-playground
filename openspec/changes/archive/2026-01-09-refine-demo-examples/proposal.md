# Change: Refine Demo Examples

## Why
The current demo examples have several quality issues:
1. Some default demos don't demonstrate the API's core value (WebRTC/WebCodecs just shows camera, doesn't encode/decode)
2. Redundant examples that overlap with default demo functionality
3. Pure JS function examples without UI interaction
4. Missing device selection for microphone-based demos
5. Missing language selection for speech recognition
6. Demo ordering doesn't prioritize the most impressive/useful APIs

## What Changes

### 1. WebRTC/WebCodecs Improvements
**Problem:** Default demo just shows camera preview, doesn't actually use WebCodecs for encoding/decoding.
**Solution:** Create a meaningful demo that:
- Captures camera stream
- Encodes frames using VideoEncoder (VP8/VP9)
- Decodes and displays the encoded frames
- Shows encoding stats (bitrate, frame count)
- Ex2 (enumerate devices) should have a proper UI dropdown instead of console-only output

### 2. Web Share API Consolidation
**Problem:** Examples ex1, ex2, ex3 are trivial JS functions that don't add value.
**Solution:** Remove separate examples, the default demo already shows the full Share API usage with UI.

### 3. Gamepad API Cleanup
**Problem:** Default demo already has comprehensive UI. Ex1 (connect/disconnect events) and ex2 (button display) overlap significantly.
**Solution:** 
- Remove ex1 (basic events) - covered in default
- Merge ex2 vibration/rumble feature into default demo
- Remove ex3 (duplicate of ex2 vibration)

### 4. AudioContext Node Editor Example
**Problem:** Examples are simple tone generators. No visual demonstration of audio node graph.
**Solution:** Add a canvas-based drag-and-drop node editor example:
- Use existing library via jsdelivr CDN (e.g., LiteGraph.js)
- Source nodes (oscillator, microphone)
- Effect nodes (gain, filter, delay, analyzer)
- Visual connections between nodes with drag-drop
- Real-time audio output with visual flow animation

### 5. File System Access Consolidation
**Problem:** Ex1 (open), ex2 (save), ex3 (directory) are simple one-liners.
**Solution:** Integrate all operations into the default demo UI with tabs or buttons.

### 6. Compression Streams Consolidation
**Problem:** All examples do similar compress operations with slight variations.
**Solution:** Combine into default demo showing both gzip and deflate with size comparison.

### 7. MediaRecorder Visualization Merge
**Problem:** Ex1 (waveform) and ex2 (frequency) are separate examples.
**Solution:** Merge into a single "Audio Visualizer" example with toggle between waveform/spectrum modes.

### 8. Device Selection for Microphone UIs
**Problem:** MediaRecorder, Web Speech ASR demos use default microphone without selection.
**Solution:** Add device dropdown to select input device before starting recording/recognition.

### 9. ASR Language Selection
**Problem:** Speech recognition hardcoded to 'en-US'.
**Solution:** Add language dropdown with common languages (en-US, en-GB, zh-CN, ja-JP, etc.)

### 10. Demo Ordering
**Requested order:**
1. Web Speech API (impressive TTS + ASR)
2. Gamepad API (fun interactive)
3. EyeDropper API (quick demo)
4. Window Management API (visual multi-screen)
5. Compression Streams API
6. MediaRecorder API (recording)
7. WebRTC/WebCodecs
8. Web Share API
9. Screen Wake Lock
10. Web Serial
11. View Transitions
12. AudioContext
13. File System Access
14. Device & Experimental APIs

## Impact
- **Modified files:** All demo TS files and their code examples
- **Deleted files:** Redundant examples (web-share-ex1/2/3.js, file-system-access-ex1/2/3.js, compression-streams-ex1/2/3.js, gamepad-ex1.js, etc.)
- **New files:** audiocontext node editor example, combined visualizer example

## Decisions Needed
1. For AudioContext node editor - should it be canvas-based drag-and-drop or a simpler preset-based UI?
2. For device selection - add to all examples or just default demos?
