## MODIFIED Requirements
### Requirement: Monaco Code Editor
The system SHALL provide a Monaco-based code editor with tabbed support for JavaScript and HTML editing, JavaScript/TypeScript syntax highlighting, HTML syntax highlighting, and browser API type definitions.

#### Scenario: User edits JavaScript code
- **WHEN** user types in the code editor with JavaScript tab active
- **THEN** syntax highlighting is applied in real-time
- **AND** autocomplete suggestions appear for browser APIs
- **AND** browser API type definitions are active

#### Scenario: User edits HTML code
- **WHEN** user switches to HTML tab and types in the editor
- **THEN** HTML syntax highlighting is applied in real-time
- **AND** HTML autocomplete and tag completion work
- **AND** browser API type definitions are not active (JavaScript only)

#### Scenario: User switches between tabs
- **WHEN** user clicks JavaScript or HTML tab
- **THEN** editor content switches to the selected language
- **AND** editor language mode updates accordingly
- **AND** previous content is preserved in each tab

#### Scenario: Editor loads default code
- **WHEN** user navigates to an API playground without existing code
- **THEN** the editor displays the default JavaScript code for that API
- **AND** if the example has HTML template, HTML tab displays that template
- **AND** if no HTML template exists, HTML tab shows placeholder guidance

#### Scenario: Example has no HTML template
- **WHEN** user views an example that creates DOM via JavaScript only
- **THEN** HTML tab is visually muted or shows "No template"
- **AND** clicking HTML tab shows guidance text explaining DOM is created via JS

---

## MODIFIED Requirements
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

## ADDED Requirements
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
