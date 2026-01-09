# Design: Add Example Routes

## Architecture Decisions

### 1. Route Structure with Explicit Default

**Decision**: Base route is intro page, sub-routes are playground editor

```
/api/audiocontext           → Intro page with preview + example links
/api/audiocontext/default   → Playground editor with default demo code
/api/audiocontext/node-editor → Playground editor with Node Editor example
```

**Rationale**:
- Base route provides overview with interactive preview
- All playgrounds have consistent sub-route structure
- "default" is explicit, not implicit
- No redirects needed - cleaner UX

**Implementation**:
- `$apiId.tsx` renders the intro page with preview
- `$apiId.$exampleId.tsx` handles all playground views (including "default")
- "default" is a reserved exampleId that maps to `demo.defaultCode`

### 2. Sidebar with Flat List

**Decision**: Show all demos and examples in a flat list, with examples indented under parent

```
AudioContext            (link to /api/audiocontext/default)
  └ Node Editor         (link to /api/audiocontext/node-editor)
Web Speech
  └ Basic ASR
  └ Continuous ASR
Gamepad                 (no indent if no examples)
EyeDropper
```

**Rationale**:
- Simple - no expand/collapse logic needed
- All options visible at a glance
- Few examples per demo, so list stays manageable

**Collapsed sidebar behavior**: Flyout popover on click

When sidebar is collapsed to icons only:
- Click on demo icon → Shows flyout popover with sub-items
- Popover contains: Demo name + list of examples as links
- Click outside popover → Closes it

### 3. Example ID Format

**Decision**: Use kebab-case slugs derived from example titles

- "Node Editor" → `node-editor`
- "Continuous Speech Recognition" → `continuous-asr`
- Default demo → `default` (reserved)

### 4. Code Persistence Strategy

**Decision**: Separate localStorage keys per example

- Default: `playground-code-{apiId}-default`
- Examples: `playground-code-{apiId}-{exampleId}`

**Migration**: Existing `playground-code-{apiId}` keys map to `playground-code-{apiId}-default`

### 5. Intro Page at Base Route

**Decision**: Base route shows intro page with preview, playgrounds are sub-routes

The `/api/{apiId}` route renders an intro page:

```
┌──────────────────────────────────────┐
│  🗣️ Web Speech API                   │
│  Convert speech to text and TTS      │
│                                      │
│  ┌────────────────────────────────┐  │
│  │  [Interactive Preview Demo]    │  │
│  │  (PreviewComponent rendered)  │  │
│  └────────────────────────────────┘  │
│                                      │
│  Examples:                           │
│  ┌─────────┐  ┌─────────────────┐   │
│  │ Default │  │Basic ASR        │   │
│  └─────────┘  └─────────────────┘   │
│  ┌─────────────────┐                │
│  │Continuous ASR   │                │
│  └─────────────────┘                │
└──────────────────────────────────────┘
```

**Implementation**:
- `$apiId.tsx` renders `IntroPage` component
- `PreviewComponent` from `ApiDemo` renders the interactive demo
- Example cards include "Default" and link to `/api/{apiId}/default`
- Other example cards link to `/api/{apiId}/{exampleId}`

**Rationale**:
- Showcases API capability before diving into code
- Provides navigation to examples
- Better onboarding than raw code editor

**Example preview components**:
- EyeDropper: Color picker button that shows picked color
- AudioContext: Mini waveform or oscillator demo
- Web Speech: "Say something" button with transcription display
- Gamepad: Controller icon that reacts to input

## Data Flow

```
URL: /api/audiocontext
         ↓
Route: $apiId.tsx (redirect)
         ↓
Redirect to: /api/audiocontext/default
```

```
URL: /api/audiocontext/default
         ↓
Route: $apiId.default.tsx
         ↓
DemoIntroPage: { demo, PreviewComponent, examples[] }
         ↓
Renders intro page with preview + example cards
```

```
URL: /api/audiocontext/node-editor
         ↓
Route: $apiId.$exampleId.tsx
         ↓
Loader: getExampleById('audiocontext', 'node-editor')
         ↓
ApiPlayground: { demo, example }
         ↓
Reset → example.code
Storage → 'playground-code-audiocontext-node-editor'
```

## File Structure

```
src/routes/api/
├── $apiId.tsx              # Redirect to /$apiId/default
├── $apiId.default.tsx      # Intro page with preview + example links
└── $apiId.$exampleId.tsx   # Code playground for examples

src/components/
├── api-playground.tsx      # Code editor playground
├── demo-intro-page.tsx     # NEW: Intro page template
├── sidebar-nav.tsx         # Flat list with examples indented
└── previews/               # Interactive preview components
    ├── eyedropper-preview.tsx
    ├── audiocontext-preview.tsx
    ├── web-speech-preview.tsx
    └── ...

src/demos/
├── types.ts                # DemoExample.id, ApiDemo.PreviewComponent
├── index.ts                # getExampleById(), redirect logic
└── *.ts                    # id field added to examples
```
