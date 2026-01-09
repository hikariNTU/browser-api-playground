# Spec: Preview URL State Management

## ADDED Requirements

### Requirement: URL State Persistence
Preview components SHALL persist user-configurable state in URL query parameters so that configurations survive page refresh and can be shared via URL.

#### Scenario: Text input persists across refresh
Given the user is on the Web Speech preview
When they enter "Hello world" in the text field
Then the URL updates to include `?text=Hello%20world`
And when they refresh the page
Then the text field contains "Hello world"

#### Scenario: Device selection persists across refresh
Given the user is on the Media Recorder preview
When they select "MacBook Pro Microphone" from the dropdown
Then the URL updates to include `?device=<deviceId>`
And when they refresh the page
Then "MacBook Pro Microphone" is selected in the dropdown

#### Scenario: Numeric input persists across refresh
Given the user is on the AudioContext preview
When they set frequency to 880 Hz
Then the URL updates to include `?freq=880`
And when they refresh the page
Then the frequency slider shows 880 Hz

#### Scenario: Boolean option persists across refresh
Given the user is on the WebRTC preview
When they check "Include audio in capture"
Then the URL updates to include `?audio=true`
And when they refresh the page
Then the checkbox is checked

#### Scenario: Enum selection persists across refresh
Given the user is on the Compression Streams preview
When they select "deflate" format
Then the URL updates to include `?format=deflate`
And when they refresh the page
Then "deflate" is selected in the format dropdown

### Requirement: Shareable Configuration URLs
Users MUST be able to copy a URL with query parameters and share it with others to reproduce the same preview configuration.

#### Scenario: Shared URL loads with preset configuration
Given a user receives the URL `/api/web-speech?text=Test%20message&voice=Samantha`
When they open the URL in their browser
Then the text field contains "Test message"
And the voice dropdown shows "Samantha" (if available)

#### Scenario: Invalid device ID falls back gracefully
Given a user opens a URL with `?mic=invalid-device-id`
When the preview component loads
And the device ID is not found in enumerated devices
Then the component selects the first available device
And the URL updates to reflect the actual selection

### Requirement: Ephemeral State Remains Local
Runtime and transient state MUST NOT be persisted in URL.

#### Scenario: Playback state is not in URL
Given the user is on the AudioContext preview
When they click "Play Tone"
Then the URL does NOT include any playing state
And `isPlaying` remains a local React state

#### Scenario: Recording state is not in URL
Given the user is on the Media Recorder preview
When they click "Record"
Then the URL does NOT include recording state
And `isRecording` remains a local React state

#### Scenario: Streams and blobs are not in URL
Given the user has recorded audio in Media Recorder preview
When the recording completes
Then the audio URL blob reference is NOT in the URL
And `audioUrl` remains a local React state
