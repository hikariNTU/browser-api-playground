import type { ApiDemo } from './types'
import defaultCode from './code/eyedropper.js?raw'
import defaultHtml from './code/eyedropper.html?raw'
import example2Code from './code/eyedropper-ex2.js?raw'
import example2Html from './code/eyedropper-ex2.html?raw'
import example3Code from './code/eyedropper-ex3.js?raw'
import { EyeDropperPreview } from '@/components/previews'

export const eyedropperDemo: ApiDemo = {
  id: 'eyedropper',
  name: 'EyeDropper API',
  description: 'Pick any color from the screen using a native color picker tool.',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/EyeDropper_API',
  checkSupport: () => 'EyeDropper' in window,
  supportCheck: "'EyeDropper' in window",
  compatKey: 'api.EyeDropper',
  defaultCode,
  defaultHtml,
  PreviewComponent: EyeDropperPreview,
  examples: [
    {
      id: 'pick-color',
      title: 'Pick Color',
      description: 'Pick any color from the screen',
      code: defaultCode,
      html: defaultHtml,
    },
    {
      id: 'build-palette',
      title: 'Build a Palette',
      description: 'Pick multiple colors to build a palette',
      code: example2Code,
      html: example2Html,
    },
    {
      id: 'with-abort-controller',
      title: 'With AbortController',
      description: 'Cancel color picking with timeout',
      code: example3Code,
    },
  ],
}
