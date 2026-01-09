# Change: Create Browser API Playground

## Why
Frontend engineers rarely get hands-on experience with powerful but obscure browser APIs. A 1-hour tech sharing session needs an interactive playground where 20 engineers can immediately experiment with live code—not just watch slides.

## What Changes
- Create a static website with live Monaco editor for each browser API demo
- Support 11 browser APIs: EyeDropper, Window Management, WebRTC/WebCodecs, Web Share, Screen Wake Lock, Web Serial, Gamepad, View Transitions, AudioContext, File System Access, Compression Streams
- Each demo includes: description, browser compatibility badge, MDN link, editable code, and live output
- Deploy as static site to GitHub Pages
- Include code formatting with Prettier integration

## Impact
- Affected specs: `platform`, `api-demos`
- Affected code: New project (greenfield)

## Tech Stack
- **Build**: Vite
- **Framework**: React 18+
- **Styling**: TailwindCSS
- **Components**: shadcn/ui (Radix primitives)
- **Routing**: TanStack Router (file-based)
- **State**: Jotai (atoms for editor state, demo results)
- **URL State**: nuqs (shareable demo configurations)
- **Data Fetching**: TanStack Query (for any async API results)
- **Validation**: Zod (schema validation if needed)
- **Code Editor**: Monaco Editor (@monaco-editor/react)

## Design Direction
- **Style**: Minimalist modern with generous whitespace
- **Typography**: Clean, readable, well-spaced
- **Layout**: Airy, uncluttered, content-focused
- **Colors**: Subtle, muted palette with accent highlights

## API Demos

| API | Use Case | Complexity |
|-----|----------|------------|
| EyeDropper | Pick colors from anywhere on screen | Low |
| Window Management | Multi-screen detection, fullscreen placement | Medium |
| WebRTC / WebCodecs | Camera access, video encoding/decoding | High |
| Web Share | Native OS share dialog | Low |
| Screen Wake Lock | Prevent screen from dimming | Low |
| Web Serial | Connect to hardware via serial port | Medium |
| Gamepad | Read game controller input | Medium |
| View Transitions | Smooth page/element transitions | Medium |
| AudioContext | Web Audio synthesis and visualization | Medium |
| File System Access | Read/write local files (Chrome) | Medium |
| Compression Streams | Native gzip compression | Low |

## Out of Scope (v1)
- User accounts / saving code
- Backend server (fully static)
- Collaborative editing
- Mobile-optimized layout (many APIs are desktop-only)

## Code Architecture Improvements (v1.1)
- **External code snippets**: Demo code extracted to separate `.js` files using Vite's `?raw` import query for easier editing and syntax highlighting in IDE
- **HTML support for examples**: Optional `html` field in examples for demos requiring HTML structure
- **UI polish**: Fixed modified indicator position (after Reset button), example drawer padding
