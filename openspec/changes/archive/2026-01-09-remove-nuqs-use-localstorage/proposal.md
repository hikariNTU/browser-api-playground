# Proposal: Remove nuqs and Use localStorage for Device Preferences

## Why

The nuqs integration for URL-based state management has introduced bugs and added complexity without commensurate value:

1. **URL clutter** - Long device IDs and encoded text strings make URLs unwieldy
2. **Limited utility** - Sharing URLs with device-specific settings doesn't work across machines (device IDs differ)
3. **Complexity** - Extra dependency and adapter boilerplate in `__root.tsx`
4. **Bugs encountered** - Issues with state synchronization (per user feedback)

Device preferences (camera, microphone) are inherently local to a machine and benefit more from localStorage persistence than URL sharing.

## What Changes

1. **Remove nuqs** - Uninstall package, remove NuqsAdapter from `__root.tsx`
2. **Revert to useState** - Replace `useQueryState` with regular `useState` in all preview components
3. **Add localStorage for device preferences** - Create a `useDevicePreference` hook that persists camera/microphone selections
4. **Remove preview-url-state spec** - This capability is being removed

## Affected Components

| Component | Current State | New Approach |
|-----------|---------------|--------------|
| `__root.tsx` | NuqsAdapter wrapper | Remove wrapper |
| `webrtc-preview.tsx` | `useQueryState` for camera, mic, audio | `useState` + `useDevicePreference` |
| `media-recorder-preview.tsx` | `useQueryState` for device | `useState` + `useDevicePreference` |
| `web-speech-preview.tsx` | `useQueryState` for text, voice, mic | `useState` + `useDevicePreference` for mic only |
| `audiocontext-preview.tsx` | `useQueryState` for frequency | `useState` (no persistence needed) |
| `compression-streams-preview.tsx` | `useQueryState` for input, format | `useState` (no persistence needed) |

## Device Preferences to Persist

Only device selections benefit from localStorage:
- `preferredCamera` - Video input device ID
- `preferredMicrophone` - Audio input device ID

Other state (text input, frequency, format) reverts to defaults on page load - this is acceptable UX.

## Out of Scope

- Any new persistence mechanism beyond simple localStorage
- Syncing preferences across browsers/devices
