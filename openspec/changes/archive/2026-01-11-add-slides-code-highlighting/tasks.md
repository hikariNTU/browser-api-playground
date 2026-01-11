# Tasks: Add Code Syntax Highlighting to Slides

## Implementation Checklist

- [x] **Install shiki dependency**
  - Add `shiki` package to project dependencies
  - Verify installation with npm install

- [x] **Create code block component with syntax highlighting**
  - Create async highlighter initialization
  - Build custom code block component for react-markdown
  - Support language detection from code fence (e.g., ```js, ```ts)
  - Handle edge cases: no language specified, unknown language

- [x] **Integrate with slides panel**
  - Add code component to react-markdown's components prop
  - Ensure lazy loading works (highlighter loads with slides panel)

- [x] **Theme support**
  - Configure light theme for light mode
  - Configure dark theme for dark mode
  - Use CSS variables for background to match existing slide styles

- [x] **Style refinements**
  - Ensure code block styling matches existing slide-content styles
  - Add smooth transitions for theme switching
  - Test with various code samples (JS, TS, CSS, HTML, etc.)

- [x] **Validation**
  - Test code highlighting in light and dark modes
  - Verify no layout shift during highlighter loading
  - Run build to confirm no TypeScript errors
  - Check bundle size impact

## Dependencies
- Task 2 depends on Task 1
- Tasks 3-5 depend on Task 2
- Task 6 depends on all previous tasks
