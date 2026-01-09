# Spec Delta: Web Speech API Demo

## Summary

New demo showcasing the Web Speech API including:
- **Speech Synthesis (TTS)**: Text-to-speech functionality with voice selection
- **Speech Recognition (ASR/STT)**: Voice-to-text transcription

## Demo Structure

### src/demos/web-speech.ts

```typescript
import { Demo } from "@/types";
import defaultCode from "./code/web-speech.js?raw";
import defaultHtml from "./code/web-speech.html?raw";
import ex1Code from "./code/web-speech-ex1.js?raw";
import ex1Html from "./code/web-speech-ex1.html?raw";
import ex2Code from "./code/web-speech-ex2.js?raw";
import ex2Html from "./code/web-speech-ex2.html?raw";
import ex3Code from "./code/web-speech-ex3.js?raw";
import ex3Html from "./code/web-speech-ex3.html?raw";

export const webSpeechDemo: Demo = {
  id: "web-speech",
  title: "Web Speech API",
  description: "Text-to-speech synthesis and speech recognition (voice-to-text)",
  supportCheck: "'speechSynthesis' in window || 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window",
  defaultCode,
  defaultHtml,
  examples: [
    { title: "Voice Selection", code: ex1Code, html: ex1Html },
    { title: "Speech Recognition", code: ex2Code, html: ex2Html },
    { title: "Continuous Recognition", code: ex3Code, html: ex3Html },
  ],
  references: [
    { title: "MDN: Web Speech API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API" },
    { title: "MDN: SpeechSynthesis", url: "https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis" },
    { title: "MDN: SpeechRecognition", url: "https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition" },
  ],
};
```

### Example Content

**Default (web-speech.js)**: Basic TTS - enter text, click speak button  
**Example 1**: Voice selection dropdown, pitch/rate sliders  
**Example 2**: Speech recognition (ASR) - click mic button, speak, see transcript  
**Example 3**: Continuous recognition with interim results displayed in real-time

### Registration

Add to `src/demos/index.ts`:
```typescript
import { webSpeechDemo } from "./web-speech";
// In demos array:
webSpeechDemo,
```

## Browser Support

- **Speech Synthesis**: Widely supported (Chrome, Firefox, Safari, Edge)
- **Speech Recognition**: Chrome/Edge with prefix (`webkitSpeechRecognition`), limited in Firefox
