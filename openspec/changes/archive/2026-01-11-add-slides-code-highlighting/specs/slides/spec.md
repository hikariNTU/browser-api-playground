# slides Specification Delta

## MODIFIED Requirements

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
