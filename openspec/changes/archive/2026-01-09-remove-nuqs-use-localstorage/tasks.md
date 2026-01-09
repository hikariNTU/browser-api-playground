# Tasks

## Task Group 1: Create Device Preference Hook

- [x] **1.1** Create `src/hooks/use-device-preference.ts` with `useDevicePreference` hook
- [x] **1.2** Hook reads/writes to localStorage with keys `preferredCamera`, `preferredMicrophone`
- [x] **1.3** Hook returns `[value, setValue]` tuple matching useState API

## Task Group 2: Remove nuqs from Root

- [x] **2.1** Remove `NuqsAdapter` import and wrapper from `__root.tsx`

## Task Group 3: Migrate WebRTCPreview

- [x] **3.1** Replace `useQueryState` imports with `useState` and `useDevicePreference`
- [x] **3.2** Replace camera state with `useDevicePreference('preferredCamera')`
- [x] **3.3** Replace mic state with `useDevicePreference('preferredMicrophone')`
- [x] **3.4** Replace includeAudio with plain `useState(false)`

## Task Group 4: Migrate MediaRecorderPreview

- [x] **4.1** Replace `useQueryState` import with `useState` and `useDevicePreference`
- [x] **4.2** Replace selectedDevice with `useDevicePreference('preferredMicrophone')`

## Task Group 5: Migrate WebSpeechPreview

- [x] **5.1** Replace `useQueryState` imports with `useState` and `useDevicePreference`
- [x] **5.2** Replace text state with plain `useState` (default value)
- [x] **5.3** Replace selectedVoice with plain `useState('')`
- [x] **5.4** Replace selectedMic with `useDevicePreference('preferredMicrophone')`

## Task Group 6: Migrate AudioContextPreview

- [x] **6.1** Replace `useQueryState` import with `useState`
- [x] **6.2** Replace frequency state with plain `useState(440)`

## Task Group 7: Migrate CompressionStreamsPreview

- [x] **7.1** Replace `useQueryState` imports with `useState`
- [x] **7.2** Replace input state with plain `useState` (default value)
- [x] **7.3** Replace format state with plain `useState('gzip')`

## Task Group 8: Cleanup

- [x] **8.1** Run `npm uninstall nuqs` to remove the package
- [x] **8.2** Run `npm run build` to verify no nuqs imports remain
- [x] **8.3** Delete `openspec/specs/preview-url-state/` directory

## Dependencies

- Task Group 1 must complete before Groups 3-5 (they use the hook)
- Task Group 2 can run in parallel with Group 1
- Groups 3-7 can be done in parallel
- Task Group 8 depends on all previous groups
