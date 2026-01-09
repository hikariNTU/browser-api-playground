# Design: Browser API Playground

## Context
This is a greenfield static website for a frontend team tech sharing session. The primary audience is 20 engineers who want to experiment with browser APIs in real-time using a live code editor.

## Goals
- Engineers can edit and run code instantly without setup
- Each API demo is self-contained and shareable via URL
- Works offline after initial load (static deployment)
- Clean, modern UI that showcases the APIs effectively

## Non-Goals
- Production-grade error handling for every edge case
- Mobile responsiveness (most APIs are desktop-only)
- Persistent storage of user code across sessions
- Server-side execution

## Architecture Decisions

### 0. UI Component Library
**Decision**: Use shadcn/ui built on Radix primitives

**Rationale**:
- Copy-paste components (not a dependency) — full control
- Built on accessible Radix primitives
- Works seamlessly with TailwindCSS
- Easily customizable to match minimalist aesthetic

### 0.1 Design Aesthetic
**Decision**: Minimalist modern with generous whitespace

**Principles**:
- Large padding and margins — content breathes
- Subtle borders and shadows — not boxy
- Muted color palette with single accent color
- Typography-focused — clear hierarchy, ample line-height
- Negative space is intentional — less is more

**Component styling**:
- Cards: `rounded-xl border border-border/50 shadow-sm`
- Buttons: Ghost/outline variants preferred, solid for primary actions
- Spacing: Minimum `p-6` for containers, `gap-6` between sections
- Text: `text-muted-foreground` for secondary text, generous `leading-relaxed`

### 1. Monaco Editor for Live Code
**Decision**: Use `@monaco-editor/react` with TypeScript support

**Rationale**:
- Engineers are familiar with VS Code, Monaco is the same editor
- Syntax highlighting, autocomplete, error squiggles
- Can provide browser API type definitions for better DX

**Trade-off**: ~2MB bundle size, but acceptable for desktop-focused demo site

### 2. Code Execution Strategy
**Decision**: Execute user code in a sandboxed iframe using `srcdoc` + `Function()` constructor

**Rationale**:
- Isolates user code from main app state
- Can catch errors without crashing the playground
- Allows DOM manipulation in isolated context

**Alternative considered**: `eval()` in same context - rejected due to security/stability concerns

### 3. State Management
**Decision**: 
- `jotai` for local UI state (editor content, execution results, panel visibility)
- `nuqs` for URL-synced state (selected API, code snippets for sharing)

**Rationale**:
- Jotai is minimal and works well with React 18 concurrent features
- nuqs enables shareable URLs like `?api=eyedropper&code=base64...`

### 4. Routing Structure
**Decision**: TanStack Router with file-based routes

```
/                    → Home (API grid overview)
/api/$apiId          → Individual API playground
/api/$apiId/examples → Curated examples for each API
```

### 5. Demo Component Pattern
Each API demo follows a consistent structure:

```tsx
interface ApiDemo {
  id: string;
  name: string;
  description: string;
  mdnUrl: string;
  caniuseId: string;
  defaultCode: string;
  supportCheck: () => boolean;
  OutputComponent: React.FC<{ result: unknown }>;
}
```

### 6. Browser Compatibility Display
**Decision**: Use caniuse-lite data + runtime feature detection

- Show static badge from caniuse data
- Run `supportCheck()` on mount to show "Your browser: ✅/❌"

## Component Hierarchy

```
App
├── Layout
│   ├── Sidebar (API navigation)
│   └── MainContent
│       └── <Outlet /> (router)
├── HomePage
│   └── ApiGrid (cards for each API)
└── ApiPlaygroundPage
    ├── ApiHeader (name, description, MDN link, compat badge)
    ├── EditorPanel
    │   ├── MonacoEditor
    │   └── RunButton
    ├── OutputPanel
    │   ├── ResultDisplay (API-specific visualization)
    │   └── ConsoleOutput (logs, errors)
    └── ExamplesDrawer (preset code snippets)
```

## File Structure

```
src/
├── main.tsx
├── routes/
│   ├── __root.tsx
│   ├── index.tsx
│   └── api/
│       └── $apiId.tsx
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── editor/
│   │   ├── MonacoEditor.tsx
│   │   ├── RunButton.tsx
│   │   └── CodeExecutor.tsx
│   ├── output/
│   │   ├── OutputPanel.tsx
│   │   └── ConsoleOutput.tsx
│   └── common/
│       ├── CompatBadge.tsx
│       └── MdnLink.tsx
├── demos/
│   ├── index.ts (registry)
│   ├── eyedropper/
│   │   ├── config.ts
│   │   ├── defaultCode.ts
│   │   └── OutputDisplay.tsx
│   ├── window-management/
│   ├── webrtc-webcodecs/
│   ├── web-share/
│   ├── screen-wake-lock/
│   ├── web-serial/
│   ├── gamepad/
│   └── view-transitions/
├── hooks/
│   ├── useCodeExecution.ts
│   └── useBrowserSupport.ts
├── store/
│   └── atoms.ts
└── lib/
    ├── sandbox.ts
    └── types.ts
```

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| User code crashes browser tab | High | Execute in iframe sandbox, add timeout |
| Some APIs require HTTPS | Medium | Document in README, use `localhost` for dev |
| Monaco bundle size | Low | Lazy load editor, show skeleton |
| API permissions blocked | Medium | Show clear error messages with instructions |

## Resolved Questions
1. ✅ **Dark/light theme toggle** — Yes, engineers love dark mode
2. ✅ **Persist code to localStorage** — Yes, for convenience across sessions
