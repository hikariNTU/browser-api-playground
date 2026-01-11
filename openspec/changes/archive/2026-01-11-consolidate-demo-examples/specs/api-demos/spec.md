## ADDED Requirements

### Requirement: Broadcast Channel API Demo
The system SHALL provide an interactive demo for the Broadcast Channel API allowing users to send and receive messages across browser tabs.

#### Scenario: User sends message to other tabs
- **WHEN** user types a message and clicks "Send"
- **THEN** message is broadcast to all other tabs on the same origin
- **AND** console shows "Message sent: {content}"

#### Scenario: User receives message from other tab
- **WHEN** another tab sends a message on the same channel
- **THEN** message appears in the current tab's message list
- **AND** console shows "Message received: {content}"

#### Scenario: User sees connection status
- **WHEN** demo is running
- **THEN** UI shows the channel name being used
- **AND** visual indicator shows messages are being received

#### Scenario: No user gesture required
- **WHEN** user loads the demo page
- **THEN** channel is automatically connected (no permission prompt)
- **AND** demo is immediately functional

---

## MODIFIED Requirements

### Requirement: Curated Examples Per API
The system SHALL provide curated code examples per API demo, accessible via an examples dropdown. Each example SHALL be a functional, standalone demo with appropriate UI elements.

#### Scenario: User opens examples dropdown
- **WHEN** user clicks "Examples" button on any API page
- **THEN** dropdown shows available examples
- **AND** each example has title and description
- **AND** all listed examples are functional standalone demos

#### Scenario: User loads example
- **WHEN** user clicks on an example
- **THEN** editor content is replaced with example code
- **AND** code is ready to run without modification
- **AND** any required HTML elements are loaded

#### Scenario: Example quality standards
- **WHEN** an example is added to a demo
- **THEN** the example SHALL have sufficient UI for user interaction (if applicable)
- **AND** the example SHALL demonstrate a distinct use case not already covered
- **AND** snippet-only examples (under 20 lines with no UI) SHALL NOT be included

---

### Requirement: Web Serial API Demo
The system SHALL provide an interactive demo for the Web Serial API with a single comprehensive example.

#### Scenario: User connects to serial port
- **WHEN** user runs code to request serial port
- **AND** selects a device from browser prompt
- **THEN** output shows connection status and port info

#### Scenario: User sends/receives data
- **WHEN** user runs code to write bytes to serial port
- **THEN** output displays sent data
- **AND** any received data appears in terminal-style view

---

### Requirement: Screen Wake Lock API Demo
The system SHALL provide an interactive demo for the Screen Wake Lock API with three focused examples.

#### Scenario: User acquires wake lock (default)
- **WHEN** user runs the default toggle example
- **THEN** output shows wake lock status with visual indicator
- **AND** user can toggle lock on/off

#### Scenario: User handles visibility change
- **WHEN** user runs the visibility handler example
- **AND** page becomes hidden then visible again
- **THEN** wake lock is automatically re-acquired

#### Scenario: User toggles wake lock with button
- **WHEN** user runs the toggle example
- **THEN** button reflects current lock state
- **AND** clicking toggles the lock

---

### Requirement: EyeDropper API Demo
The system SHALL provide an interactive demo for the EyeDropper API with three focused examples.

#### Scenario: User picks color successfully (default)
- **WHEN** user runs the default EyeDropper code
- **AND** clicks on screen to select a color
- **THEN** output panel displays the selected color as hex value
- **AND** a color swatch preview is rendered

#### Scenario: User builds color palette
- **WHEN** user runs the palette builder example
- **THEN** user can pick multiple colors to build a palette
- **AND** swatches are displayed for each picked color

#### Scenario: User cancels with timeout
- **WHEN** user runs the abort controller example
- **AND** does not pick a color within timeout
- **THEN** picker is automatically cancelled
