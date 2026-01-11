import type { ApiDemo } from './types'
import defaultCode from './code/view-transitions.js?raw'
import example1Code from './code/view-transitions-ex1.js?raw'
import example1Html from './code/view-transitions-ex1.html?raw'
import example2Code from './code/view-transitions-ex2.js?raw'
import example2Html from './code/view-transitions-ex2.html?raw'
import example3Code from './code/view-transitions-ex3.js?raw'
import example3Html from './code/view-transitions-ex3.html?raw'
import { ViewTransitionsPreview } from '@/components/previews'

export const viewTransitionsDemo: ApiDemo = {
  id: 'view-transitions',
  name: 'View Transitions API',
  description: 'Create smooth animated transitions between DOM states.',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API',
  checkSupport: () => 'startViewTransition' in document,
  supportCheck: "'startViewTransition' in document",
  compatKey: 'api.Document.startViewTransition',
  defaultCode,
  PreviewComponent: ViewTransitionsPreview,
  examples: [
    {
      id: 'card-animation',
      title: 'Card Animation',
      description: 'Smooth DOM transitions between states',
      code: defaultCode,
    },
    {
      id: 'basic-transition',
      title: 'Basic Transition',
      description: 'Simple content swap with animation',
      code: example1Code,
      html: example1Html,
    },
    {
      id: 'custom-duration',
      title: 'Custom Animation Duration',
      description: 'Control transition timing with CSS',
      code: example2Code,
      html: example2Html,
    },
    {
      id: 'named-transitions',
      title: 'Named Transitions',
      description: 'Animate specific elements independently',
      code: example3Code,
      html: example3Html,
    },
  ],
}
