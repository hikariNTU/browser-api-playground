import type { ApiDemo } from './types'
import defaultCode from './code/web-serial.js?raw'
import example1Code from './code/web-serial-ex1.js?raw'
import example2Code from './code/web-serial-ex2.js?raw'
import example3Code from './code/web-serial-ex3.js?raw'
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
    {
      id: 'basic-connection',
      title: 'Basic Connection',
      description: 'Connect to a serial device',
      code: example1Code,
    },
    {
      id: 'send-data',
      title: 'Send Data',
      description: 'Write data to serial port',
      code: example2Code,
    },
    {
      id: 'list-ports',
      title: 'List Authorized Ports',
      description: 'Get previously authorized serial ports',
      code: example3Code,
    },
  ],
}
