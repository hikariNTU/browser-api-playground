# platform Specification

## Purpose
Core platform for the browser API playground, providing the shell, navigation, code editor, and execution environment.
## Requirements
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
- **THEN** sidebar displays all API demos as navigation items
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
The system SHALL execute user code in an isolated iframe sandbox with the HTML template injected into the body before script execution, preventing crashes from affecting the main application.

#### Scenario: User runs code with HTML template
- **WHEN** user clicks the Run button
- **AND** HTML template exists (in HTML tab)
- **THEN** iframe body is populated with HTML template content
- **THEN** JavaScript code executes after HTML is injected
- **AND** JavaScript can reference elements defined in HTML template

#### Scenario: User runs code without HTML template
- **WHEN** user clicks the Run button
- **AND** no HTML template exists (HTML tab empty or placeholder)
- **THEN** iframe body starts empty with base styles
- **THEN** JavaScript code executes and creates DOM dynamically

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
The system SHALL display browser compatibility information using MDN browser-compat-data fetched at runtime from jsDelivr (pinned to the installed package version or latest if explicitly chosen) with no bundled local dataset, combined with runtime feature detection, keeping the full dataset out of the initial JavaScript bundle.

#### Scenario: Compat data lazy-loads without blocking UI
- **WHEN** a page with compat UI renders and compat data has not been loaded
- **THEN** the page renders immediately using runtime detection status
- **AND** compat data loads asynchronously via jsDelivr fetch pinned to the installed BCD version (or latest if configured)
- **AND** the loaded data is cached for subsequent lookups
- **AND** if the CDN fetch or payload verification fails, the UI shows "compat data unavailable" without crashing other content

#### Scenario: API supported with compat data available
- **WHEN** runtime feature detection passes and compat data resolves and verifies
- **THEN** the badge shows "Your browser: ✅ Supported"
- **AND** compat UI shows MDN compatibility by target browsers (Chrome, Firefox, Safari, Safari iOS, Chrome Android) with version numbers when available

#### Scenario: API not supported with compat data available
- **WHEN** runtime feature detection fails and compat data resolves and verifies
- **THEN** the badge shows "Your browser: ❌ Not supported"
- **AND** compat UI lists which target browsers do support it with version numbers from the MDN dataset

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

### Requirement: Examples Browser UI
The examples browser SHALL provide quick access to code examples via a dropdown menu triggered from the editor toolbar.

#### Scenario: User hovers over examples button
**Given** the user is on an API playground page  
**When** they hover over the BookOpen icon button in the editor toolbar  
**Then** a dropdown menu appears showing all available examples for that API

#### Scenario: User selects an example
**Given** the examples dropdown is open  
**When** the user clicks on an example item  
**Then** the example code and HTML are loaded into the editor  
**And** the code is auto-executed if the API is supported  
**And** the dropdown closes automatically

#### Scenario: Example item display
**Given** the examples dropdown is open  
**Then** each example shows its title in medium font weight  
**And** each example shows its description in smaller muted text below the title

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

### Requirement: Code Persistence Per Language
The system SHALL persist both JavaScript and HTML editor content separately to localStorage, allowing users to modify and restore code independently.

#### Scenario: User modifies JavaScript and HTML
- **WHEN** user edits JavaScript code in JS tab
- **AND** user edits HTML template in HTML tab
- **THEN** both changes are persisted independently to localStorage
- **AND** each has its own storage key pattern

#### Scenario: User resets code
- **WHEN** user clicks Reset button
- **THEN** both JavaScript and HTML are restored to their defaults
- **AND** localStorage entries for both are cleared
- **AND** code is automatically executed with restored defaults

#### Scenario: User sees modification indicator
- **WHEN** either JavaScript or HTML differs from default
- **THEN** modified indicator (dot) is displayed
- **AND** tooltip explains code has been modified

