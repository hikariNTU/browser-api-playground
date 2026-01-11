import type { ApiDemo } from './types'
import defaultCode from './code/webrtc-webcodecs.js?raw'
import example2Code from './code/webrtc-webcodecs-ex2.js?raw'
import { WebRTCPreview } from '@/components/previews'

export const webrtcWebcodecsDemo: ApiDemo = {
  id: 'webrtc-webcodecs',
  name: 'WebRTC & WebCodecs',
  description: 'Access camera/microphone and encode/decode video.',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API',
  checkSupport: () =>
    'mediaDevices' in navigator &&
    'getUserMedia' in navigator.mediaDevices &&
    'VideoEncoder' in window,
  supportCheck: "'mediaDevices' in navigator && 'VideoEncoder' in window",
  compatKey: 'api.MediaDevices.getUserMedia',
  defaultCode,
  PreviewComponent: WebRTCPreview,
  relatedApis: ['media-recorder', 'window-management'],
  examples: [
    {
      id: 'encode-decode',
      title: 'Encode & Decode',
      description: 'Full video encode → decode pipeline with stats',
      code: defaultCode,
    },
    {
      id: 'device-selector',
      title: 'Device Selector',
      description: 'Enumerate and select cameras/microphones with UI',
      code: example2Code,
    },
  ],
}
