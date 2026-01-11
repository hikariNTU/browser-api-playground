# Tasks: UX Enhancements

## Pre-implementation
- [x] Validate proposal with `openspec validate add-ux-enhancements --strict`

## Capability: Related APIs

- [x] **Add relatedApis field to ApiDemo interface**
  - File: `code/src/demos/types.ts`
  - Add optional `relatedApis?: string[]` field

- [x] **Add related API references to all demos**
  - Files: `code/src/demos/*.ts` (13 demo files)
  - Add `relatedApis` array based on design.md mapping

- [x] **Create Related APIs section in intro page**
  - File: `code/src/components/intro-page.tsx`
  - Add section after Examples grid
  - Use Card components linking to related demo intro pages
  - Only render if demo has `relatedApis` and at least one valid reference

- [x] **Verify related APIs display correctly**
  - Test on media-recorder (has 2 related)
  - Test on screen-wake-lock (has none)

## Capability: Global Search

- [x] **Create GlobalSearch component**
  - File: `code/src/components/global-search.tsx`
  - Use shadcn Command (cmdk) component
  - Import demos from `@/demos` and appendixApis from `@/data/appendix-apis`

- [x] **Build search data aggregation**
  - Flatten demos into searchable items with type="demo"
  - Flatten examples into searchable items with type="example" and parent demo ref
  - Include appendix APIs with type="reference"

- [x] **Implement search filtering**
  - Filter by name/title and description
  - Case-insensitive substring match
  - Group results: Demos → Examples → References

- [x] **Add result actions**
  - Demos: navigate to `/api/{demoId}`
  - Examples: navigate to `/api/{demoId}/{exampleId}`
  - Appendix: open MDN URL in new tab

- [x] **Add keyboard shortcut handler**
  - File: `code/src/routes/__root.tsx`
  - Listen for `⌘+K` / `Ctrl+K`
  - Add search button to sidebar (collapsed and expanded states)

- [x] **Verify global search works correctly**
  - Test demo search: "audio" finds AudioContext
  - Test example search: "visualizer" finds audio visualizer example
  - Test appendix search: "WebSocket" finds WebSocket API
  - Test keyboard navigation: arrow keys and Enter

## Capability: Keyboard Shortcuts Modal

- [x] **Create KeyboardShortcutsModal component**
  - File: `code/src/components/keyboard-shortcuts-modal.tsx`
  - Use shadcn Dialog component
  - Display shortcuts table from design.md

- [x] **Add modal state and keyboard handler to root**
  - File: `code/src/routes/__root.tsx`
  - Add `useState` for modal open state
  - Add `?` key listener with same guards as slides toggle

- [x] **Render modal in RootLayout**
  - Import and render KeyboardShortcutsModal
  - Pass open state and onClose handler

- [x] **Verify modal functionality**
  - Test `?` key opens modal
  - Test Escape closes modal
  - Test doesn't trigger when typing in input

## Post-implementation

- [ ] Run `npm run lint` and fix any issues
- [ ] Run `npm run format` to format code
- [ ] Run `npm run build` to verify compilation
