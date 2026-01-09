# Change: Add MediaRecorder API Demo with Real-time Waveform Visualization

## Why
The MediaRecorder API is a fundamental browser capability for audio/video recording. Combined with the Web Audio API's AnalyserNode, it enables real-time audio visualization—a compelling demo that showcases both recording and Canvas-based visualization.

## What Changes
1. **New demo file** - Add `src/demos/media-recorder.ts` with MediaRecorder API demo definition
2. **Code snippets** - Add external code files for default example and additional examples
3. **Canvas visualization** - Include real-time waveform and frequency bar visualization using Canvas 2D API
4. **HTML templates** - Add HTML templates for examples with interactive controls (record button, canvas element)
5. **Demo index** - Export new demo from `src/demos/index.ts`

## Demo Examples
- **Default**: Basic microphone recording with playback
- **Example 1**: Real-time waveform visualization (oscilloscope-style)
- **Example 2**: Real-time frequency bars (spectrum analyzer)
- **Example 3**: Recording with download capability

## Impact
- Affected specs: None (no existing specs)
- Affected code: `src/demos/index.ts`, new files in `src/demos/` and `src/demos/code/`
