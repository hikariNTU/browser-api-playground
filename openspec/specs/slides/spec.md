# slides Specification

## Purpose
TBD - created by archiving change add-floating-slides-panel. Update Purpose after archive.
## Requirements
### Requirement: Floating Slides Panel
The system SHALL provide a floating, draggable panel that displays Markdown-based slide content as a picture-in-picture overlay.

#### Scenario: User opens slides panel via keyboard
- **WHEN** user presses `Cmd/Ctrl + /` from any page
- **THEN** the slides panel component is lazy loaded (if first time)
- **AND** the slides panel appears as a floating overlay
- **AND** panel is positioned at last saved position (or bottom-right by default)
- **AND** panel displays the first slide

#### Scenario: User closes slides panel
- **WHEN** user presses `Escape` while panel is visible
- **OR** user presses `Cmd/Ctrl + /` again
- **OR** user clicks the close button
- **THEN** the slides panel is hidden
- **AND** current slide position is preserved for next open

#### Scenario: User drags panel
- **WHEN** user clicks and drags the panel header
- **THEN** panel moves to follow cursor position
- **AND** panel stays within viewport bounds
- **AND** new position is saved to localStorage

#### Scenario: User resizes panel
- **WHEN** user drags panel resize handles
- **THEN** panel resizes within min (300x200) and max (80% viewport) bounds
- **AND** new size is saved to localStorage

---

### Requirement: Slide Navigation
The system SHALL support navigating between slides using keyboard and UI controls.

#### Scenario: User navigates with arrow keys
- **WHEN** slides panel is focused
- **AND** user presses `→` or `↓`
- **THEN** next slide is displayed (or stays on last if at end)

#### Scenario: User navigates with arrow keys backward
- **WHEN** slides panel is focused
- **AND** user presses `←` or `↑`
- **THEN** previous slide is displayed (or stays on first if at start)

#### Scenario: User clicks navigation buttons
- **WHEN** user clicks the next/previous buttons in panel
- **THEN** corresponding slide is displayed

#### Scenario: User jumps to first/last slide
- **WHEN** user presses `Home` key while panel is focused
- **THEN** first slide is displayed
- **WHEN** user presses `End` key while panel is focused
- **THEN** last slide is displayed

---

### Requirement: Slide Preview Strip
The system SHALL display a horizontal strip of slide thumbnails at the bottom of the panel for quick navigation.

#### Scenario: Preview strip displays all slides
- **WHEN** slides panel is open
- **THEN** a preview strip appears at the bottom of the panel
- **AND** each slide is represented as a clickable thumbnail

#### Scenario: Current slide is highlighted
- **WHEN** viewing slide N
- **THEN** thumbnail N is visually highlighted in the preview strip
- **AND** preview strip scrolls to keep current thumbnail visible

#### Scenario: User clicks thumbnail to navigate
- **WHEN** user clicks a slide thumbnail in the preview strip
- **THEN** that slide becomes the current slide
- **AND** main content area updates to show the clicked slide

#### Scenario: Preview strip scrolls for many slides
- **WHEN** there are more slides than fit in the panel width
- **THEN** preview strip is horizontally scrollable

---

### Requirement: Markdown Slide Content
The system SHALL render slide content from Markdown files with support for common formatting, images, links, videos, and **syntax-highlighted code blocks**.

#### Scenario: Slide renders Markdown formatting
- **WHEN** slide Markdown contains headings, lists, code blocks, or emphasis
- **THEN** content is rendered with appropriate styling

