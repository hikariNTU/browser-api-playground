# Proposal: Add Code Syntax Highlighting to Slides

## Summary
Add syntax highlighting for code blocks in the slides panel to improve readability and presentation quality.

## Motivation
Currently, code blocks in slides are rendered with basic monospace styling (gray background, no color differentiation). This makes it harder to read and understand code examples during presentations. Syntax highlighting will:
- Improve code readability with color-coded tokens
- Match the professional look expected in technical presentations
- Leverage the same visual language developers are accustomed to in editors

## Scope
- Add a syntax highlighting library compatible with react-markdown
- Create custom code block component with language detection
- Style highlighted code to match the existing theme (light/dark mode support)

## Technical Approach
Use **Shiki** for syntax highlighting because:
1. It uses the same syntax grammar as VS Code (TextMate grammars)
2. Supports both light and dark themes out of the box
3. Works well with React (via `@shikijs/rehype` or custom component)
4. Modern, actively maintained library

Alternative considered: Prism.js - lighter but fewer language support and less accurate highlighting.

## Impact
- **Files modified**: slides-panel.tsx, slides-panel.css
- **New dependencies**: shiki (or @shikijs/rehype)
- **Bundle size**: ~100-200KB increase (can be lazy-loaded with slides panel)
- **Breaking changes**: None

## Risks
- Bundle size increase - mitigated by lazy-loading with slides panel (already code-split)
- Theme mismatch - mitigated by using theme variables for background/selection colors
