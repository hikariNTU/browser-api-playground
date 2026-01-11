# Tasks: Add Floating Slides Panel

## 1. Project Setup
- [x] 1.1 Create `/code/slides/` directory
- [x] 1.2 Add sample slide files (`01-intro.md`, `02-sample-usecase.md`)
- [x] 1.3 Install `react-markdown` and `remark-gfm` dependencies in `/code`
- [x] 1.4 Verify Vite can import `.md` files from `./slides/` using `import.meta.glob`

## 2. Slides Data Layer
- [x] 2.1 Create `src/hooks/use-slides.ts` hook to load slide content
- [x] 2.2 Parse slide Markdown, split on `---` for multi-slide files
- [x] 2.3 Extract slide metadata (title from first `#` heading)
- [x] 2.4 Export typed `Slide` interface

## 3. Floating Panel Component
- [x] 3.1 Create `src/components/slides-panel.tsx` with header, content area, and controls
- [x] 3.2 Implement drag functionality (mouse down on header to drag)
- [x] 3.3 Implement resize functionality (drag corner/edge handles)
- [x] 3.4 Add minimize/close buttons in header
- [x] 3.5 Persist position and size to localStorage
- [x] 3.6 Style with shadcn/ui components (Card, Button) and Tailwind

## 4. Slide Rendering
- [x] 4.1 Integrate `react-markdown` for Markdown rendering
- [x] 4.2 Add custom renderer for images (handle relative paths)
- [x] 4.3 Add custom renderer for videos (`.mp4`, `.webm` → `<video>` element)
- [x] 4.4 Add custom renderer for links (internal `/api/*` links navigate in app)
- [x] 4.5 Style slide content with appropriate typography and spacing

## 5. Navigation
- [x] 5.1 Add slide counter display ("2 / 5")
- [x] 5.2 Add previous/next buttons with icons
- [x] 5.3 Implement arrow key navigation when panel is focused
- [x] 5.4 Add Home/End key support for first/last slide
- [x] 5.5 Add preview strip component at bottom of panel
- [x] 5.6 Render mini slide previews (scaled-down content or title text)
- [x] 5.7 Highlight current slide in preview strip
- [x] 5.8 Click thumbnail to navigate to that slide
- [x] 5.9 Horizontal scroll for preview strip overflow

## 6. Lazy Loading & Global Shortcut Integration
- [x] 6.1 Add `useEffect` in `__root.tsx` to listen for `Cmd/Ctrl + /`
- [x] 6.2 Create `slidesRequested` state to track if user has ever triggered slides
- [x] 6.3 Use `React.lazy()` to dynamically import `slides-panel.tsx`
- [x] 6.4 Wrap lazy component in `<Suspense>` with loading fallback
- [x] 6.5 Only render slides component after first shortcut trigger
- [x] 6.6 Add Escape key handler to close panel

## 7. Polish & Documentation
- [x] 7.1 Add tooltip hint for keyboard shortcut in UI (optional button in header toolbar)
- [x] 7.2 Add focus trap when panel is open (optional, for accessibility)
- [x] 7.3 Update README with slides feature documentation
- [x] 7.4 Run `npm run lint && npm run format && npm run build` to verify

## Dependencies
- Task 2 depends on Task 1 (need slide files to load)
- Task 4 depends on Task 3 (need panel to render into)
- Task 5 depends on Task 2 (need slides data for navigation)
- Task 6 depends on Task 3 (need panel component to toggle)
- Tasks 3, 4, 5 can be parallelized after Task 2

## Bundle Size Verification
- After implementation, verify slides code is NOT in main chunk using `npm run build`
- Check that `slides-panel` appears as a separate lazy chunk in build output
