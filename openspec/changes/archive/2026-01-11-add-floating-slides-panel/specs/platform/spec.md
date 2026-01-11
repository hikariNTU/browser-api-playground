# platform Specification Delta

## ADDED Requirements

### Requirement: Global Keyboard Shortcuts
The system SHALL provide global keyboard shortcuts accessible from any page in the application.

#### Scenario: User toggles slides panel
- **WHEN** user presses `Cmd/Ctrl + /` from any page
- **THEN** the slides panel visibility is toggled
- **AND** focus moves to the panel when opened

#### Scenario: Shortcut does not interfere with input fields
- **WHEN** user is focused on an input field or Monaco editor
- **AND** user presses a global shortcut
- **THEN** the shortcut is NOT triggered (allows normal typing)
