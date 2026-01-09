# Design: nuqs Integration

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    __root.tsx                                │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                 NuqsAdapter                              │ │
│  │  ┌─────────────────────────────────────────────────────┐ │ │
│  │  │                  Outlet                             │ │ │
│  │  │    ┌──────────────────────────────────────────────┐ │ │ │
│  │  │    │          Preview Components                  │ │ │ │
│  │  │    │   useQueryState('text', parseAsString)       │ │ │ │
│  │  │    │   useQueryState('mic', parseAsString)        │ │ │ │
│  │  │    └──────────────────────────────────────────────┘ │ │ │
│  │  └─────────────────────────────────────────────────────┘ │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## nuqs Parser Strategy

### Device ID Parser
Device IDs can be:
- `"default"` - browser default device
- A long hash like `"7b163a2a839310082ed6202c62f6b062c012462681bfbf589582b46a658cf9aa"`

Use `parseAsString` with `.withDefault('')` - empty string means "not yet selected, use first enumerated device".

### Text Input Parser
Use `parseAsString.withDefault('...')` with appropriate default text per component.

### Numeric Parser
For `frequency` in AudioContext, use `parseAsInteger.withDefault(440)`.

### Boolean Parser
For `includeAudio` checkbox, use `parseAsBoolean.withDefault(false)`.

### Format Enum Parser
For compression format, use `parseAsStringLiteral(['gzip', 'deflate', 'deflate-raw']).withDefault('gzip')`.

## URL Structure

Example URLs after implementation:
```
/api/web-speech?text=Hello%20world&voice=Samantha&mic=default
/api/audiocontext?freq=880
/api/compression-streams?format=deflate&input=Test%20data
/api/webrtc?cam=default&mic=7b163...&audio=true
/api/media-recorder?device=default
```

## Migration Pattern

### Before (useState + ref sync)
```tsx
const [selectedMic, setSelectedMic] = useState<string>('')
const selectedMicRef = useRef<string>('')
useEffect(() => { selectedMicRef.current = selectedMic }, [selectedMic])

// In handler:
const deviceId = selectedMicRef.current
```

### After (nuqs)
```tsx
const [selectedMic, setSelectedMic] = useQueryState('mic', parseAsString.withDefault(''))

// In handler - no ref needed, nuqs state is stable
const deviceId = selectedMic
```

**Key benefit**: nuqs returns stable setter references, eliminating need for ref synchronization pattern.

## Trade-offs

### Pros
- URL-shareable configurations
- State survives page refresh
- Simpler code (no ref sync boilerplate)
- Type-safe with TypeScript

### Cons
- URL can get long with text inputs (consider URL encoding)
- Device IDs in URL are user-unfriendly (but functional)
- Small bundle size increase (~5KB gzipped)

## URL Key Naming

Use short, readable keys to keep URLs manageable:

| State | URL Key |
|-------|---------|
| `text` | `text` |
| `selectedVoice` | `voice` |
| `selectedMic` | `mic` |
| `selectedCamera` | `cam` |
| `selectedDevice` | `device` |
| `frequency` | `freq` |
| `format` | `format` |
| `includeAudio` | `audio` |
| `input` | `input` |

## Component-Specific Considerations

### WebSpeechPreview
- `text` can be long - consider max length or truncation warning
- `voice` should store voice name (not the entire voice object)
- `mic` stores deviceId

### AudioContextPreview
- `freq` is simple integer, clamp to valid range (100-2000)

### CompressionStreamsPreview
- `input` text could be very long - may need URL length consideration
- `format` is a simple enum

### WebRTCPreview
- Both `cam` and `mic` store deviceIds
- `audio` is boolean checkbox

### MediaRecorderPreview
- Single `device` for microphone selection
