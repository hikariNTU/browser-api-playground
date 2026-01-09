# Tasks

## Task Group 1: Setup

- [x] **1.1** Install nuqs package: `npm install nuqs`
- [x] **1.2** Add `NuqsAdapter` to `__root.tsx` wrapping the `Outlet`

## Task Group 2: WebSpeechPreview Migration

- [x] **2.1** Replace `text` useState with `useQueryState('text', parseAsString.withDefault(...))`
- [x] **2.2** Replace `selectedVoice` with `useQueryState('voice', parseAsString.withDefault(''))`
- [x] **2.3** Replace `selectedMic` with `useQueryState('mic', parseAsString.withDefault(''))`
- [x] **2.4** Remove ref sync boilerplate (`textRef`, `selectedVoiceRef`, `selectedMicRef` and their useEffects)
- [x] **2.5** Update handlers to use nuqs state directly instead of refs

## Task Group 3: AudioContextPreview Migration

- [x] **3.1** Replace `frequency` useState with `useQueryState('freq', parseAsInteger.withDefault(440))`
- [x] **3.2** Remove `frequencyRef` and its sync useEffect
- [x] **3.3** Update `play()` to use nuqs state directly

## Task Group 4: CompressionStreamsPreview Migration

- [x] **4.1** Replace `input` useState with `useQueryState('input', parseAsString.withDefault(...))`
- [x] **4.2** Replace `format` useState with `useQueryState('format', parseAsStringLiteral([...]).withDefault('gzip'))`

## Task Group 5: WebRTCPreview Migration

- [x] **5.1** Replace `selectedCamera` with `useQueryState('camera', parseAsString.withDefault(''))`
- [x] **5.2** Replace `selectedMic` with `useQueryState('mic', parseAsString.withDefault(''))`
- [x] **5.3** Replace `includeAudio` with `useQueryState('audio', parseAsBoolean.withDefault(false))`
- [x] **5.4** Remove ref sync boilerplate
- [x] **5.5** Update `startCamera()` to use nuqs state directly

## Task Group 6: MediaRecorderPreview Migration

- [x] **6.1** Replace `selectedDevice` with `useQueryState('device', parseAsString.withDefault(''))`
- [x] **6.2** Remove `selectedDeviceRef` and its sync useEffect
- [x] **6.3** Update `startRecording()` to use nuqs state directly

## Task Group 7: Validation

- [x] **7.1** Verify build passes with `npm run build`
- [ ] **7.2** Test each preview: change state, refresh page, verify state persists
- [ ] **7.3** Test URL sharing: copy URL with query params, open in new tab

## Dependencies

- Task Group 1 must complete before Groups 2-6
- Groups 2-6 can be done in parallel
- Group 7 depends on all previous groups

## Notes

- Keep ephemeral state (`mode`, `isPlaying`, `stream`, etc.) as useState
- Keep device lists (`voices`, `microphones`, `cameras`) as useState (they're browser-specific)
- Device ID defaults to empty string; components should handle this by selecting first enumerated device
