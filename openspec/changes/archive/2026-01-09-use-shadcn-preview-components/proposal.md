# Proposal: Migrate Preview Components to shadcn/ui

## Why

Preview components currently use raw HTML elements (`<input>`, `<textarea>`, `<select>`, `<label>`) with inline Tailwind classes. This creates:
1. **Inconsistent styling** - Each component reinvents styling for form controls
2. **Accessibility gaps** - Native elements lack proper ARIA attributes
3. **Maintenance burden** - Styling scattered across components
4. **Theme inconsistency** - Manual dark mode handling instead of shadcn theming

The platform spec requires "all buttons, cards, and inputs use shadcn/ui primitives."

## What Changes

Replace self-crafted form elements with shadcn/ui components across all preview components:

| Current Element | Replace With | Affected Components |
|-----------------|-------------|---------------------|
| `<input type="range">` | `Slider` | AudioContextPreview |
| `<textarea>` | `Textarea` | CompressionStreamsPreview, WebSpeechPreview |
| `<select>` | `Select` | WebRTCPreview, MediaRecorderPreview, WebSpeechPreview |
| `<input type="radio">` | `RadioGroup` | CompressionStreamsPreview |
| `<input type="checkbox">` | `Checkbox` | WebRTCPreview |
| `<label>` | `Label` | All preview components |

## Affected Components

- `audiocontext-preview.tsx` - Slider for frequency
- `compression-streams-preview.tsx` - Textarea for input, RadioGroup for format
- `webrtc-preview.tsx` - Select for camera/mic, Checkbox for audio toggle
- `media-recorder-preview.tsx` - Select for microphone
- `web-speech-preview.tsx` - Textarea for text, Select for voice/mic

## Out of Scope

- Preview components that only use Button (already using shadcn)
- Structural components like Card (previews embedded in larger layout)
- Canvas-based visualizations
