import type { ApiDemo } from './types'
import defaultCode from './code/media-recorder.js?raw'
import defaultHtml from './code/media-recorder.html?raw'
import example3Code from './code/media-recorder-ex3.js?raw'
import example3Html from './code/media-recorder-ex3.html?raw'
import example4Code from './code/media-recorder-ex4.js?raw'
import example4Html from './code/media-recorder-ex4.html?raw'
import { MediaRecorderPreview } from '@/components/previews'

export const mediaRecorderDemo: ApiDemo = {
  id: 'media-recorder',
  name: 'MediaRecorder API',
  description: 'Record audio from the microphone with real-time visualization.',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder',
  checkSupport: () => 'MediaRecorder' in window && 'getUserMedia' in navigator.mediaDevices,
  supportCheck: "'MediaRecorder' in window",
  compatKey: 'api.MediaRecorder',
  defaultCode,
  defaultHtml,
  PreviewComponent: MediaRecorderPreview,
  relatedApis: ['audiocontext', 'webrtc-webcodecs'],
  examples: [
    {
      id: 'basic-recorder',
      title: 'Basic Recorder',
      description: 'Record and playback audio with device selection',
      code: defaultCode,
      html: defaultHtml,
    },
    {
      id: 'audio-visualizer',
      title: 'Audio Visualizer',
      description: 'Real-time waveform/spectrum with toggle',
      code: example4Code,
      html: example4Html,
    },
    {
      id: 'record-download',
      title: 'Record & Download',
      description: 'Record audio and download as a file',
      code: example3Code,
      html: example3Html,
    },
  ],
}
