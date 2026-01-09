# Capability: Platform

Core platform for the browser API playground, providing the shell, navigation, code editor, and execution environment.

## ADDED Requirements

### Requirement: Minimalist Visual Design
The system SHALL implement a minimalist modern aesthetic with generous whitespace and clean typography using shadcn/ui components.

#### Scenario: User perceives clean interface
- **WHEN** user loads any page
- **THEN** layout has generous padding (minimum 24px containers)
- **AND** sections are separated by whitespace, not heavy borders
- **AND** typography has clear hierarchy with relaxed line-height

#### Scenario: Component consistency
- **WHEN** UI elements are rendered
- **THEN** all buttons, cards, and inputs use shadcn/ui primitives
- **AND** styling follows muted color palette with subtle borders

---

### Requirement: Navigation Shell
The system SHALL provide a sidebar navigation listing all available API demos with visual indicators for browser support status.

#### Scenario: User views API list
- **WHEN** user loads the application
- **THEN** sidebar displays all 11 API demos as navigation items
- **AND** each item shows a support indicator (✅ supported, ❌ unsupported, ⚠️ partial)

#### Scenario: User navigates to API demo
- **WHEN** user clicks an API item in sidebar
- **THEN** the URL updates to `/api/{apiId}`
- **AND** the main content area displays that API's playground

---

### Requirement: Home Page API Grid
The system SHALL display a grid of API cards on the home page, each showing the API name, brief description, and browser compatibility status.

#### Scenario: User views home page
- **WHEN** user navigates to `/`
- **THEN** a responsive grid of API cards is displayed
- **AND** each card shows: API name, one-line description, compatibility badge

#### Scenario: User clicks API card
- **WHEN** user clicks an API card
- **THEN** user is navigated to `/api/{apiId}`

---

### Requirement: Monaco Code Editor
The system SHALL provide a Monaco-based code editor with JavaScript/TypeScript syntax highlighting and browser API type definitions.

#### Scenario: User edits code
- **WHEN** user types in the code editor
- **THEN** syntax highlighting is applied in real-time
- **AND** autocomplete suggestions appear for browser APIs

#### Scenario: Editor loads default code
- **WHEN** user navigates to an API playground without existing code
- **THEN** the editor displays the default example code for that API

---

### Requirement: Sandboxed Code Execution
The system SHALL execute user code in an isolated iframe sandbox to prevent crashes from affecting the main application.

#### Scenario: User runs code successfully
- **WHEN** user clicks the Run button
- **THEN** code executes in sandboxed iframe
- **AND** console.log outputs appear in the output panel
- **AND** API results are displayed in the result area

#### Scenario: User code throws error
- **WHEN** user code throws an uncaught exception
- **THEN** error message and stack trace appear in output panel
- **AND** main application remains responsive

#### Scenario: User code runs infinite loop
- **WHEN** user code enters infinite loop
- **THEN** execution times out after 5 seconds
- **AND** timeout error is displayed

---

### Requirement: Output Panel
The system SHALL display code execution results in a split output panel showing both a visual output area for rendered elements and console output.

#### Scenario: API renders visual elements
- **WHEN** code creates DOM elements and appends to document.body
- **THEN** elements are visible in the Output panel
- **AND** user can interact with buttons/controls for user-gesture APIs

#### Scenario: User gesture APIs work correctly
- **WHEN** code creates interactive buttons (e.g., for EyeDropper, Web Share)
- **THEN** clicking buttons in the Output area triggers user gesture
- **AND** APIs that require user activation work correctly

#### Scenario: Multiple console logs
- **WHEN** code calls console.log multiple times
- **THEN** all messages appear in chronological order in Console panel
- **AND** each log entry shows timestamp

---

### Requirement: Browser Compatibility Badge
The system SHALL display browser compatibility information using caniuse data combined with runtime feature detection.

#### Scenario: API supported in current browser
- **WHEN** runtime feature detection passes
- **THEN** badge shows "Your browser: ✅ Supported"
- **AND** general compatibility data from caniuse is displayed

#### Scenario: API not supported in current browser
- **WHEN** runtime feature detection fails
- **THEN** badge shows "Your browser: ❌ Not supported"
- **AND** badge indicates which browsers do support it

---

### Requirement: URL State Sharing
The system SHALL sync editor code and selected API to URL parameters using nuqs, enabling shareable playground links.

#### Scenario: User shares playground link
- **WHEN** user copies the current URL
- **AND** another user opens that URL
- **THEN** the same API is selected
- **AND** the same code appears in the editor

#### Scenario: URL updates on code change
- **WHEN** user modifies code in editor
- **THEN** URL query parameter updates (debounced) with encoded code

---

### Requirement: Theme Support
The system SHALL support dark and light themes with user preference persistence.

