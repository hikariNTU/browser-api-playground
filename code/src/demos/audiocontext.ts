import type { ApiDemo } from './types'
import defaultCode from './code/audiocontext.js?raw'
import example1Code from './code/audiocontext-ex1.js?raw'
import example2Code from './code/audiocontext-ex2.js?raw'
import example2Html from './code/audiocontext-ex2.html?raw'
import example3Code from './code/audiocontext-ex3.js?raw'
import example4Code from './code/audiocontext-ex4.js?raw'
import example4Html from './code/audiocontext-ex4.html?raw'
import { AudioContextPreview } from '@/components/previews'

export const audioContextDemo: ApiDemo = {
  id: 'audiocontext',
  name: 'AudioContext API',
  description: 'Create and manipulate audio using the Web Audio API.',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/AudioContext',
  checkSupport: () => 'AudioContext' in window,
  supportCheck: "'AudioContext' in window",
  compatKey: 'api.AudioContext',
  defaultCode,
  PreviewComponent: AudioContextPreview,
  examples: [
    {
      id: 'tone-generator',
      title: 'Tone Generator',
      description: 'Interactive buttons to play different tones',
      code: defaultCode,
    },
    {
      id: 'simple-beep',
      title: 'Simple Beep',
      description: 'Play a basic beep sound',
      code: example1Code,
    },
    {
      id: 'waveform-types',
      title: 'Waveform Types',
      description: 'Interactive waveform buttons',
      code: example2Code,
      html: example2Html,
    },
    {
      id: 'frequency-sweep',
      title: 'Frequency Sweep',
      description: 'Sweep through frequencies',
      code: example3Code,
    },
    {
      id: 'node-editor',
      title: 'Node Editor',
      description: 'Visual node graph for audio connections',
      code: example4Code,
      html: example4Html,
    },
  ],
}
