# Tasks

## Task Group 1: WebSpeechPreview Fix

- [x] **1.1** Request permission and enumerate devices on mount (show dropdown before user action)
- [x] **1.2** Update `listen()` function to acquire audio stream with selected device before starting recognition
- [x] **1.3** Clean up stream tracks when recognition ends

## Task Group 2: WebRTCPreview Enhancement  

- [x] **2.1** Add microphone state: `microphones`, `selectedMic`
- [x] **2.2** Enumerate audio input devices on mount alongside video devices
- [x] **2.3** Add microphone dropdown UI below camera dropdown (visible before starting)
- [x] **2.4** Update `getUserMedia` to include selected audio device

## Task Group 3: Example Code Updates

- [x] **3.1** Update web-speech examples to show mic dropdown before use
- [x] **3.2** Update media-recorder examples to enumerate devices on load (already implemented)
- [x] **3.3** Ensure all mic-using examples follow the "enumerate first" pattern

## Task Group 4: Validation

- [ ] **4.1** Test WebSpeechPreview with multiple microphones
- [ ] **4.2** Test WebRTCPreview camera + microphone selection
- [ ] **4.3** Verify example code works with device selection
- [x] **4.4** Verify build passes

## Dependencies

- Task Group 2 depends on Task Group 1 patterns
- Task Group 3 depends on 1 and 2

## Notes

- SpeechRecognition API doesn't accept custom audio streams in most browsers
- Workaround: acquiring a getUserMedia stream with specific device "activates" that device for system audio input
- MediaRecorderPreview already implements correct pattern - use as reference
