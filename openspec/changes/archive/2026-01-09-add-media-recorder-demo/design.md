## Context
Adding a MediaRecorder API demo to showcase audio recording and real-time visualization capabilities. This combines multiple Web APIs: MediaRecorder, getUserMedia, Web Audio API (AnalyserNode), and Canvas 2D.

## Goals / Non-Goals
**Goals:**
- Demonstrate MediaRecorder API for audio recording
- Show real-time audio visualization using Canvas 2D and Web Audio AnalyserNode
- Provide interactive examples users can run immediately
- Follow existing demo patterns in the codebase

**Non-Goals:**
- Video recording (out of scope for initial demo)
- WebGPU visualization (Canvas 2D is simpler and sufficient)
- Complex audio processing or effects

## Decisions

### Decision: Use Canvas 2D over WebGPU
Canvas 2D API provides sufficient performance for audio visualization and is universally supported. WebGPU would add unnecessary complexity without meaningful benefit for this use case.

### Decision: Use AnalyserNode for real-time data
The Web Audio API's `AnalyserNode` provides:
- `getByteTimeDomainData()` - Waveform data (oscilloscope)
- `getByteFrequencyData()` - Frequency data (spectrum)

This is the standard approach for real-time audio visualization in browsers.

### Decision: Separate examples for each visualization type
Rather than one complex example, provide focused examples:
1. Basic recording/playback (core API)
2. Waveform visualization (time domain)
3. Frequency bars (frequency domain)
4. Recording with download

### Decision: requestAnimationFrame for rendering
Use `requestAnimationFrame` loop for smooth 60fps visualization that automatically pauses when tab is inactive.

## Architecture

```
getUserMedia() → MediaStream
                    ↓
    ┌───────────────┼───────────────┐
    ↓               ↓               ↓
MediaRecorder   AudioContext    Canvas 2D
(recording)    → AnalyserNode  → requestAnimationFrame
                    ↓           → draw waveform/bars
               getByteData()
```

## Risks / Trade-offs
- **Microphone permission**: User must grant permission; handle denial gracefully
- **Browser compatibility**: MediaRecorder is widely supported but check Safari quirks
- **Audio codec**: Use `audio/webm` with fallback to `audio/mp4` for Safari

## Open Questions
- None
