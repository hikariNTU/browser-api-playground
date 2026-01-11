# global-search Specification

## Purpose
TBD - created by archiving change add-ux-enhancements. Update Purpose after archive.
## Requirements
### Requirement: Global Search Trigger
The system SHALL provide a global search command palette accessible via keyboard shortcut and UI button.

#### Scenario: User opens search with keyboard
- **WHEN** user presses `⌘+K` (Mac) or `Ctrl+K` (Windows/Linux)
- **AND** focus is NOT on an input field, textarea, or Monaco editor
- **THEN** the global search dialog opens with focus on the search input

#### Scenario: User opens search from sidebar
- **WHEN** user clicks the search button in the sidebar
- **THEN** the global search dialog opens with focus on the search input

#### Scenario: User dismisses search
- **WHEN** the search dialog is open
- **AND** user presses Escape or clicks outside
- **THEN** the dialog closes and focus returns to previous element

---

### Requirement: Global Search Content Sources
The system SHALL search across all demos, examples, and appendix APIs.

#### Scenario: User searches for a demo
- **WHEN** user types "audio" in the search
- **THEN** results include demos with "audio" in name/description (e.g., AudioContext, MediaRecorder)
- **AND** each demo result shows: name, description, and "Demo" label
- **AND** selecting a demo navigates to `/api/{demoId}`

#### Scenario: User searches for an example
- **WHEN** user types "visualizer" in the search
- **THEN** results include examples with "visualizer" in title/description
- **AND** each example result shows: title, parent demo name, and "Example" label
- **AND** selecting an example navigates to `/api/{demoId}/{exampleId}`

#### Scenario: User searches for appendix API
- **WHEN** user types "WebSocket" in the search
- **THEN** results include appendix APIs matching the query
- **AND** each appendix result shows: name, description, and "Reference" label
- **AND** selecting an appendix API opens its MDN documentation in a new tab

---

### Requirement: Global Search Result Ranking
The system SHALL rank search results by relevance with demos prioritized over appendix items.

#### Scenario: Search results ordering
- **WHEN** user types a search query
- **THEN** results are grouped in order: Demos → Examples → Appendix APIs
- **AND** within each group, name matches rank higher than description matches
- **AND** filtering is case-insensitive

#### Scenario: Empty search results
- **WHEN** user types a query that matches nothing
- **THEN** the dialog shows "No results found for '{query}'"
- **AND** suggests checking spelling or trying different keywords

---

### Requirement: Global Search Keyboard Navigation
The system SHALL support keyboard navigation within search results.

#### Scenario: User navigates with arrow keys
- **WHEN** the search dialog is open with results
- **AND** user presses Up/Down arrow keys
- **THEN** selection moves through the results list
- **AND** the selected item is visually highlighted

#### Scenario: User selects with Enter
- **WHEN** a search result is highlighted
- **AND** user presses Enter
- **THEN** the corresponding navigation action is triggered
- **AND** the search dialog closes

