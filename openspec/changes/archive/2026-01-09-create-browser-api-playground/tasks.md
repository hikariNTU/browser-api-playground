# Tasks: Create Browser API Playground

## 1. Project Setup
- [x] 1.1 Initialize Vite + React + TypeScript project
- [x] 1.2 Configure TailwindCSS
- [x] 1.3 Initialize shadcn/ui with minimalist theme customization
- [x] 1.4 Set up TanStack Router (file-based routing)
- [x] 1.5 Install and configure Jotai
- [x] 1.6 Install and configure nuqs for URL state
- [x] 1.7 Install TanStack Query
- [x] 1.8 Set up Monaco Editor (@monaco-editor/react)
- [x] 1.9 Configure Vite for dynamic base path (`VITE_BASE_PATH` env var)
- [x] 1.10 Create GitHub Actions workflow (`.github/workflows/deploy.yml`)
  - Build with base path `/browser-api-playground/`
  - Deploy to GitHub Pages on push to `main`

## 2. Core Platform
- [x] 2.1 Create Layout component with Sidebar navigation
- [x] 2.2 Create HomePage with API grid cards
- [x] 2.3 Create ApiPlaygroundPage route (`/api/$apiId`)
- [x] 2.4 Implement MonacoEditor wrapper component
- [x] 2.5 Implement CodeExecutor (iframe sandbox execution)
- [x] 2.6 Create OutputPanel with ConsoleOutput
- [x] 2.7 Implement CompatBadge component (caniuse + runtime detection)
- [x] 2.8 Implement MdnLink component
- [x] 2.9 Create demo registry pattern (`demos/index.ts`)
- [x] 2.10 Add URL state sync for code sharing (nuqs)

## 3. API Demos - Low Complexity
- [x] 3.1 EyeDropper API demo
  - [x] Default code: open picker, display selected color
  - [x] Output: color swatch preview
- [x] 3.2 Web Share API demo
  - [x] Default code: share text/URL
  - [x] Output: share dialog trigger
- [x] 3.3 Screen Wake Lock API demo
  - [x] Default code: acquire/release wake lock
  - [x] Output: lock status indicator

## 4. API Demos - Medium Complexity
- [x] 4.1 Window Management API demo
  - [x] Default code: enumerate screens, request fullscreen on specific screen
  - [x] Output: screen info visualization
- [x] 4.2 Web Serial API demo
  - [x] Default code: connect, read/write bytes
  - [x] Output: terminal-style serial output
- [x] 4.3 Gamepad API demo
  - [x] Default code: poll gamepad state
  - [x] Output: visual controller with button/axis state
- [x] 4.4 View Transitions API demo
  - [x] Default code: animate element transitions
  - [x] Output: live transition preview

## 5. API Demos - High Complexity
- [x] 5.1 WebRTC / WebCodecs API demo
  - [x] Default code: camera access, basic encoding
  - [x] Output: video preview with codec info

## 6. Polish & Documentation
- [x] 6.1 Add dark/light theme toggle
- [x] 6.2 Persist editor code to localStorage
- [x] 6.3 Add curated examples for each API
- [x] 6.4 Write README with local dev and deployment instructions
- [x] 6.5 Add error boundary for graceful crash handling
- [x] 6.6 Test all demos in Chrome (primary target)

## 7. Engineer DX Polish
- [x] 7.1 Keyboard shortcuts (`Cmd+Enter` run, `Cmd+S` save)
- [x] 7.2 Copy code button (one-click clipboard copy)
- [x] 7.3 Format code with Prettier (`Cmd+Shift+F`) - Monaco built-in
- [x] 7.4 Resizable panels (drag to resize editor/output split)
- [x] 7.5 Error line highlighting (click error → jump to line)
- [x] 7.6 Execution indicator (spinner/badge: Running/Idle)
- [x] 7.7 Quick API reference panel (collapsible cheatsheet) - Examples drawer
- [x] 7.8 Mobile detection banner ("Best on desktop" notice)

## 8. Additional API Demos
- [x] 8.1 AudioContext API demo
  - [x] Default code: generate tones, visualize audio
  - [x] Output: audio playback with waveform
- [x] 8.2 File System Access API demo (Chrome-exclusive)
  - [x] Default code: open/save text files
  - [x] Output: file contents display
- [x] 8.3 Compression Streams API demo
  - [x] Default code: compress/decompress text
  - [x] Output: size comparison display

## 9. Bug Fixes & Polish
- [x] 9.1 Fix Examples Sheet not opening (Tooltip/SheetTrigger nesting issue)
- [x] 9.2 Add browser title (home: "Browser API Playground", API: "{name} | Browser API Playground")
- [x] 9.3 Simplify modified indicator to dot-only (remove "Modified" text)
- [x] 9.4 Add Prettier config (`.prettierrc`) and ESLint integration
- [x] 9.5 Add Format button to editor toolbar with ⌘⇧F shortcut

## Dependencies
- Tasks 2.x depend on 1.x completion
- Tasks 3.x, 4.x, 5.x depend on 2.9 (demo registry)
- Tasks 6.x, 7.x can run in parallel after core platform
- Tasks 8.x depend on demo registry (2.9)
- Tasks 9.x can run independently
- Tasks 10.x can run independently

## 10. Code Architecture & UI Polish
- [x] 10.1 Extract demo code snippets to external files
  - [x] Move inline `defaultCode` strings to separate `.js` files (e.g., `demos/code/eyedropper.js`)
  - [x] Use Vite's `?raw` import query to import as string
  - [x] Update all demo files to import code from external files
  - [x] Same for `examples[].code` - extract to separate files
- [x] 10.2 Fix modified indicator position
  - [x] Move dot indicator to appear after Reset button (right side of button group)
  - [x] Prevents layout shift when dot appears/disappears
- [x] 10.3 Fix example drawer card padding
  - [x] Add proper inner padding to example cards in Sheet
  - [x] Ensure consistent spacing within card content
- [x] 10.4 Add HTML support for examples
  - [x] Add optional `html?: string` field to `DemoExample` type
  - [x] Update execution sandbox to inject HTML before running JS
  - [x] Create HTML example snippets for demos that need HTML structure
- [x] 10.5 Add branding icons
  - [x] Add `icon-square.png` to `src/assets/` (square icon)
  - [x] Use as favicon in `index.html` (PNG format)
  - [x] Use in collapsed sidebar navbar
  - [x] Add `logo-horizontal.png` to `src/assets/` (horizontal logo, dark grey)
  - [x] Use in expanded sidebar title
  - [x] Apply CSS filter for dark mode (invert to white)
