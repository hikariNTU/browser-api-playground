# Capability: API Demos

Individual browser API demonstrations with default code, output visualization, and curated examples.

## ADDED Requirements

### Requirement: EyeDropper API Demo
The system SHALL provide an interactive demo for the EyeDropper API allowing users to pick colors from anywhere on screen.

#### Scenario: User picks color successfully
- **WHEN** user runs the default EyeDropper code
- **AND** clicks on screen to select a color
- **THEN** output panel displays the selected color as hex value
- **AND** a color swatch preview is rendered

#### Scenario: User cancels color picker
- **WHEN** user presses Escape during color selection
- **THEN** output shows "Selection cancelled" message

---

### Requirement: Window Management API Demo
The system SHALL provide an interactive demo for the Window Management API allowing users to query screens and manage window placement.

#### Scenario: User enumerates screens
- **WHEN** user runs code to get screen details
- **THEN** output displays list of available screens with dimensions and positions

#### Scenario: User requests fullscreen on specific screen
- **WHEN** user runs code to fullscreen on secondary monitor
- **THEN** element goes fullscreen on the specified screen (if permission granted)

---

### Requirement: WebRTC and WebCodecs API Demo
The system SHALL provide an interactive demo for WebRTC/WebCodecs APIs allowing users to access camera and encode video.

#### Scenario: User accesses camera
- **WHEN** user runs camera access code
- **AND** grants permission
- **THEN** live video preview appears in output panel

#### Scenario: User encodes video frame
- **WHEN** user runs WebCodecs encoding example
- **THEN** output displays encoding stats (codec, frame size, duration)

---

### Requirement: Web Share API Demo
The system SHALL provide an interactive demo for the Web Share API allowing users to trigger native share dialogs.

#### Scenario: User shares text
- **WHEN** user runs share code with text content
- **THEN** native OS share dialog appears
- **AND** output confirms share was initiated

#### Scenario: Share not supported or cancelled
- **WHEN** share fails or user cancels
- **THEN** output displays appropriate error message

---

### Requirement: Screen Wake Lock API Demo
The system SHALL provide an interactive demo for the Screen Wake Lock API allowing users to prevent screen dimming.

#### Scenario: User acquires wake lock
- **WHEN** user runs code to request wake lock
- **THEN** output shows "Wake lock active ✅"
- **AND** status indicator remains visible

#### Scenario: User releases wake lock
- **WHEN** user runs code to release wake lock
- **THEN** output shows "Wake lock released"

#### Scenario: Wake lock auto-released
- **WHEN** page visibility changes to hidden
- **THEN** output updates to show wake lock was released

---

### Requirement: Web Serial API Demo
The system SHALL provide an interactive demo for the Web Serial API allowing users to connect to serial devices.

#### Scenario: User connects to serial port
- **WHEN** user runs code to request serial port
- **AND** selects a device from browser prompt
- **THEN** output shows connection status and port info

#### Scenario: User sends/receives data
- **WHEN** user runs code to write bytes to serial port
- **THEN** output displays sent data
- **AND** any received data appears in terminal-style view

---

### Requirement: Gamepad API Demo
The system SHALL provide an interactive demo for the Gamepad API with real-time visualization of controller state.

#### Scenario: User connects gamepad
- **WHEN** user presses a button on connected gamepad
- **THEN** output shows "Gamepad connected: {name}"
- **AND** visual controller diagram appears

#### Scenario: User interacts with gamepad
- **WHEN** user presses buttons or moves sticks
- **THEN** visual controller updates in real-time
- **AND** raw axis/button values are displayed

#### Scenario: No gamepad connected
- **WHEN** no gamepad is connected
- **THEN** output shows instructions to connect and press a button

---

### Requirement: View Transitions API Demo
The system SHALL provide an interactive demo for the View Transitions API allowing users to create smooth animated transitions.

#### Scenario: User triggers element transition
- **WHEN** user runs code that modifies DOM with view transition
- **THEN** smooth animation plays between states
- **AND** output shows transition was successful

#### Scenario: User customizes transition
- **WHEN** user modifies CSS animation properties in code
- **THEN** transition plays with custom easing/duration

---

### Requirement: Curated Examples Per API
The system SHALL provide at least 3 curated code examples per API demo, accessible via an examples drawer.

#### Scenario: User opens examples drawer
- **WHEN** user clicks "Examples" button on any API page
- **THEN** drawer slides open showing available examples
- **AND** each example has title, description, and "Load" button

#### Scenario: User loads example
- **WHEN** user clicks "Load" on an example
- **THEN** editor content is replaced with example code
- **AND** drawer closes
- **AND** code is ready to run

---

### Requirement: Demo Registry
The system SHALL implement a demo registry pattern allowing consistent rendering of all API demos through a unified interface.

#### Scenario: New demo is added
- **WHEN** developer creates new demo config in `demos/` folder
- **AND** exports it from registry
- **THEN** demo automatically appears in navigation and home grid
- **AND** playground page renders correctly

#### Scenario: Demo config validation
- **WHEN** demo config is missing required fields
- **THEN** TypeScript compilation fails with clear error

---

### Requirement: AudioContext API Demo
The system SHALL provide an interactive demo for the Web Audio API using AudioContext.

#### Scenario: User generates audio tone
- **WHEN** user clicks a "Play Tone" button
- **THEN** an audio tone is generated using OscillatorNode
- **AND** console shows frequency and duration info

#### Scenario: User adjusts audio parameters
- **WHEN** user modifies frequency or waveform in code
- **THEN** audio output reflects the changes

#### Scenario: Browser support detection
- **WHEN** user loads the AudioContext demo
- **THEN** support badge shows ✅ if `'AudioContext' in window`
- **AND** support badge shows ❌ if not supported

---

### Requirement: File System Access API Demo
The system SHALL provide an interactive demo for the File System Access API (Chrome-exclusive).

#### Scenario: User opens a file
- **WHEN** user clicks "Open File" button
- **THEN** native file picker dialog appears
- **AND** selected file contents are displayed
- **AND** console shows file metadata (name, size, type)

#### Scenario: User saves a file
- **WHEN** user clicks "Save File" button
- **THEN** native save dialog appears
- **AND** content is written to selected location

#### Scenario: Browser support detection
- **WHEN** user loads the File System Access demo
- **THEN** support badge shows ✅ if `'showOpenFilePicker' in window`
- **AND** support badge shows ❌ with note "Chrome/Edge only" if not supported

---

### Requirement: Compression Streams API Demo
The system SHALL provide an interactive demo for the Compression Streams API.

#### Scenario: User compresses text
- **WHEN** user enters text and clicks "Compress"
- **THEN** text is compressed using CompressionStream with gzip
- **AND** output shows compressed size vs original size
- **AND** compression ratio percentage is displayed

#### Scenario: User decompresses data
- **WHEN** user has compressed data and clicks "Decompress"
- **THEN** data is decompressed using DecompressionStream
- **AND** original text is restored and displayed

#### Scenario: Browser support detection
- **WHEN** user loads the Compression Streams demo
- **THEN** support badge shows ✅ if `'CompressionStream' in window`
- **AND** support badge shows ❌ if not supported
