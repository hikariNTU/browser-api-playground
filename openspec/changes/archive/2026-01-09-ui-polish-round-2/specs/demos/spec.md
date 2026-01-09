## MODIFIED Requirements

### Requirement: Window Management API Demo
The system SHALL provide a Window Management API demo that properly handles transient activation requirements for permission requests.

#### Scenario: User runs default Window Management code
- **WHEN** user runs the Window Management demo default code
- **THEN** the output shows a button to request screen info
- **AND** clicking the button triggers the permission request
- **AND** screen information displays on success

#### Scenario: User runs List All Screens example
- **WHEN** user loads and runs the List All Screens example
- **THEN** a button is displayed to trigger the API call
- **AND** user clicking the button requests permission
- **AND** screen list displays on success

#### Scenario: User runs Fullscreen on Specific Screen example
- **WHEN** user loads and runs the Fullscreen example
- **THEN** a button is displayed to trigger the API call
- **AND** user can select a screen and go fullscreen

#### Scenario: User runs Monitor Screen Changes example
- **WHEN** user loads and runs the Monitor Screen Changes example
- **THEN** a button is displayed to start monitoring
- **AND** screen change events are logged to console
