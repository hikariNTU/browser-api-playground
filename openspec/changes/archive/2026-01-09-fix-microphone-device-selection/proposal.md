# Fix Microphone Device Selection

## Problem Statement

The microphone dropdown in preview components shows available devices but **does not actually use the selected device** when starting audio capture:

1. **WebSpeechPreview**: The `listen()` function ignores `selectedMic` state - SpeechRecognition starts without passing the selected audio device
2. **MediaRecorderPreview**: Correctly uses `selectedDevice` when calling `getUserMedia()` ✓
3. **WebRTCPreview**: Camera selection works, but no microphone selection option exists

The Web Speech API (SpeechRecognition) doesn't directly support device selection. The workaround is to:
1. First acquire audio stream via `getUserMedia()` with the selected device
2. Use that stream's audio track with recognition (where supported)

## Proposed Solution

### 1. WebSpeechPreview - Use Selected Microphone

Modify the `listen()` function to:
- First acquire audio stream with `getUserMedia({ audio: { deviceId: selectedMic } })`
- The SpeechRecognition API will use the system's active audio input
- Note: SpeechRecognition doesn't support custom audio streams in most browsers, so we acquire the stream to "activate" that device as the system input before starting recognition

### 2. WebRTCPreview - Add Microphone Selection

Add microphone device enumeration and selection dropdown alongside the existing camera selection.

### 3. Consistent Device Selection Pattern

Ensure all audio preview components follow the same pattern:
- Enumerate devices on mount (request permission first to get labels)
- Show dropdown with device labels
- Actually use the selected device when capturing

## Scope

- **In Scope**: WebSpeechPreview, WebRTCPreview microphone selection
- **Out of Scope**: AudioContextPreview (output only, no mic input)

## Success Criteria

1. WebSpeechPreview uses the selected microphone when starting recognition
2. WebRTCPreview has microphone dropdown alongside camera dropdown
3. Selected device is actually used when capturing audio
