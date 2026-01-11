import type { ApiDemo } from './types'
import defaultCode from './code/window-management.js?raw'
import defaultHtml from './code/window-management.html?raw'
import example1Code from './code/window-management-ex1.js?raw'
import example1Html from './code/window-management-ex1.html?raw'
import example2Code from './code/window-management-ex2.js?raw'
import example2Html from './code/window-management-ex2.html?raw'
import example3Code from './code/window-management-ex3.js?raw'
import example3Html from './code/window-management-ex3.html?raw'
import { WindowManagementPreview } from '@/components/previews'

export const windowManagementDemo: ApiDemo = {
  id: 'window-management',
  name: 'Window Management API',
  description: 'Query screens and place windows on specific displays.',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Window_Management_API',
  checkSupport: () => 'getScreenDetails' in window,
  supportCheck: "'getScreenDetails' in window",
  compatKey: 'api.Window.getScreenDetails',
  defaultCode,
  defaultHtml,
  PreviewComponent: WindowManagementPreview,
  examples: [
    {
      id: 'screen-layout',
      title: 'Screen Layout',
      description: 'Visual diagram of screen positions and sizes',
      code: defaultCode,
      html: defaultHtml,
    },
    {
      id: 'list-all-screens',
      title: 'List All Screens',
      description: 'Get basic info about all connected screens',
      code: example1Code,
      html: example1Html,
    },
    {
      id: 'fullscreen-specific-screen',
      title: 'Fullscreen on Specific Screen',
      description: 'Open fullscreen on a secondary display',
      code: example2Code,
      html: example2Html,
    },
    {
      id: 'monitor-screen-changes',
      title: 'Monitor Screen Changes',
      description: 'React when screens are connected/disconnected',
      code: example3Code,
      html: example3Html,
    },
  ],
}
