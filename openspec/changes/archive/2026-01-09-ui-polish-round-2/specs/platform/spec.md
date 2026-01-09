## ADDED Requirements

### Requirement: Fullscreen Toggle
The system SHALL provide a fullscreen toggle button in the sidebar footer to enter/exit browser fullscreen mode.

#### Scenario: User enters fullscreen
- **WHEN** user clicks the fullscreen button
- **THEN** the browser enters fullscreen mode
- **AND** the button icon changes to indicate exit fullscreen

#### Scenario: User exits fullscreen
- **WHEN** user clicks the fullscreen button while in fullscreen mode
- **THEN** the browser exits fullscreen mode
- **AND** the button icon changes to indicate enter fullscreen

#### Scenario: Fullscreen exited via Escape key
- **WHEN** user presses Escape while in fullscreen mode
- **THEN** the button state syncs to reflect non-fullscreen mode

### Requirement: Auto-run on Example Load
The system SHALL automatically execute code when a user loads an example from the examples drawer.

#### Scenario: User loads example
- **WHEN** user clicks "Load Example" button in examples drawer
- **AND** the API is supported
- **THEN** the code is loaded into the editor
- **AND** the code executes automatically
- **AND** output appears in the preview and console panels

#### Scenario: User loads example for unsupported API
- **WHEN** user clicks "Load Example" for an unsupported API
- **THEN** the code is loaded but not executed

## MODIFIED Requirements

### Requirement: Support Check Tooltip
The system SHALL display a tooltip on the support badge showing how to check API availability, with proper contrast for readability.

#### Scenario: User hovers support badge in header
- **WHEN** user hovers over the Supported/Not Supported badge
- **THEN** a tooltip displays showing the check code snippet
- **AND** the code is readable with proper foreground/background contrast

#### Scenario: User hovers collapsed navbar item
- **WHEN** sidebar is collapsed
- **AND** user hovers over a demo item
- **THEN** tooltip shows demo name and support check code
- **AND** code snippet has proper contrast

### Requirement: Collapsed Navbar Item Display
The system SHALL display collapsed navbar items as rounded square tiles with initials and a floating support indicator badge.

#### Scenario: Supported API in collapsed navbar
- **WHEN** sidebar is collapsed
- **AND** API is supported
- **THEN** a rounded square tile displays with 2-letter initials
- **AND** a small checkmark badge floats on the top-right corner

#### Scenario: Unsupported API in collapsed navbar  
- **WHEN** sidebar is collapsed
- **AND** API is not supported
- **THEN** a rounded square tile displays with 2-letter initials
- **AND** a small X badge floats on the top-right corner
