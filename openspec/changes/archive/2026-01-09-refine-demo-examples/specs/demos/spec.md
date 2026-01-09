# Spec Delta: refine-demo-examples

## MODIFIED Requirements

### Requirement: Demo example quality and consolidation

The system SHALL consolidate trivial examples into comprehensive default demos, add device/language selection UIs, and reorder demos for better user experience.

**Affected files:**
- src/demos/code/webrtc-webcodecs.js (major rewrite - encode/decode pipeline)
- src/demos/code/webrtc-webcodecs-ex2.js (device selection UI)
- src/demos/code/web-share-ex1.js (DELETE)
- src/demos/code/web-share-ex2.js (DELETE)
- src/demos/code/web-share-ex3.js (DELETE)
- src/demos/web-share.ts (remove examples)
- src/demos/code/gamepad-ex1.js (DELETE)
- src/demos/code/gamepad-ex2.js (evaluate - possibly DELETE)
- src/demos/gamepad.ts (update examples)
- src/demos/code/file-system-access.js (expand - integrate all features)
- src/demos/code/file-system-access-ex1.js (DELETE)
- src/demos/code/file-system-access-ex2.js (DELETE)
- src/demos/code/file-system-access-ex3.js (DELETE)
- src/demos/file-system-access.ts (remove examples)
- src/demos/code/compression-streams.js (expand - integrate deflate/gzip)
- src/demos/code/compression-streams-ex1.js (DELETE)
- src/demos/code/compression-streams-ex2.js (DELETE)
- src/demos/code/compression-streams-ex3.js (DELETE)
- src/demos/compression-streams.ts (remove examples)
- src/demos/code/media-recorder-ex1.js (DELETE - merged)
- src/demos/code/media-recorder-ex2.js (DELETE - merged)
- src/demos/code/media-recorder-ex4.js (NEW - combined visualizer)
- src/demos/code/media-recorder-ex4.html (NEW)
- src/demos/media-recorder.ts (update examples)
- src/demos/code/media-recorder.js (add device selection)
- src/demos/code/web-speech-ex2.js (add device & language selection)
- src/demos/code/web-speech-ex3.js (add device & language selection)
- src/demos/code/web-speech-ex2.html (UI for device/language)
- src/demos/code/web-speech-ex3.html (UI for device/language)
- src/demos/code/audiocontext-ex4.js (NEW - node editor)
- src/demos/code/audiocontext-ex4.html (NEW - node editor UI)
- src/demos/audiocontext.ts (add ex4)
- src/demos/index.ts (reorder demos)

#### Scenario: WebRTC encode/decode demo
**GIVEN** user opens WebRTC/WebCodecs demo
**WHEN** user clicks start button
**THEN** camera stream is captured, frames are encoded to H264/VP8, decoded, and displayed in output video element
**AND** user sees encoding stats (frames encoded, bitrate)

#### Scenario: Device selection for enumerate devices
**GIVEN** user opens WebRTC enumerate devices example
**WHEN** example loads
**THEN** user sees dropdown populated with available video/audio devices
**AND** user can select different devices and see their capabilities

#### Scenario: Web Share single comprehensive demo
**GIVEN** user opens Web Share demo
**THEN** default demo shows share text, URL, and file options
**AND** no additional examples are listed in dropdown

#### Scenario: Gamepad streamlined examples
**GIVEN** user opens Gamepad demo
**WHEN** controller is connected
**THEN** default demo shows all button/axis state visually
**AND** examples dropdown only shows significantly different examples

#### Scenario: File System Access single comprehensive demo
**GIVEN** user opens File System Access demo
**THEN** default demo has buttons for open file, save file, and pick directory
**AND** no additional examples are listed

#### Scenario: Compression Streams single comprehensive demo
**GIVEN** user opens Compression Streams demo
**THEN** default demo allows compressing/decompressing with deflate and gzip
**AND** shows comparison of compression ratios
**AND** no additional examples are listed

#### Scenario: Combined audio visualizer
**GIVEN** user opens MediaRecorder demo
**WHEN** user selects combined visualizer example
**THEN** user sees toggle to switch between waveform and frequency spectrum view
**AND** both visualizations work with same audio source

#### Scenario: Microphone device selection
**GIVEN** user opens MediaRecorder or Web Speech ASR demo
**WHEN** UI loads
**THEN** user sees microphone dropdown populated with available audio input devices
**AND** selecting different device changes audio source

#### Scenario: ASR language selection
**GIVEN** user opens Web Speech recognition example
**WHEN** UI loads
**THEN** user sees language dropdown with common languages
**AND** selecting different language updates SpeechRecognition.lang property

#### Scenario: AudioContext node editor
**GIVEN** user opens AudioContext node editor example
**WHEN** example loads
**THEN** user sees visual representation of audio nodes
**AND** user can add nodes (oscillator, gain, filter, analyzer)
**AND** user can connect nodes together
**AND** user can see audio flowing through connected nodes

#### Scenario: Demo ordering reflects user preference
**GIVEN** user views demo list
**THEN** demos appear in order: Web Speech, Gamepad, EyeDropper, Window Management, Compression, MediaRecorder, WebRTC, Web Share, Wake Lock, Web Serial, View Transitions, AudioContext, File System, Device/Experimental
