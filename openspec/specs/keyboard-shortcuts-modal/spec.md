# keyboard-shortcuts-modal Specification

## Purpose
TBD - created by archiving change add-ux-enhancements. Update Purpose after archive.
## Requirements
### Requirement: Keyboard Shortcuts Modal Trigger
The system SHALL open a keyboard shortcuts help modal when the user presses the `?` key (Shift+/).

#### Scenario: User presses ? key
- **WHEN** user presses `?` (Shift+/) key
- **AND** focus is NOT on an input field, textarea, or Monaco editor
- **THEN** a keyboard shortcuts modal opens

#### Scenario: User presses ? while typing
- **WHEN** user presses `?` key
- **AND** focus IS on an input field, textarea, or Monaco editor
- **THEN** the `?` character is typed normally
- **AND** no modal opens

---

### Requirement: Keyboard Shortcuts Modal Content
The system SHALL display all available global keyboard shortcuts in the modal.

#### Scenario: User views shortcuts modal
- **WHEN** the keyboard shortcuts modal is open
- **THEN** the modal displays a title "Keyboard Shortcuts"
- **AND** shows a table/list of shortcuts including:
  - `⌘+K` or `Ctrl+K` - Open global search
  - `⌘/` or `Ctrl+/` - Toggle slides panel
  - `?` - Show keyboard shortcuts
  - `⌘+Enter` - Run code (in playground)
  - `⌘+Shift+F` - Format code (in playground)
  - `⌘+Shift+P` - Monaco command palette (in editor)
- **AND** shortcuts show `⌘` on Mac and `Ctrl` on other platforms

---

### Requirement: Keyboard Shortcuts Modal Dismissal
The system SHALL allow users to close the modal via multiple methods.

#### Scenario: User closes modal with Escape
- **WHEN** the shortcuts modal is open
- **AND** user presses Escape key
- **THEN** the modal closes
- **AND** focus returns to previous element

#### Scenario: User closes modal by clicking outside
- **WHEN** the shortcuts modal is open
- **AND** user clicks outside the modal content
- **THEN** the modal closes

#### Scenario: User closes modal with close button
- **WHEN** the shortcuts modal is open
- **AND** user clicks the × (close) button
- **THEN** the modal closes

