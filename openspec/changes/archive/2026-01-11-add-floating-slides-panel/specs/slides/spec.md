# slides Specification

## Purpose
Floating slides panel for displaying supplementary content (use cases, examples, quick reference topics) during demos and presentations without leaving the playground.

## ADDED Requirements

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
The system SHALL render slide content from Markdown files with support for common formatting, images, links, and videos.

#### Scenario: Slide renders Markdown formatting
- **WHEN** slide Markdown contains headings, lists, code blocks, or emphasis
- **THEN** content is rendered with appropriate styling

#### Scenario: Slide renders images
- **WHEN** slide Markdown contains image syntax `![alt](path)`
- **THEN** image is displayed with appropriate sizing to fit panel

#### Scenario: Slide renders videos
- **WHEN** slide Markdown references a video file (`.mp4`, `.webm`)
- **THEN** video is rendered as a playable `<video>` element with controls

#### Scenario: Slide renders internal links
- **WHEN** slide contains links to playground routes (e.g., `/api/webrtc-webcodecs`)
- **AND** user clicks the link
- **THEN** application navigates to that route
- **AND** slides panel remains open

---

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
