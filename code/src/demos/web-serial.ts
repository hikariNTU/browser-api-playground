import type { ApiDemo } from './types'
import defaultCode from './code/web-serial.js?raw'
import { WebSerialPreview } from '@/components/previews'

export const webSerialDemo: ApiDemo = {
  id: 'web-serial',
  name: 'Web Serial API',
  description: 'Connect to serial devices like Arduino, ESP32, or other hardware.',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API',
  checkSupport: () => 'serial' in navigator,
  supportCheck: "'serial' in navigator",
  compatKey: 'api.Navigator.serial',
  defaultCode,
  PreviewComponent: WebSerialPreview,
  examples: [
    {
      id: 'connect-read',
      title: 'Connect & Read',
      description: 'Connect to serial devices and read data',
      code: defaultCode,
    },
  ],
}
