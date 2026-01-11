# Change: Add HTML Editor Panel

## Why
Currently, many demos have associated HTML templates (`defaultHtml`, `example.html`) that define the initial DOM structure the JavaScript code manipulates. However, users cannot see or edit this HTML—it's silently injected into the iframe before code execution. This creates a confusing experience when users see JavaScript referencing elements like `document.getElementById('api-list')` without understanding where those elements come from.

By exposing the HTML in a visible, editable panel alongside the JavaScript editor, users can:
1. Understand the full picture of how demos work
2. Experiment with HTML structure changes
3. Learn how HTML and JavaScript interact together

## What Changes
- Add a tabbed interface to the editor panel: "JavaScript" and "HTML" tabs
- HTML tab shows/edits the HTML template when one exists
- When an example has no HTML, show an empty/placeholder state with guidance
- HTML changes sync to execution (iframe receives updated HTML)
- Both code states (JS and HTML) persist independently to localStorage
- Monaco editor language switches based on active tab
- Reset button auto-executes code after restoring defaults (consistent with example switching behavior)
- Review and improve example HTML structures for better learning experience

## Impact
- Affected specs: `platform` (Monaco Code Editor, Sandboxed Code Execution requirements)
- Affected code:
  - `src/components/api-playground.tsx` - Add tab UI and HTML editor state
  - `src/hooks/use-code-execution.ts` - Already supports HTML parameter
  - `src/demos/types.ts` - Already has `defaultHtml` and `html` fields
  - `src/demos/code/*.html` - Review and improve HTML template structures
