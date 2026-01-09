# Design: Fix Microphone Device Selection

## Technical Background

### The Problem

The Web Speech API's `SpeechRecognition` interface does not provide a way to specify which audio input device to use. It uses the system's default/active audio input.

### Browser Behavior

1. **getUserMedia device selection**: When you call `getUserMedia({ audio: { deviceId: { exact: deviceId } } })`, the browser activates that specific device
2. **System audio routing**: On most systems, acquiring a stream from a specific device makes it the "active" input
3. **SpeechRecognition**: Uses whatever the system considers the active audio input

### Solution Approach

```
┌─────────────────────────────────────────────────────────────┐
│                    WebSpeechPreview                         │
├─────────────────────────────────────────────────────────────┤
│  1. User selects microphone from dropdown                   │
│  2. User clicks "Listen"                                    │
│  3. acquire stream = getUserMedia({ audio: { deviceId } })  │
│  4. Start SpeechRecognition (uses active device)           │
│  5. On recognition end → stop stream tracks                 │
└─────────────────────────────────────────────────────────────┘
```

## Implementation Patterns

### Pattern: Device Enumeration with Permission

```typescript
// Request permission first to get device labels
async function enumerateDevices() {
  try {
    // Brief permission request to unlock labels
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    stream.getTracks().forEach(t => t.stop())
    
    // Now enumerate with labels
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices.filter(d => d.kind === 'audioinput')
  } catch (err) {
    console.error('Permission denied')
    return []
  }
}
```

### Pattern: Use Selected Device

```typescript
// Acquire stream with specific device before using audio APIs
const stream = await navigator.mediaDevices.getUserMedia({
  audio: selectedDeviceId 
    ? { deviceId: { exact: selectedDeviceId } } 
    : true
})
```

## Component Changes

### WebSpeechPreview

| Current | Proposed |
|---------|----------|
| Enumerates devices but doesn't use selection | Acquires stream with selected device before recognition |
| `listen()` ignores `selectedMic` | `listen()` calls getUserMedia first |
| No cleanup | Stops stream tracks on recognition end |

### WebRTCPreview

| Current | Proposed |
|---------|----------|
| Camera selection only | Camera + microphone selection |
| Video-only getUserMedia | Video + audio getUserMedia |
| No audio device state | Add `microphones`, `selectedMic` state |

## Trade-offs

### Approach Chosen: Pre-acquire Stream

**Pros:**
- Works across browsers
- Minimal code change
- Follows existing MediaRecorderPreview pattern

**Cons:**
- Brief permission prompt on first use
- Small delay before recognition starts
- Stream must be cleaned up

### Alternative Considered: AudioContext Routing

Could route getUserMedia stream through AudioContext to MediaStreamDestination, but:
- More complex
- SpeechRecognition still wouldn't use it
- Overkill for this use case

## References

- [MediaDevices.getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
- Existing implementation: `MediaRecorderPreview` (correct pattern)
