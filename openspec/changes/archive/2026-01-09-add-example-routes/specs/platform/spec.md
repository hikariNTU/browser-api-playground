# Capability: Platform

## MODIFIED Requirements

### Requirement: Example URL Routes
The system SHALL support direct URL access to all demos via nested routes, with intro page at base route.

#### Scenario: Navigate to API base route
- **GIVEN** an API demo exists
- **WHEN** user navigates to `/api/{apiId}`
- **THEN** an intro page is displayed with interactive preview and example links

#### Scenario: Navigate to default demo
- **GIVEN** an API demo exists
- **WHEN** user navigates to `/api/{apiId}/default`
- **THEN** the default demo code is loaded in the playground editor

#### Scenario: Navigate to example via URL
- **GIVEN** an API demo with examples exists
- **WHEN** user navigates to `/api/{apiId}/{exampleId}`
- **THEN** the example code is loaded in the editor
- **AND** the example HTML is rendered in the output panel

#### Scenario: Invalid example ID
- **GIVEN** user navigates to `/api/{apiId}/{invalidExampleId}`
- **WHEN** the example ID does not exist for that API
- **THEN** a 404 "Example Not Found" page is displayed

#### Scenario: Share example URL
- **GIVEN** user is viewing an example at `/api/audiocontext/node-editor`
- **WHEN** user shares the URL with another person
- **THEN** the recipient sees the same example loaded

---

### Requirement: Example-Aware Reset
The system SHALL reset code to the currently active example's original code.

#### Scenario: Reset on default demo
- **GIVEN** user is on `/api/audiocontext/default`
- **AND** user has modified the code
- **WHEN** user clicks the Reset button
- **THEN** code is restored to the default demo code

#### Scenario: Reset on example route
- **GIVEN** user is on `/api/audiocontext/node-editor`
- **AND** user has modified the code
- **WHEN** user clicks the Reset button
- **THEN** code is restored to the Node Editor example's original code

---

### Requirement: Sidebar Navigation with Flat List
The system SHALL display demos with their examples in a flat list in the sidebar.

#### Scenario: Demo with examples - flat list
- **GIVEN** sidebar is in expanded mode
- **AND** a demo has examples defined
- **WHEN** user views the sidebar
- **THEN** demo is shown as clickable item
- **AND** examples are shown indented below the demo
- **AND** all items are visible without expand/collapse

#### Scenario: Demo without examples
- **GIVEN** sidebar is in expanded mode
- **AND** a demo has no examples
- **WHEN** user views the sidebar
- **THEN** demo shows as single clickable item
- **AND** clicking navigates to `/api/{apiId}/default`

#### Scenario: Collapsed sidebar - flyout navigation
- **GIVEN** sidebar is in collapsed mode (icons only)
- **WHEN** user clicks on a demo icon
- **THEN** a flyout popover appears with demo name and sub-items
- **AND** clicking a sub-item navigates to that example

#### Scenario: Current example highlighted
- **GIVEN** user is on `/api/audiocontext/node-editor`
- **WHEN** user views the sidebar
- **AND** "Node Editor" sub-item is visually highlighted as active

---

### Requirement: Per-Example Code Persistence
The system SHALL persist code modifications separately for each example.

#### Scenario: Modify code on default demo
- **GIVEN** user is on `/api/audiocontext/default`
- **WHEN** user modifies the code
- **THEN** modifications are saved with key `playground-code-audiocontext-default`

#### Scenario: Modify code on example
- **GIVEN** user is on `/api/audiocontext/node-editor`
- **WHEN** user modifies the code
- **THEN** modifications are saved with key `playground-code-audiocontext-node-editor`

#### Scenario: Modifications isolated between examples
- **GIVEN** user modified code on `/api/audiocontext/node-editor`
- **WHEN** user navigates to `/api/audiocontext/default`
- **THEN** the default demo shows its own code (or saved modifications)
- **AND** node-editor modifications do not affect default

---

## ADDED Requirements

### Requirement: Example Identifier
Each example definition SHALL include a unique URL-safe identifier.

#### Scenario: Example has ID field
- **GIVEN** a demo has examples defined
- **WHEN** the examples are loaded
- **THEN** each example has an `id` field with a kebab-case slug

#### Scenario: Reserved default ID
- **GIVEN** a demo exists
- **WHEN** accessing the default demo
- **THEN** the reserved ID "default" is used in the URL

---

### Requirement: Intro Page at Base Route
The system SHALL display an intro page with interactive preview at the base API route.

#### Scenario: Intro page content
- **GIVEN** a demo exists with a `PreviewComponent` defined
- **WHEN** user navigates to `/api/{apiId}`
- **THEN** an intro page is displayed with:
  - Interactive preview component
  - List of example links (including "Default")
  - Brief description of the API

#### Scenario: Intro page preview interaction
- **GIVEN** user is on the intro page at `/api/web-speech`
- **WHEN** user interacts with the preview (e.g., clicks "Start Recording")
- **THEN** the preview responds and demonstrates the API

#### Scenario: Navigate from intro to default
- **GIVEN** user is on the intro page at `/api/audiocontext`
- **WHEN** user clicks on "Default Demo" link
- **THEN** user is navigated to `/api/audiocontext/default`
- **AND** the default demo code is loaded in the editor

#### Scenario: Navigate from intro to example
- **GIVEN** user is on the intro page at `/api/audiocontext`
- **WHEN** user clicks on an example link (e.g., "Node Editor")
- **THEN** user is navigated to `/api/audiocontext/node-editor`
- **AND** the example code is loaded in the editor

#### Scenario: Demo without preview component
- **GIVEN** a demo has no `PreviewComponent` defined
- **WHEN** user navigates to `/api/{apiId}`
- **THEN** the intro page shows example links without interactive preview

---

### Requirement: Home Page Cards
The system SHALL display demo cards on the home page with icons.

#### Scenario: Home page demo cards
- **GIVEN** demos exist in the system
- **WHEN** home page is rendered
- **THEN** each demo is displayed as a card with icon and title
- **AND** clicking the card navigates to `/api/{apiId}/default`
