# Proposal: Integrate nuqs for URL-Based State Management

## Problem Statement

Preview components currently store user inputs and device selections in React's `useState`. This means:
- User selections are lost on page refresh
- Users cannot share a specific configuration via URL
- Switching between API pages and returning loses previous state

## Affected Components

State that should be URL-persisted:

| Component | State to Persist |
|-----------|------------------|
| `web-speech-preview` | `text`, `selectedVoice`, `selectedMic` |
| `audiocontext-preview` | `frequency` |
| `compression-streams-preview` | `input`, `format` |
| `webrtc-preview` | `selectedCamera`, `selectedMic`, `includeAudio` |
| `media-recorder-preview` | `selectedDevice` |

State that should NOT be persisted (ephemeral/runtime):
- `mode`, `isPlaying`, `isRecording` - transient UI state
- `stream`, `audioUrl`, `transcript` - runtime artifacts
- `voices`, `microphones`, `cameras`, `devices` - enumerated device lists (browser-dependent)

## Solution

Integrate **nuqs** library with TanStack Router adapter to manage URL query string state.

### Why nuqs?
- First-class TanStack Router adapter
- Type-safe parsers for strings, numbers, booleans
- Automatic serialization/deserialization
- Shallow routing (no full page reload)
- Works with existing TanStack Router setup

## Scope

1. Install nuqs and configure TanStack Router adapter
2. Create shared parsers for common patterns (device selection, text input)
3. Migrate eligible state from `useState` to `useQueryState`/`useQueryStates`
4. Remove redundant refs (nuqs state is already stable across renders)

## Out of Scope

- Example code files (vanilla JS) - these don't use React hooks
- Persisting runtime state like active streams or recordings

## Dependencies

- nuqs ^2.8.0
- Existing TanStack Router setup
