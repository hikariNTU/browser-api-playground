# Tasks: Refine Demo Examples

## Task Group 1: WebRTC/WebCodecs Improvements

- [x] 1.1 Rewrite default webrtc-webcodecs.js to demonstrate encode → decode pipeline with video playback
- [x] 1.2 Add device selection dropdown UI to enumerate devices example (ex2)
- [x] 1.3 Review ex1 (camera controls) and ex3 (video encoder) - consolidate or differentiate

## Task Group 2: Web Share API Consolidation

- [x] 2.1 Remove web-share-ex1.js, web-share-ex2.js, web-share-ex3.js (trivial examples)
- [x] 2.2 Update web-share.ts to remove examples array
- [x] 2.3 Verify default demo is comprehensive

## Task Group 3: Gamepad API Cleanup

- [x] 3.1 Remove gamepad-ex1.js (basic connect/disconnect - covered in default)
- [x] 3.2 Merge gamepad-ex2.js vibration/rumble feature into default gamepad.js
- [x] 3.3 Remove gamepad-ex2.js after merge
- [x] 3.4 Update gamepad.ts to remove examples array

## Task Group 4: File System Access Consolidation

- [x] 4.1 Integrate open/save/directory functionality into default file-system-access.js
- [x] 4.2 Remove file-system-access-ex1.js, ex2.js, ex3.js
- [x] 4.3 Update file-system-access.ts examples array

## Task Group 5: Compression Streams Consolidation

- [x] 5.1 Integrate deflate/gzip comparison into default compression-streams.js
- [x] 5.2 Remove compression-streams-ex1.js, ex2.js, ex3.js
- [x] 5.3 Update compression-streams.ts examples array

## Task Group 6: MediaRecorder Visualization Merge

- [x] 6.1 Create combined visualizer example with waveform/spectrum toggle
- [x] 6.2 Remove separate media-recorder-ex1.js (waveform) and ex2.js (spectrum)
- [x] 6.3 Keep media-recorder-ex3.js (download) as separate useful example
- [x] 6.4 Update media-recorder.ts examples array

## Task Group 7: Device Selection for Microphone UIs

- [x] 7.1 Add mic device selection to MediaRecorder default demo
- [x] 7.2 Add mic device selection to Web Speech ASR example (ex2, ex3)
- [x] 7.3 Add device selection helper function that can be reused

## Task Group 8: ASR Language Selection

- [x] 8.1 Add language dropdown to web-speech-ex2.html/js (basic ASR)
- [x] 8.2 Add language dropdown to web-speech-ex3.html/js (continuous ASR)
- [x] 8.3 Include common languages: en-US, en-GB, es-ES, fr-FR, de-DE, zh-CN, ja-JP, ko-KR

## Task Group 9: AudioContext Node Editor (Large Feature)

- [x] 9.1 Research canvas node editor libraries available via jsdelivr (LiteGraph.js, Rete.js, etc.)
- [x] 9.2 Create audiocontext-ex4.html with canvas and library import from CDN
- [x] 9.3 Create audiocontext-ex4.js with node types: oscillator, gain, filter, analyzer, destination
- [x] 9.4 Implement drag-drop node creation and connection logic
- [x] 9.5 Add visual feedback for audio flow (animate connections when audio plays)
- [x] 9.6 Update audiocontext.ts examples array

## Task Group 10: Demo Ordering

- [x] 10.1 Reorder demos array in src/demos/index.ts:
  1. webSpeechDemo
  2. gamepadDemo
  3. eyedropperDemo
  4. windowManagementDemo
  5. compressionStreamsDemo
  6. mediaRecorderDemo
  7. webrtcWebcodecsDemo
  8. webShareDemo
  9. screenWakeLockDemo
  10. webSerialDemo
  11. viewTransitionsDemo
  12. audioContextDemo
  13. fileSystemAccessDemo
  14. deviceExperimentalDemo

## Task Group 11: General UI Review

- [x] 11.1 Review all remaining examples to ensure they have meaningful UI
- [x] 11.2 Ensure no pure console-only functions remain without justification
- [x] 11.3 Test all demos after changes
