# Change: Add Example Routes

## Why

The current example system has several UX issues:

1. **Reset is broken for examples** - The Reset button always resets to the default demo code, not the currently loaded example.

2. **Examples are not URL-addressable** - Examples are loaded via a dropdown and modify in-memory state only. Users cannot share or bookmark specific examples.

3. **Examples are hard to discover** - Hidden in a dropdown menu that users may not notice. Examples should be visible in the navigation sidebar.

4. **No visual preview** - Users must click into each demo to understand what it does. The home page should showcase demos with visual previews.

## What Changes

### 1. Restructure Routes with Explicit Default

All demos now have explicit sub-routes. The base route is an intro page:

- `/api/audiocontext` → Intro page with preview + example links
- `/api/audiocontext/default` → Playground editor with default demo code
- `/api/audiocontext/node-editor` → Playground editor with Node Editor example

No redirects - the base route IS the intro page with interactive preview.

### 2. Sidebar Navigation - Flat List

Replace the examples dropdown with a flat list in the sidebar showing all demos and examples:

```
AudioContext
  └ Node Editor
Web Speech
  └ Basic ASR  
  └ Continuous ASR
Gamepad
EyeDropper
...
```

Examples are shown indented under their parent demo. Since there aren't many examples, no need for expand/collapse - just show everything.

**Collapsed mode behavior:**
- Clicking an API icon shows a flyout popover listing the default + examples
- Popover allows direct navigation to any sub-page

### 3. Fix Reset Button Behavior

Reset restores the code for the **current route**:
- On `/api/audiocontext/default` → Reset to default code
- On `/api/audiocontext/node-editor` → Reset to Node Editor code

### 4. Default Demo Page with Interactive Preview

The default page (`/api/{apiId}/default`) becomes an **intro/overview page** with:
- Interactive preview component showcasing the API's core functionality
- Links/cards to all available examples for this API
- Quick way to jump into the code playground

This replaces the current behavior where default loads straight into the code editor.

Layout for `/api/web-speech/default`:
```
┌─────────────────────────────────────────────────────┐
│  🗣️ Web Speech API                                  │
│  Convert speech to text and text to speech          │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │     [Interactive TTS/ASR Preview Demo]       │   │
│  │     (Try it: speak or click to hear)        │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  Examples:                                          │
│  ┌──────────────┐  ┌──────────────┐                │
│  │ Basic ASR    │  │ Continuous   │                │
│  │ Single shot  │  │ ASR          │                │
│  │ recognition  │  │ Live stream  │                │
│  └──────────────┘  └──────────────┘                │
│                                                     │
│  [Open Code Playground →]                          │
└─────────────────────────────────────────────────────┘
```

### 5. Add Example IDs and Preview Components

Updates to demo definitions:

```typescript
interface DemoExample {
  id: string        // URL slug, e.g., "node-editor"
  title: string
  description: string
  code: string
  html?: string
}

interface ApiDemo {
  // ... existing fields
  PreviewComponent?: React.ComponentType  // Optional live preview for home page
}
```

## Impact

- **Modified files:**
  - `src/routes/api/$apiId.tsx` → Redirect to default sub-route
  - `src/routes/api/$apiId.default.tsx` → NEW: Intro page with preview + example links
  - `src/routes/api/$apiId.$exampleId.tsx` → NEW: Code playground for examples
  - `src/routes/__root.tsx` → Sidebar with flat list including examples
  - `src/demos/types.ts` → Add `id` to `DemoExample`, add `PreviewComponent` to `ApiDemo`
  - `src/demos/*.ts` → Add `id` to all example definitions
  - `src/components/api-playground.tsx` → Accept example prop, fix reset logic
  
- **New components:**
  - `src/components/previews/*.tsx` → Interactive preview components per API
  - `src/components/demo-intro-page.tsx` → NEW: Template for default intro pages

## Decisions Needed

None - requirements are clear:
- Collapsed sidebar: Flyout popover ✓
- Home page previews: Live components ✓

