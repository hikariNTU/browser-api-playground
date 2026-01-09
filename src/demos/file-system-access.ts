import type { ApiDemo } from './types'
import defaultCode from './code/file-system-access.js?raw'
import { FileSystemAccessPreview } from '@/components/previews'

export const fileSystemAccessDemo: ApiDemo = {
  id: 'file-system-access',
  name: 'File System Access API',
  description: 'Read and write files directly from the browser (Chrome/Edge only).',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API',
  checkSupport: () => 'showOpenFilePicker' in window,
  supportCheck: "'showOpenFilePicker' in window",
  compatKey: 'api.Window.showOpenFilePicker',
  defaultCode,
  PreviewComponent: FileSystemAccessPreview,
  examples: [
    {
      id: 'read-write-files',
      title: 'Read & Write Files',
      description: 'Open, edit, and save files directly to the file system',
      code: defaultCode,
    },
  ],
}
