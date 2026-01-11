# Change: Add Floating Slides Panel

## Why
When presenting the Browser API Playground during screen-sharing demos, there's no way to show supplementary content like real-world use cases, project examples, or quick reference topics. Currently, presenters would need to switch between the playground and a separate presentation tool, breaking the flow.

A floating slides panel would allow:
1. Quick access to use case examples from previous work during demos
2. Show supplementary content (images, links, videos) without leaving the playground
3. Keep the demo context visible while presenting additional information

## What Changes
- Add a `/slides` directory at the root level (sibling to `/code`) containing Markdown slide files
- Create a floating, draggable panel component that renders slide content
- Implement global keyboard shortcut (`Cmd+/` / `Ctrl+/`) to toggle the slides panel
- Support basic slide navigation with arrow keys when panel is focused
- Parse Markdown with support for images, links, and embedded videos
- Panel appears as a resizable, picture-in-picture style overlay
- Include a slide preview strip showing thumbnails for quick navigation

## Impact
- Affected specs: `platform` (new slides panel requirement), new `slides` capability
- New directory: `/code/slides/` inside the code directory
- Affected code:
  - `src/routes/__root.tsx` - Add global shortcut listener and lazy panel mount
  - New component: `src/components/slides-panel.tsx` - Floating panel with slide rendering (lazy loaded)
  - New hook: `src/hooks/use-slides.ts` - Load and manage slide content
- New dependency: Markdown parser (e.g., `react-markdown` or similar lightweight solution)
- Lazy loading: Entire slides feature (component + dependencies) loaded only on first shortcut trigger

## Out of Scope
- Full presentation mode (speaker notes, presenter view)
- Slide transitions/animations beyond basic fade
- WYSIWYG slide editor
- Export to PDF/PPTX
