# related-apis Specification Delta

## Purpose
Display related API suggestions at the bottom of each demo intro page to help users discover similar APIs.

## ADDED Requirements

### Requirement: Related APIs Data Field
The system SHALL support an optional `relatedApis` field on each API demo definition containing an array of related demo IDs.

#### Scenario: Demo with related APIs
- **GIVEN** a demo definition includes `relatedApis: ['audiocontext', 'webrtc-webcodecs']`
- **WHEN** the demo data is accessed
- **THEN** the relatedApis field contains valid demo IDs that can be resolved via `getDemoById()`

#### Scenario: Demo without related APIs
- **GIVEN** a demo definition does not include `relatedApis` or has an empty array
- **WHEN** the demo data is accessed
- **THEN** no related APIs are available for display

---

### Requirement: Related APIs Section on Intro Page
The system SHALL display a "Related APIs" section at the bottom of API intro pages when the demo has related APIs defined.

#### Scenario: User views intro page with related APIs
- **WHEN** user navigates to an API intro page (e.g., `/api/media-recorder`)
- **AND** the demo has `relatedApis` defined with valid references
- **THEN** a "Related APIs" section appears after the Examples grid
- **AND** each related API is displayed as a clickable card with name and description
- **AND** clicking a card navigates to that API's intro page

#### Scenario: User views intro page without related APIs
- **WHEN** user navigates to an API intro page
- **AND** the demo has no `relatedApis` or all references are invalid
- **THEN** no "Related APIs" section is displayed

#### Scenario: Related API reference is invalid
- **WHEN** a demo's `relatedApis` contains an ID that doesn't exist
- **THEN** that invalid reference is silently filtered out
- **AND** only valid related APIs are displayed
