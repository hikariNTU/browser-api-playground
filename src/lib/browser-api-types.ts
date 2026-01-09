/**
 * Type definitions for experimental browser APIs not yet in TypeScript's lib.dom.d.ts
 * These are injected into Monaco Editor via addExtraLib() to suppress type errors
 */
export const experimentalBrowserAPITypes = `
// EyeDropper API
interface ColorSelectionResult {
  sRGBHex: string;
}

interface EyeDropperOpenOptions {
  signal?: AbortSignal;
}

declare class EyeDropper {
  constructor();
  open(options?: EyeDropperOpenOptions): Promise<ColorSelectionResult>;
}

// Window Management API
interface ScreenDetailed extends Screen {
  availLeft: number;
  availTop: number;
  left: number;
  top: number;
  isPrimary: boolean;
  isInternal: boolean;
  devicePixelRatio: number;
  label: string;
}

interface ScreenDetails {
  screens: ScreenDetailed[];
  currentScreen: ScreenDetailed;
  addEventListener(type: 'screenschange' | 'currentscreenchange', listener: EventListener): void;
  removeEventListener(type: 'screenschange' | 'currentscreenchange', listener: EventListener): void;
}

interface Window {
  getScreenDetails(): Promise<ScreenDetails>;
}

// Idle Detection API
type UserIdleState = 'active' | 'idle';
type ScreenIdleState = 'locked' | 'unlocked';

declare class IdleDetector extends EventTarget {
  constructor();
  readonly userState: UserIdleState | null;
  readonly screenState: ScreenIdleState | null;
  onchange: ((this: IdleDetector, ev: Event) => any) | null;
  start(options?: { threshold?: number; signal?: AbortSignal }): Promise<void>;
  static requestPermission(): Promise<PermissionState>;
}

// Compute Pressure API
type PressureSource = 'cpu';
type PressureState = 'nominal' | 'fair' | 'serious' | 'critical';

interface PressureRecord {
  source: PressureSource;
  state: PressureState;
  time: DOMHighResTimeStamp;
}

type PressureUpdateCallback = (changes: PressureRecord[], observer: PressureObserver) => void;

declare class PressureObserver {
  constructor(callback: PressureUpdateCallback);
  observe(source: PressureSource, options?: { sampleInterval?: number }): Promise<void>;
  unobserve(source: PressureSource): void;
  disconnect(): void;
  takeRecords(): PressureRecord[];
  static supportedSources: readonly PressureSource[];
}

// Local Font Access API
interface FontData {
  family: string;
  fullName: string;
  postscriptName: string;
  style: string;
  blob(): Promise<Blob>;
}

interface QueryLocalFontsOptions {
  postscriptNames?: string[];
}

interface Window {
  queryLocalFonts(options?: QueryLocalFontsOptions): Promise<FontData[]>;
}

// Battery Status API
interface BatteryManager extends EventTarget {
  readonly charging: boolean;
  readonly chargingTime: number;
  readonly dischargingTime: number;
  readonly level: number;
  onchargingchange: ((this: BatteryManager, ev: Event) => any) | null;
  onchargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
  ondischargingtimechange: ((this: BatteryManager, ev: Event) => any) | null;
  onlevelchange: ((this: BatteryManager, ev: Event) => any) | null;
}

interface Navigator {
  getBattery(): Promise<BatteryManager>;
}

// Network Information API
type ConnectionType = 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown';
type EffectiveConnectionType = 'slow-2g' | '2g' | '3g' | '4g';

interface NetworkInformation extends EventTarget {
  readonly type?: ConnectionType;
  readonly effectiveType?: EffectiveConnectionType;
  readonly downlink?: number;
  readonly downlinkMax?: number;
  readonly rtt?: number;
  readonly saveData?: boolean;
  onchange: ((this: NetworkInformation, ev: Event) => any) | null;
}

interface Navigator {
  readonly connection?: NetworkInformation;
}

// Web Serial API
interface SerialPortInfo {
  usbVendorId?: number;
  usbProductId?: number;
}

interface SerialOptions {
  baudRate: number;
  dataBits?: 7 | 8;
  stopBits?: 1 | 2;
  parity?: 'none' | 'even' | 'odd';
  bufferSize?: number;
  flowControl?: 'none' | 'hardware';
}

interface SerialPort extends EventTarget {
  readonly readable: ReadableStream<Uint8Array> | null;
  readonly writable: WritableStream<Uint8Array> | null;
  getInfo(): SerialPortInfo;
  open(options: SerialOptions): Promise<void>;
  close(): Promise<void>;
}

interface Serial extends EventTarget {
  getPorts(): Promise<SerialPort[]>;
  requestPort(options?: { filters?: SerialPortInfo[] }): Promise<SerialPort>;
}

interface Navigator {
  readonly serial?: Serial;
}

// Screen Wake Lock API
interface WakeLockSentinel extends EventTarget {
  readonly released: boolean;
  readonly type: 'screen';
  release(): Promise<void>;
  onrelease: ((this: WakeLockSentinel, ev: Event) => any) | null;
}

interface WakeLock {
  request(type: 'screen'): Promise<WakeLockSentinel>;
}

interface Navigator {
  readonly wakeLock?: WakeLock;
}

// File System Access API additions
interface FileSystemWritableFileStream extends WritableStream {
  write(data: BufferSource | Blob | string | { type: 'write' | 'seek' | 'truncate'; data?: BufferSource | Blob | string; position?: number; size?: number }): Promise<void>;
  seek(position: number): Promise<void>;
  truncate(size: number): Promise<void>;
}

interface FileSystemFileHandle {
  createWritable(options?: { keepExistingData?: boolean }): Promise<FileSystemWritableFileStream>;
}

interface Window {
  showOpenFilePicker(options?: {
    multiple?: boolean;
    excludeAcceptAllOption?: boolean;
    types?: { description?: string; accept: Record<string, string[]> }[];
  }): Promise<FileSystemFileHandle[]>;
  showSaveFilePicker(options?: {
    excludeAcceptAllOption?: boolean;
    suggestedName?: string;
    types?: { description?: string; accept: Record<string, string[]> }[];
  }): Promise<FileSystemFileHandle>;
  showDirectoryPicker(options?: { mode?: 'read' | 'readwrite' }): Promise<FileSystemDirectoryHandle>;
}

// Gamepad extensions
interface GamepadHapticActuator {
  type: 'vibration' | 'dual-rumble';
  playEffect(type: string, params?: { duration?: number; startDelay?: number; strongMagnitude?: number; weakMagnitude?: number }): Promise<string>;
  reset(): Promise<string>;
}

interface Gamepad {
  readonly vibrationActuator?: GamepadHapticActuator;
}

// WebCodecs API (partial)
interface VideoFrame {
  readonly format: string | null;
  readonly codedWidth: number;
  readonly codedHeight: number;
  readonly displayWidth: number;
  readonly displayHeight: number;
  readonly duration: number | null;
  readonly timestamp: number;
  close(): void;
}

declare var VideoFrame: {
  new(source: CanvasImageSource | VideoFrame, init?: { timestamp?: number; duration?: number }): VideoFrame;
};

// View Transitions API
interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
  skipTransition(): void;
}

interface Document {
  startViewTransition(callback?: () => Promise<void> | void): ViewTransition;
}
`;