#### Scenario: User toggles theme
- **WHEN** user clicks theme toggle button
- **THEN** UI switches between dark and light themes
- **AND** Monaco editor theme updates accordingly
- **AND** preference is saved to localStorage

#### Scenario: System preference detection
- **WHEN** user loads app without saved preference
- **THEN** theme matches system preference (prefers-color-scheme)

---

### Requirement: Code Persistence
The system SHALL persist editor code to localStorage per API, restoring it on subsequent visits.

#### Scenario: User returns to previously edited demo
- **WHEN** user navigates to an API they previously edited
- **THEN** their last saved code is restored in the editor
- **AND** user can reset to default code via button

#### Scenario: User resets to default
- **WHEN** user clicks "Reset to default" button
- **THEN** localStorage entry is cleared
- **AND** editor shows original default code

---

### Requirement: GitHub Pages Deployment
The system SHALL support deployment to GitHub Pages using hash-based routing for compatibility with static hosting.

#### Scenario: Hash-based routing for static hosting
- **WHEN** app is deployed to GitHub Pages or other static hosting
- **THEN** TanStack Router uses hash history (e.g., `/#/api/eyedropper`)
- **AND** page refreshes and direct URL access work correctly
- **AND** no server-side configuration is required

#### Scenario: GitHub Action deploys on push
- **WHEN** code is pushed to `main` branch
- **THEN** GitHub Action builds the app
- **AND** deploys to GitHub Pages automatically
- **AND** deployment status is visible in GitHub UI

---

### Requirement: Code Modified Indicator
The system SHALL display a minimal visual indicator when editor code differs from the default example code.

#### Scenario: User modifies code
- **WHEN** user edits code in the editor
- **AND** the code differs from the default example
- **THEN** an amber dot indicator appears in the toolbar
- **AND** hovering shows tooltip "Code modified from default. Click Reset to restore."

#### Scenario: User resets code
- **WHEN** user clicks the Reset button
- **THEN** code returns to default
- **AND** the amber dot indicator disappears

---

### Requirement: Tooltip Accessibility
The system SHALL provide tooltips for all toolbar buttons using shadcn/ui Tooltip component.

#### Scenario: User hovers over button
- **WHEN** user hovers over a toolbar button (Run, Reset, Copy, Clear, etc.)
- **THEN** a tooltip appears after short delay (300ms)
- **AND** tooltip describes the button's action
- **AND** keyboard shortcuts are shown where applicable

#### Scenario: Collapsed sidebar navigation
- **WHEN** sidebar is collapsed to icon-only mode
- **THEN** hovering over API icons shows API name in tooltip
- **AND** hovering over theme toggle shows current action

---

### Requirement: Collapsible Sidebar
The system SHALL provide a collapsible sidebar that can be toggled between full-width and icon-only modes.

#### Scenario: User collapses sidebar
- **WHEN** user clicks the collapse button
- **THEN** sidebar shrinks to icon-only width (64px)
- **AND** API items show 2-letter abbreviations
- **AND** tooltips show full API names on hover

#### Scenario: User expands sidebar
- **WHEN** user clicks the expand button in collapsed mode
- **THEN** sidebar expands to full width (288px)
- **AND** full API names are visible

---

### Requirement: Browser Title
The system SHALL display meaningful browser tab titles that reflect the current page context.

#### Scenario: User views home page
- **WHEN** user navigates to the home page
- **THEN** browser title shows "Browser API Playground"

#### Scenario: User views API demo
- **WHEN** user navigates to an API demo page
- **THEN** browser title shows "{API Name} | Browser API Playground"

---

### Requirement: Code Formatting
The system SHALL provide code formatting functionality using Prettier.

#### Scenario: User formats code via button
- **WHEN** user clicks the Format button in the toolbar
- **THEN** code in the editor is formatted using Prettier
- **AND** formatting preserves code functionality

#### Scenario: User formats code via keyboard
- **WHEN** user presses ⌘⇧F (or Ctrl+Shift+F on Windows)
- **THEN** code in the editor is formatted using Prettier

#### Scenario: Format handles syntax errors gracefully
- **WHEN** user attempts to format syntactically invalid code
- **THEN** an error toast/message is shown
- **AND** original code is preserved

---

### Requirement: Examples Panel
The system SHALL provide a slide-out panel to browse and load example code snippets.

#### Scenario: User opens examples panel
- **WHEN** user clicks the Examples button in toolbar
- **THEN** a Sheet/drawer slides in from the right
- **AND** available examples for current API are listed

#### Scenario: User loads an example
- **WHEN** user clicks "Load Example" on an example card
- **THEN** the example code replaces editor content
- **AND** the examples panel remains open for browsing
