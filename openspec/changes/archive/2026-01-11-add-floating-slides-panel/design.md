# Design: Floating Slides Panel

## Architecture Decision

### Slide Framework Choice: Custom React + Markdown

**Rejected alternatives:**
- **Slidev**: Vue-based, would add significant complexity to React project
- **Reveal.js**: Full-featured but heavyweight for "quick topics" use case
- **Spectacle**: Good React integration but still presentation-focused with ceremony
- **Marp**: CLI-focused, harder to embed dynamically

**Chosen approach:** Lightweight custom solution using:
- `react-markdown` for Markdown parsing
- `remark-gfm` for GitHub Flavored Markdown (tables, strikethrough)
- Custom CSS for slide styling
- Native drag/resize APIs for the floating panel

**Rationale:** The user explicitly stated slides are "more like appendix or quick topic instead of full presentation." A full presentation framework would be overkill. A simple Markdown renderer in a floating panel matches the actual need.

## Slide File Structure

```
/code/slides/
├── index.md          # Slide deck manifest (optional, or auto-discover)
├── 01-intro.md       # Individual slide files
├── 02-webrtc-usecase.md
├── 03-audio-context-demo.md
└── assets/           # Images, videos referenced by slides
    ├── project-screenshot.png
    └── demo-video.mp4
```

**Rationale:** Keeping slides inside `/code/` ensures Vite can access them directly without config changes, and the existing GitHub Actions build pipeline works unchanged.

### Slide Format

Each `.md` file represents one slide (or use `---` separator for multi-slide files):

```markdown
# WebRTC in Production

Real-time video chat for remote collaboration tool.

![Screenshot](./assets/webrtc-screenshot.png)

**Key APIs used:**
- RTCPeerConnection
- MediaStream
- getUserMedia()

[View Demo](/api/webrtc-webcodecs)
```

## Floating Panel Behavior

### Position & Size
- Default: Bottom-right corner, 400x300px
- Resizable: Min 300x200px, max 80% viewport
- Draggable: Click header to drag anywhere on screen
- Persisted: Save position/size to localStorage

### Z-Index Strategy
- Panel uses `z-index: 50` (above content, below modals)
- When focused/active: `z-index: 60`

### Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + /` | Toggle panel visibility |
| `←` / `→` | Previous/next slide (when panel focused) |
| `Escape` | Close panel |
| `Home` / `End` | First/last slide |

## State Management

```typescript
interface SlidesState {
  isOpen: boolean
  currentSlideIndex: number
  slides: Slide[]
  position: { x: number; y: number }
  size: { width: number; height: number }
}
```

State stored in:
- `isOpen`, `currentSlideIndex`: React state (ephemeral)
- `position`, `size`: localStorage (persisted)
- `slides`: Loaded once on mount from `/slides/*.md`

## Build Integration

Slides are in `/code/slides/`, so Vite can access them directly:

```typescript
// Lazy load slide content only when needed
const slideModules = import.meta.glob('./slides/*.md', { 
  query: '?raw', 
  import: 'default',
  eager: false  // Lazy load each slide file
})
```

## Lazy Loading Strategy

The entire slides feature is lazy loaded to minimize initial bundle size:

```typescript
// In __root.tsx - only load component when user triggers shortcut
const SlidesPanel = lazy(() => import('@/components/slides-panel'))

// State tracks if user has ever opened slides
const [slidesRequested, setSlidesRequested] = useState(false)

// On Cmd+/ press:
if (!slidesRequested) {
  setSlidesRequested(true)  // Triggers lazy load
}
setSlidesOpen(prev => !prev)

// In render:
{slidesRequested && (
  <Suspense fallback={<LoadingSpinner />}>
    <SlidesPanel open={slidesOpen} onClose={() => setSlidesOpen(false)} />
  </Suspense>
)}
```

**What gets lazy loaded:**
1. `slides-panel.tsx` component
2. `react-markdown` and `remark-gfm` dependencies (imported by slides-panel)
3. Slide `.md` file contents (via dynamic import.meta.glob)

**Initial bundle impact:** Near zero - only the keyboard shortcut listener is in the main bundle.

## Video Embedding

Support two patterns:
1. **Local videos**: `![](./assets/demo.mp4)` → renders as `<video>` element
2. **YouTube/external**: `[![](thumbnail.jpg)](https://youtube.com/...)` or custom directive

Keep it simple - just support `<video>` tag in Markdown for local files initially.

## Slide Preview Strip

A horizontal strip of slide thumbnails at the bottom of the panel:

```
┌─────────────────────────────────┐
│  [Header: Slide Title]    [×]   │
├─────────────────────────────────┤
│                                 │
│       Main Slide Content        │
│                                 │
│                                 │
├─────────────────────────────────┤
│ [1] [2] [▣3] [4] [5] [6] →     │  ← Preview strip (scrollable)
└─────────────────────────────────┘
```

**Implementation:**
- Render each slide's Markdown at ~60px height with `overflow: hidden`
- Apply `scale(0.15)` + `transform-origin: top left` for mini preview
- Highlight current slide with border/background
- Horizontal scroll if slides overflow strip width
- Click thumbnail → navigate to that slide

**Simplification:** Show slide number + first heading text instead of full render if performance is an issue.
