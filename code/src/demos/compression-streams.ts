import type { ApiDemo } from './types'
import defaultCode from './code/compression-streams.js?raw'
import defaultHtml from './code/compression-streams.html?raw'
import { CompressionStreamsPreview } from '@/components/previews'

export const compressionStreamsDemo: ApiDemo = {
  id: 'compression-streams',
  name: 'Compression Streams API',
  description: 'Compress and decompress data using gzip or deflate in the browser.',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API',
  checkSupport: () => 'CompressionStream' in window,
  supportCheck: "'CompressionStream' in window",
  compatKey: 'api.CompressionStream',
  defaultCode,
  defaultHtml,
  PreviewComponent: CompressionStreamsPreview,
  relatedApis: ['file-system-access'],
  examples: [
    {
      id: 'compress-decompress',
      title: 'Compress & Decompress',
      description: 'Compress and decompress text data with format comparison',
      code: defaultCode,
      html: defaultHtml,
    },
  ],
}
