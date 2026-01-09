import type { ApiDemo, DemoExample } from './types'
import { eyedropperDemo } from './eyedropper'
import { webShareDemo } from './web-share'
import { screenWakeLockDemo } from './screen-wake-lock'
import { windowManagementDemo } from './window-management'
import { webSerialDemo } from './web-serial'
import { gamepadDemo } from './gamepad'
import { viewTransitionsDemo } from './view-transitions'
import { webrtcWebcodecsDemo } from './webrtc-webcodecs'
import { audioContextDemo } from './audiocontext'
import { fileSystemAccessDemo } from './file-system-access'
import { compressionStreamsDemo } from './compression-streams'
import { mediaRecorderDemo } from './media-recorder'
import { webSpeechDemo } from './web-speech'
import { deviceExperimentalDemo } from './device-experimental'

export type { ApiDemo, DemoExample, ExecutionResult, ConsoleMessage } from './types'

export const demos: ApiDemo[] = [
  webSpeechDemo,
  audioContextDemo,
  gamepadDemo,
  eyedropperDemo,
  windowManagementDemo,
  compressionStreamsDemo,
  mediaRecorderDemo,
  webrtcWebcodecsDemo,
  webShareDemo,
  screenWakeLockDemo,
  webSerialDemo,
  viewTransitionsDemo,
  fileSystemAccessDemo,
  deviceExperimentalDemo,
]

export function getDemoById(id: string): ApiDemo | undefined {
  return demos.find((demo) => demo.id === id)
}

export function getExampleById(
  apiId: string,
  exampleId: string
): { demo: ApiDemo; example: DemoExample } | undefined {
  const demo = getDemoById(apiId)
  if (!demo) return undefined

  const example = demo.examples?.find((ex) => ex.id === exampleId)
  if (!example) return undefined

  return { demo, example }
}
