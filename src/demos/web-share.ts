import type { ApiDemo } from './types'
import defaultCode from './code/web-share.js?raw'
import { WebSharePreview } from '@/components/previews'

export const webShareDemo: ApiDemo = {
  id: 'web-share',
  name: 'Web Share API',
  description: 'Trigger the native OS share dialog to share content.',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API',
  checkSupport: () => 'share' in navigator,
  supportCheck: "'share' in navigator",
  compatKey: 'api.Navigator.share',
  defaultCode,
  PreviewComponent: WebSharePreview,
  examples: [
    {
      id: 'share-page',
      title: 'Share This Page',
      description: 'Open the native share dialog to share URLs, text, and files',
      code: defaultCode,
    },
  ],
}
