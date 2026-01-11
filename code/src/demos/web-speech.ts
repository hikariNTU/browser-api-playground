import type { ApiDemo } from './types'
import defaultCode from './code/web-speech.js?raw'
import defaultHtml from './code/web-speech.html?raw'
import example1Code from './code/web-speech-ex1.js?raw'
import example1Html from './code/web-speech-ex1.html?raw'
import example2Code from './code/web-speech-ex2.js?raw'
import example2Html from './code/web-speech-ex2.html?raw'
import example3Code from './code/web-speech-ex3.js?raw'
import example3Html from './code/web-speech-ex3.html?raw'
import { WebSpeechPreview } from '@/components/previews'

export const webSpeechDemo: ApiDemo = {
  id: 'web-speech',
  name: 'Web Speech API',
  description: 'Text-to-speech synthesis and speech recognition (voice-to-text).',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API',
  checkSupport: () =>
    'speechSynthesis' in window ||
    'SpeechRecognition' in window ||
    'webkitSpeechRecognition' in window,
  supportCheck:
    "'speechSynthesis' in window || 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window",
  compatKey: 'api.SpeechSynthesis',
  defaultCode,
  defaultHtml,
  PreviewComponent: WebSpeechPreview,
  relatedApis: ['audiocontext', 'media-recorder'],
  examples: [
    {
      id: 'quick-start',
      title: 'Quick Start',
      description: 'Simple text-to-speech synthesis',
      code: defaultCode,
      html: defaultHtml,
    },
    {
      id: 'voice-selection',
      title: 'Voice Selection',
      description: 'Choose different voices and adjust pitch/rate',
      code: example1Code,
      html: example1Html,
    },
    {
      id: 'speech-recognition',
      title: 'Speech Recognition',
      description: 'Voice-to-text transcription (ASR/STT)',
      code: example2Code,
      html: example2Html,
    },
    {
      id: 'continuous-recognition',
      title: 'Continuous Recognition',
      description: 'Real-time transcription with interim results',
      code: example3Code,
      html: example3Html,
    },
  ],
}