#### Scenario: Slide renders syntax-highlighted code blocks
- **WHEN** slide Markdown contains a fenced code block with a language identifier (e.g., ```js)
- **THEN** the code is rendered with syntax highlighting appropriate for that language
- **AND** highlighting colors adapt to the current theme (light/dark mode)

#### Scenario: Slide renders code block without language
- **WHEN** slide Markdown contains a fenced code block without a language identifier
- **THEN** the code is rendered as plain text with monospace styling
- **AND** no syntax highlighting is applied

#### Scenario: Slide renders inline code
- **WHEN** slide Markdown contains inline code (single backticks)
- **THEN** the code is rendered with monospace styling
- **AND** no syntax highlighting is applied (inline code remains unstyled)

### Requirement: Slide File Organization
The system SHALL load slides from Markdown files in the `/code/slides/` directory.

#### Scenario: Slides are loaded on demand
- **WHEN** user opens the slides panel for the first time
- **THEN** the slides panel component is lazy loaded
- **AND** all `.md` files from `/code/slides/` are loaded and parsed

#### Scenario: Multi-slide file parsing
- **WHEN** a Markdown file contains `---` horizontal rule separators
- **THEN** content is split into multiple slides at each separator

#### Scenario: Slide ordering
- **WHEN** slides are loaded from multiple files
- **THEN** slides are ordered alphabetically by filename
- **AND** slides within a file maintain their document order

---

### Requirement: Lazy Loading
The system SHALL lazy load the entire slides feature only when the user explicitly requests it, to minimize initial bundle size.

#### Scenario: Initial page load without slides
- **WHEN** user loads the application
- **AND** user has not pressed the slides shortcut
- **THEN** slides panel component code is NOT loaded
- **AND** `react-markdown` dependency is NOT loaded
- **AND** slide content files are NOT loaded

#### Scenario: First slides activation
- **WHEN** user presses `Cmd/Ctrl + /` for the first time
- **THEN** slides panel component is dynamically imported
- **AND** loading indicator is shown during import
- **AND** panel opens once loading completes

#### Scenario: Subsequent slides activation
- **WHEN** user has previously opened slides in the session
- **AND** user presses `Cmd/Ctrl + /` again
- **THEN** panel opens immediately (no loading delay)

### Requirement: Pinch Gesture Three-State Panel Control
The system SHALL allow users to control the slides panel state (Maximized ↔ Normal ↔ Minimized) using trackpad pinch gestures.

#### Scenario: User pinches in to minimize panel
- **WHEN** slides panel is open in normal size
- **AND** user performs a pinch-in gesture (two-finger pinch) on the panel
- **THEN** the panel smoothly transitions to a minimized state (280×48px strip)
- **AND** minimized panel displays current slide number/total and title
- **AND** minimized state is saved to localStorage

#### Scenario: User pinches in to restore from maximized
- **WHEN** slides panel is maximized
- **AND** user performs a pinch-in gesture on the panel
- **THEN** the panel transitions to normal size
- **AND** gesture cooldown activates to prevent immediate further transitions

#### Scenario: User pinches out to restore from minimized
- **WHEN** slides panel is in minimized state
- **AND** user performs a pinch-out gesture (two-finger expand) on the panel
- **THEN** the panel smoothly transitions back to normal size
- **AND** normal state is saved to localStorage

#### Scenario: User pinches out to maximize panel
- **WHEN** slides panel is in normal size
- **AND** user performs a pinch-out gesture on the panel
- **THEN** the panel transitions to maximized state (full viewport minus 40px margins)

#### Scenario: Cooldown prevents continuous state jumps
- **WHEN** user performs a pinch gesture that triggers a state change
- **AND** user continues the same gesture without releasing
- **THEN** no further state changes occur until gesture ends
- **AND** for Chrome, cooldown resets after 300ms of no pinch events

#### Scenario: Minimized panel shows essential info
- **WHEN** slides panel is minimized
- **THEN** panel displays as a 280×48px strip at bottom-right
- **AND** shows current slide number and title in compact form
- **AND** shows an expand button to restore via click

#### Scenario: User clicks expand button to restore
- **WHEN** slides panel is minimized
- **AND** user clicks the expand button
- **THEN** the panel restores to its previous normal size

#### Scenario: Minimized state persists across sessions
- **WHEN** user minimizes the panel
- **AND** user reloads the page
- **AND** user opens slides panel again
- **THEN** panel opens in minimized state

