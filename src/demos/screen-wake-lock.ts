import type { ApiDemo } from './types'
import defaultCode from './code/screen-wake-lock.js?raw'
import example1Code from './code/screen-wake-lock-ex1.js?raw'
import example2Code from './code/screen-wake-lock-ex2.js?raw'
import example3Code from './code/screen-wake-lock-ex3.js?raw'
import example3Html from './code/screen-wake-lock-ex3.html?raw'
import { ScreenWakeLockPreview } from '@/components/previews'

export const screenWakeLockDemo: ApiDemo = {
  id: 'screen-wake-lock',
  name: 'Screen Wake Lock API',
  description: 'Prevent the screen from dimming or locking.',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API',
  checkSupport: () => 'wakeLock' in navigator,
  supportCheck: "'wakeLock' in navigator",
  compatKey: 'api.WakeLock',
  defaultCode,
  PreviewComponent: ScreenWakeLockPreview,
  examples: [
    {
      id: 'keep-screen-on',
      title: 'Keep Screen On',
      description: 'Toggle button to keep the screen awake',
      code: defaultCode,
    },
    {
      id: 'basic-wake-lock',
      title: 'Basic Wake Lock',
      description: 'Simple request and release',
      code: example1Code,
    },
    {
      id: 'visibility-change',
      title: 'Handle Visibility Change',
      description: 'Re-acquire wake lock when page becomes visible',
      code: example2Code,
    },
    {
      id: 'toggle-wake-lock',
      title: 'Toggle Wake Lock',
      description: 'Button to toggle wake lock on/off',
      code: example3Code,
      html: example3Html,
    },
  ],
}
