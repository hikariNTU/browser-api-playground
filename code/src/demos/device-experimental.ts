import type { ApiDemo } from './types'
import defaultCode from './code/device-experimental.js?raw'
import defaultHtml from './code/device-experimental.html?raw'
import example1Code from './code/device-experimental-ex1.js?raw'
import example1Html from './code/device-experimental-ex1.html?raw'
import example2Code from './code/device-experimental-ex2.js?raw'
import example2Html from './code/device-experimental-ex2.html?raw'
import example3Code from './code/device-experimental-ex3.js?raw'
import example3Html from './code/device-experimental-ex3.html?raw'
import example4Code from './code/device-experimental-ex4.js?raw'
import example4Html from './code/device-experimental-ex4.html?raw'
import example5Code from './code/device-experimental-ex5.js?raw'
import example5Html from './code/device-experimental-ex5.html?raw'
import { DeviceExperimentalPreview } from '@/components/previews'

export const deviceExperimentalDemo: ApiDemo = {
  id: 'device-experimental',
  name: 'Device & Experimental APIs',
  description: 'Geolocation, sensors, battery, network info, and experimental APIs.',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API',
  checkSupport: () => 'geolocation' in navigator || 'getBattery' in navigator,
  supportCheck: "'geolocation' in navigator || 'getBattery' in navigator",
  compatKey: 'api.Geolocation',
  defaultCode,
  defaultHtml,
  PreviewComponent: DeviceExperimentalPreview,
  relatedApis: ['gamepad', 'web-serial'],
  examples: [
    {
      id: 'api-support',
      title: 'API Support',
      description: 'Feature detection overview of device APIs',
      code: defaultCode,
      html: defaultHtml,
    },
    {
      id: 'location-orientation',
      title: 'Location & Orientation',
      description: 'Geolocation and Device Orientation APIs',
      code: example1Code,
      html: example1Html,
    },
    {
      id: 'battery-network',
      title: 'Battery & Network',
      description: 'Battery Status and Network Information APIs',
      code: example2Code,
      html: example2Html,
    },
    {
      id: 'idle-pressure',
      title: 'Idle & Pressure',
      description: 'Idle Detection and Compute Pressure APIs',
      code: example3Code,
      html: example3Html,
    },
    {
      id: 'local-fonts',
      title: 'Local Fonts',
      description: 'Enumerate locally installed fonts',
      code: example4Code,
      html: example4Html,
    },
    {
      id: 'screen-capture',
      title: 'Screen Capture',
      description: 'Capture screen, window, or tab',
      code: example5Code,
      html: example5Html,
    },
  ],
}
