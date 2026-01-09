# Platform Spec Delta

## ADDED Requirements

### Requirement: Fixed Layout Positioning
The system SHALL prevent overscroll bounce effects from moving the navbar and header.

#### Scenario: Overscroll on iOS Safari
- **GIVEN** user is on iOS Safari
- **WHEN** user scrolls beyond content boundaries
- **THEN** navbar and sidebar remain fixed in position
- **AND** only content area shows overscroll effect

### Requirement: QR Code URL Sharing
The system SHALL provide QR code sharing functionality for the current page URL.

#### Scenario: Share via QR code
- **GIVEN** user is viewing any API demo
- **WHEN** user clicks the QR share button
- **THEN** a popover displays with a QR code of the current URL
- **AND** a "Copy URL" button is available

#### Scenario: QR button location
- **GIVEN** sidebar is in any state (expanded or collapsed)
- **WHEN** user views the footer area
- **THEN** QR share button appears horizontally adjacent to theme toggle

### Requirement: API Availability Tooltip
The system SHALL display code snippets showing how to check API availability in the Supported badge tooltip.

#### Scenario: View availability check
- **GIVEN** user hovers over the Supported/Not Supported badge
- **WHEN** tooltip appears
- **THEN** it displays the JavaScript code used to check availability
- **AND** code is displayed in monospace font

### Requirement: Compact Toolbar Buttons  
The system SHALL display secondary toolbar actions as icon-only buttons with tooltips.

#### Scenario: Secondary actions display
- **GIVEN** user views the editor toolbar
- **WHEN** observing Format, Copy, and Examples buttons
- **THEN** they appear as icon-only buttons
- **AND** hovering displays tooltip with action name

#### Scenario: Primary actions display
- **GIVEN** user views the editor toolbar
- **WHEN** observing Run and Reset buttons
- **THEN** they display both icon and text label

### Requirement: Monaco Hover Card Display
The system SHALL ensure Monaco editor hover cards are not clipped by panel boundaries.

#### Scenario: Hover at panel edge
- **GIVEN** user hovers over code near the right edge of the editor panel
- **WHEN** Monaco displays a hover card
- **THEN** the hover card is fully visible
- **AND** not clipped by the panel container

### Requirement: MDN Documentation Preview
The system SHALL provide inline preview of MDN documentation in a modal dialog.

#### Scenario: Open MDN preview
- **GIVEN** user is viewing an API demo
- **WHEN** user clicks the "MDN Docs" link
- **THEN** a modal dialog opens with MDN page embedded in iframe
- **AND** dialog includes "Open in new tab" option

#### Scenario: MDN iframe loading
- **GIVEN** MDN preview dialog is open
- **WHEN** iframe is loading
- **THEN** loading indicator is displayed
- **AND** user can still close the dialog

### Requirement: User Gesture Hint Icon
The system SHALL display user gesture requirements as a help icon with tooltip instead of inline text.

#### Scenario: View gesture hint
- **GIVEN** user views the Output panel header
- **WHEN** observing the area near the Output label
- **THEN** a small question mark (?) icon is displayed
- **AND** hovering shows tooltip explaining user gesture APIs

### Requirement: Section Header Icons
The system SHALL display icons alongside Output and Console section headers.

#### Scenario: Output header display
- **GIVEN** user views the Output panel
- **WHEN** observing the header
- **THEN** an output/monitor icon appears before "Output" text

#### Scenario: Console header display
- **GIVEN** user views the Console panel
- **WHEN** observing the header
- **THEN** a terminal icon appears before "Console" text

## MODIFIED Requirements

### Requirement: Console Clear Behavior
The Clear button SHALL only clear console messages without affecting the preview iframe.

#### Scenario: Clear console only
- **GIVEN** user has run code that displays UI in Output area
- **AND** console shows log messages
- **WHEN** user clicks Clear button
- **THEN** console messages are cleared
- **AND** Output area UI remains visible

#### Scenario: Full reset via Reset button
- **GIVEN** user has run code with Output UI and console messages
- **WHEN** user clicks Reset button  
- **THEN** code resets to default
- **AND** Output area is cleared
- **AND** console messages are cleared
