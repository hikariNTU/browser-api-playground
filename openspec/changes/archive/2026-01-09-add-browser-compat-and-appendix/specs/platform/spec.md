# platform Specification

## Purpose
Core platform for the browser API playground, providing the shell, navigation, code editor, and execution environment.

## ADDED Requirements

### Requirement: Browser Compatibility Display
The system SHALL display browser compatibility information for each API demo using data from `@mdn/browser-compat-data`, showing support status for Chrome, Firefox, Safari, Safari iOS, and Chrome Android.

#### Scenario: User views browser compat on home page card
- **WHEN** user views an API card on the home page
- **THEN** browser compatibility icons are displayed below the description
- **AND** each icon shows ✓ (supported) or ✗ (unsupported) for that browser

#### Scenario: User views browser compat on API intro page
- **WHEN** user navigates to an API's intro page
- **THEN** a "Browser Support" section displays compatibility
- **AND** each browser shows name, icon, and minimum supported version (if available)

#### Scenario: User hovers sidebar badge
- **WHEN** user hovers over the support badge in the sidebar
- **THEN** a tooltip displays browser compatibility icons

---

### Requirement: Support Check Code Visibility
The system SHALL display the JavaScript code snippet used to detect API support when users interact with the "Supported/Unsupported" badge.

#### Scenario: User clicks support badge
- **WHEN** user clicks the "Supported" or "Unsupported" badge
- **THEN** a popover appears showing the detection code (e.g., `'EyeDropper' in window`)
- **AND** the code is syntax highlighted

#### Scenario: User understands feature detection
- **WHEN** user views the support check code
- **THEN** they can copy the code to use in their own projects

---

### Requirement: API Appendix Page
The system SHALL provide an appendix page listing additional browser APIs not demoed in the playground, with MDN links and browser compatibility information.

#### Scenario: User discovers more APIs
- **WHEN** user navigates to `/appendix`
- **THEN** a list of additional browser APIs is displayed
- **AND** each entry shows: API name, brief description, MDN link, browser compat icons

#### Scenario: User accesses appendix from navigation
- **WHEN** user looks at the sidebar
- **THEN** a "More APIs" link is visible
- **AND** clicking it navigates to the appendix page

#### Scenario: User accesses appendix from home page
- **WHEN** user scrolls to the bottom of the home page
- **THEN** an "Explore More APIs" link is visible
- **AND** clicking it navigates to the appendix page
