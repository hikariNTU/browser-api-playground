import type { ApiDemo } from './types'
import defaultCode from './code/broadcast-channel.js?raw'
import defaultHtml from './code/broadcast-channel.html?raw'
import { BroadcastChannelPreview } from '@/components/previews'

export const broadcastChannelDemo: ApiDemo = {
  id: 'broadcast-channel',
  name: 'Broadcast Channel API',
  description: 'Send and receive messages between browser tabs on the same origin.',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API',
  checkSupport: () => 'BroadcastChannel' in window,
  supportCheck: "'BroadcastChannel' in window",
  compatKey: 'api.BroadcastChannel',
  defaultCode,
  defaultHtml,
  PreviewComponent: BroadcastChannelPreview,
  relatedApis: ['web-share'],
  examples: [
    {
      id: 'cross-tab-chat',
      title: 'Cross-Tab Chat',
      description: 'Send messages between browser tabs in real-time',
      code: defaultCode,
      html: defaultHtml,
    },
  ],
}
