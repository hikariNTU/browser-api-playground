/**
 * Additional browser APIs not demoed in the playground.
 * Each entry includes MDN link and compat key for browser support lookup.
 */
export interface AppendixApi {
  name: string
  description: string
  mdnUrl: string
  compatKey: string
}

export const appendixApis: AppendixApi[] = [
  // Storage APIs
  {
    name: 'IndexedDB',
    description: 'Low-level API for client-side storage of structured data.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API',
    compatKey: 'api.IDBFactory',
  },
  {
    name: 'Cache API',
    description: 'Store and retrieve network requests and responses.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Cache',
    compatKey: 'api.Cache',
  },
  {
    name: 'Storage API',
    description: 'Manage persistent storage and quota estimates.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Storage_API',
    compatKey: 'api.StorageManager',
  },
  
  // Network APIs
  {
    name: 'WebSocket',
    description: 'Full-duplex communication channel over TCP.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSocket',
    compatKey: 'api.WebSocket',
  },
  {
    name: 'Beacon API',
    description: 'Reliable background data sending when page unloads.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API',
    compatKey: 'api.Navigator.sendBeacon',
  },
  {
    name: 'Fetch API',
    description: 'Modern interface for fetching resources.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
    compatKey: 'api.fetch',
  },
  
  // Graphics APIs
  {
    name: 'Canvas API',
    description: '2D drawing and graphics manipulation.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API',
    compatKey: 'api.CanvasRenderingContext2D',
  },
  {
    name: 'WebGL',
    description: '3D graphics rendering using OpenGL ES.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API',
    compatKey: 'api.WebGLRenderingContext',
  },
  {
    name: 'WebGPU',
    description: 'Next-generation graphics and compute API.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API',
    compatKey: 'api.GPU',
  },
  
  // Worker APIs
  {
    name: 'Web Workers',
    description: 'Run scripts in background threads.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API',
    compatKey: 'api.Worker',
  },
  {
    name: 'Service Workers',
    description: 'Offline-first and push notifications.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API',
    compatKey: 'api.ServiceWorker',
  },
  
  // Media APIs
  {
    name: 'Picture-in-Picture',
    description: 'Floating video window overlay.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API',
    compatKey: 'api.PictureInPictureWindow',
  },
  {
    name: 'Media Session API',
    description: 'Customize media notifications and controls.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API',
    compatKey: 'api.MediaSession',
  },
  {
    name: 'Screen Capture',
    description: 'Capture screen content for sharing.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API',
    compatKey: 'api.MediaDevices.getDisplayMedia',
  },
  {
    name: 'Web MIDI',
    description: 'Access MIDI musical instruments.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API',
    compatKey: 'api.MIDIAccess',
  },
  
  // Security APIs
  {
    name: 'Web Crypto',
    description: 'Cryptographic operations in the browser.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API',
    compatKey: 'api.Crypto',
  },
  {
    name: 'Web Authentication',
    description: 'Passwordless authentication with biometrics.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API',
    compatKey: 'api.CredentialsContainer.create',
  },
  {
    name: 'Permissions API',
    description: 'Query and request permission status.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API',
    compatKey: 'api.Permissions',
  },
  
  // UI APIs
  {
    name: 'Notifications API',
    description: 'Display system notifications.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API',
    compatKey: 'api.Notification',
  },
  {
    name: 'Fullscreen API',
    description: 'Display content in fullscreen mode.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API',
    compatKey: 'api.Document.fullscreenElement',
  },
  {
    name: 'Clipboard API',
    description: 'Read and write to the clipboard.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API',
    compatKey: 'api.Clipboard',
  },
  {
    name: 'Pointer Lock',
    description: 'Capture mouse for games and 3D apps.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API',
    compatKey: 'api.Element.requestPointerLock',
  },
  
  // Observer APIs
  {
    name: 'Intersection Observer',
    description: 'Observe element visibility changes.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API',
    compatKey: 'api.IntersectionObserver',
  },
  {
    name: 'Resize Observer',
    description: 'Observe element size changes.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API',
    compatKey: 'api.ResizeObserver',
  },
  {
    name: 'Mutation Observer',
    description: 'Observe DOM tree changes.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver',
    compatKey: 'api.MutationObserver',
  },
  
  // Other APIs
  {
    name: 'Performance API',
    description: 'Measure timing and performance metrics.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Performance_API',
    compatKey: 'api.Performance',
  },
  {
    name: 'Broadcast Channel',
    description: 'Cross-tab messaging.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API',
    compatKey: 'api.BroadcastChannel',
  },
  {
    name: 'Web NFC',
    description: 'Near-field communication for tags.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_NFC_API',
    compatKey: 'api.NDEFReader',
  },
  {
    name: 'Web HID',
    description: 'Access human interface devices.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API',
    compatKey: 'api.HID',
  },
  {
    name: 'Web USB',
    description: 'Access USB devices from the browser.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/WebUSB_API',
    compatKey: 'api.USB',
  },
  {
    name: 'Web Bluetooth',
    description: 'Connect to Bluetooth devices.',
    mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API',
    compatKey: 'api.Bluetooth',
  },
]
