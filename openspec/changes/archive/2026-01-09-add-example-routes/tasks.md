# Tasks: Add Example Routes

## Task Group 1: Data Model Updates

- [x] 1.1 Add `id: string` field to `DemoExample` interface in `types.ts`
- [x] 1.2 Add `PreviewComponent?: React.ComponentType` field to `ApiDemo` interface
- [x] 1.3 Add `id` to all existing example definitions across demo files
- [x] 1.4 Add `getExampleById(apiId, exampleId)` helper function to demo registry

## Task Group 2: Route Structure

- [x] 2.1 Modify `src/routes/api/$apiId.tsx` to render intro page (not redirect)
- [x] 2.2 Create `src/routes/api/$apiId.$exampleId.tsx` for all playgrounds (including "default")
- [x] 2.3 Handle 404 for invalid example IDs
- [x] 2.4 Update document title to include example/page name

## Task Group 3: Intro Page Component

- [x] 3.1 Create `IntroPage` component template
- [x] 3.2 Display API name, description, MDN link
- [x] 3.3 Render `PreviewComponent` if available (with fallback placeholder)
- [x] 3.4 Display example cards linking to `/api/{apiId}/default` and each example
- [x] 3.5 Style example cards grid layout

## Task Group 4: Preview Components

- [x] 4.1 Create `EyeDropperPreview` - color picker demo
- [x] 4.2 Create `WebSpeechPreview` - TTS/ASR mini demo
- [x] 4.3 Create `AudioContextPreview` - oscillator/waveform demo
- [x] 4.4 Create `GamepadPreview` - controller status demo
- [ ] 4.5 Add remaining previews incrementally (optional)

## Task Group 5: Playground Component Updates

- [x] 5.1 Update `ApiPlayground` to accept `example` prop
- [x] 5.2 Fix `handleReset` to use current example's code
- [x] 5.3 Fix `isModified` calculation to compare against current example's code
- [x] 5.4 Fix localStorage key to include example ID for proper persistence
- [x] 5.5 Remove examples dropdown from toolbar (now in sidebar)

## Task Group 6: Sidebar Navigation

- [x] 6.1 Update sidebar to show flat list with examples indented under parent demo
- [x] 6.2 Highlight current demo and current example in sidebar
- [x] 6.3 Handle collapsed mode: flyout popover on click with demo + examples

## Task Group 7: Testing & Validation

- [x] 7.1 Verify `/api/audiocontext` shows intro page with preview
- [x] 7.2 Verify `/api/audiocontext/default` shows playground with default code
- [x] 7.3 Verify intro page example cards include "Default" link
- [x] 7.4 Verify Reset works correctly on example routes
- [x] 7.5 Verify browser back/forward navigation
- [x] 7.6 Verify URL sharing works for all sub-routes
- [x] 7.7 Verify sidebar navigation in both expanded and collapsed modes

## Dependencies

- Task Group 1 must complete before Task Groups 2-6
- Task Group 2 must complete before Task Groups 3, 5
- Task Groups 3, 4, 5, 6 can be done in parallel after dependencies met
- Task Group 7 depends on all others
