# preview-url-state Specification

## Purpose
Define how preview components manage state without URL persistence and with local-only device preference storage.

## ADDED Requirements

### Requirement: Preview state stays local
The system SHALL keep preview UI state (inputs, sliders, toggles) in client memory only; refreshing the page resets these values to their defaults.

#### Scenario: Text input resets on reload
- **GIVEN** the user enters custom text in a preview
- **WHEN** they reload the page
- **THEN** the preview renders with the default text value

### Requirement: Device preferences persist in localStorage
The system SHALL persist selected camera and microphone device IDs in localStorage and reuse them on subsequent visits when those devices remain available.

#### Scenario: Microphone preference restored
- **GIVEN** the user selects Microphone B
- **WHEN** they revisit the preview
- **THEN** Microphone B is preselected if it is still available; otherwise the default device is used

### Requirement: URLs exclude preview state
The system SHALL omit preview state and device preferences from shared URLs.

#### Scenario: Shared URL opens with defaults
- **GIVEN** a user shares a preview URL after selecting custom devices
- **WHEN** another user opens the URL
- **THEN** the preview loads with that user's own defaults and any locally stored device preferences, without reading shared state from the URL
