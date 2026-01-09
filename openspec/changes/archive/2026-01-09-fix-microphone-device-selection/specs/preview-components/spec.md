# Spec: Preview Components - Microphone Device Selection

## MODIFIED Requirements

### Requirement: WebSpeechPreview must use selected microphone for recognition

The WebSpeechPreview component SHALL acquire an audio stream from the user-selected microphone device before starting speech recognition. The component MUST use the selected device ID when calling getUserMedia.

#### Scenario: User selects non-default microphone and starts recognition
- **Given** the user has multiple microphones connected
- **And** the user selects a non-default microphone from the dropdown
- **When** the user clicks "Listen"
- **Then** the component acquires an audio stream from the selected device
- **And** speech recognition uses input from that device
- **And** the stream tracks are stopped when recognition ends

#### Scenario: User has only one microphone
- **Given** the user has only one microphone connected
- **When** the user clicks "Listen"  
- **Then** recognition uses the default audio input
- **And** the microphone dropdown is still shown (with one option)

---

### Requirement: WebRTCPreview must support microphone device selection

The WebRTCPreview component SHALL enumerate and allow selection of audio input devices alongside video devices. The component MUST include a microphone dropdown in the UI.

#### Scenario: User selects camera and microphone
- **Given** the user has multiple cameras and microphones
- **When** the component mounts
- **Then** both camera and microphone dropdowns are displayed
- **And** each dropdown lists available devices with labels

#### Scenario: User starts camera with selected microphone
- **Given** the user has selected a specific camera and microphone
- **When** the user clicks "Start Camera"
- **Then** getUserMedia is called with both video and audio device constraints
- **And** the video preview shows feed from selected camera
- **And** audio is captured from selected microphone

---

## ADDED Requirements

### Requirement: Preview components must enumerate devices on mount

Preview components SHALL enumerate available audio devices when the component mounts. The component MUST show the device dropdown before the user initiates any audio capture, allowing pre-selection.

#### Scenario: Component mounts with microphone support
- **Given** the browser supports getUserMedia
- **When** the component mounts
- **Then** the component requests brief permission to enumerate devices
- **And** the microphone dropdown is populated with available devices
- **And** the user can select a device before clicking any action button

#### Scenario: User pre-selects microphone then starts capture
- **Given** the microphone dropdown shows available devices
- **And** the user selects their preferred microphone
- **When** the user clicks "Listen" or "Record"
- **Then** the selected device is used for capture
- **And** no additional device selection prompt appears

---

### Requirement: Preview components must request permission before enumerating devices

Preview components SHALL request media permission before calling `enumerateDevices()` to obtain device labels. The permission request MUST be brief and immediately released.

#### Scenario: First-time device enumeration
- **Given** the user has not granted microphone permission
- **When** the component mounts and needs to enumerate devices
- **Then** a brief getUserMedia request is made and immediately released
- **And** device labels are populated in the dropdown
- **And** no persistent stream is held

---

### Requirement: Audio streams must be cleaned up when not in use

Preview components SHALL stop all audio stream tracks when capture ends. The component MUST release resources on unmount.

#### Scenario: Recognition ends normally
- **Given** speech recognition is active with an acquired stream
- **When** recognition ends (onend event)
- **Then** all stream tracks are stopped
- **And** no audio resources are held

#### Scenario: Component unmounts during recognition
- **Given** speech recognition is active
- **When** the component unmounts
- **Then** recognition is aborted
- **And** all stream tracks are stopped
