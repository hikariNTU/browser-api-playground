import type { ApiDemo } from './types'
import defaultCode from './code/gamepad.js?raw'
import defaultHtml from './code/gamepad.html?raw'
import { GamepadPreview } from '@/components/previews'

export const gamepadDemo: ApiDemo = {
  id: 'gamepad',
  name: 'Gamepad API',
  description: 'Read input from game controllers and joysticks.',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API',
  checkSupport: () => 'getGamepads' in navigator,
  supportCheck: "'getGamepads' in navigator",
  compatKey: 'api.Gamepad',
  defaultCode,
  defaultHtml,
  PreviewComponent: GamepadPreview,
  relatedApis: ['device-experimental'],
  examples: [
    {
      id: 'controller-input',
      title: 'Controller Input',
      description: 'Read buttons, axes, and vibration from connected gamepads',
      code: defaultCode,
      html: defaultHtml,
    },
  ],
}
