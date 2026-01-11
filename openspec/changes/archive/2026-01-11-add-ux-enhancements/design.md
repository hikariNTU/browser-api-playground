# Design: UX Enhancements

## Related APIs

### Data Structure
**Decision**: Store `relatedApis` as an array of demo IDs (strings) rather than full references.

**Rationale**:
- Demo IDs are stable and already used for routing
- Keeps demo definitions lightweight
- Allows bidirectional relationships without circular dependencies
- Lookup via `getDemoById()` is already available

**Example**:
```typescript
relatedApis?: string[]  // e.g., ['audiocontext', 'webrtc-webcodecs']
```

### Relationship Mapping
| Demo | Related APIs |
|------|--------------|
| media-recorder | audiocontext, webrtc-webcodecs |
| audiocontext | media-recorder, web-speech |
| web-speech | audiocontext, media-recorder |
| webrtc-webcodecs | media-recorder, window-management |
| window-management | webrtc-webcodecs |
| gamepad | device-experimental |
| device-experimental | gamepad, web-serial |
| web-serial | device-experimental |
| eyedropper | view-transitions |
| view-transitions | eyedropper |
| file-system-access | compression-streams |
| compression-streams | file-system-access |
| web-share | broadcast-channel |
| broadcast-channel | web-share |
| screen-wake-lock | (none - standalone) |

### UI Placement
Display as a card section at the bottom of intro page, after Examples grid. Uses existing Card components with clickable links to related demo intro pages.

---

## Global Search

### Trigger
**Decision**: `⌘+K` (Mac) / `Ctrl+K` (Windows/Linux) as industry-standard command palette trigger.

**Rationale**:
- VS Code, Slack, Notion, Linear all use `⌘+K` for quick search
- Familiar pattern for developers
- Same guard as other shortcuts: ignore when focused on inputs/textarea/Monaco

### Data Sources
Search aggregates three content types:

| Source | Count | Result Action |
|--------|-------|---------------|
| Demos | ~15 | Navigate to `/api/{demoId}` |
| Examples | ~40 | Navigate to `/api/{demoId}/{exampleId}` |
| Appendix APIs | ~40 | Open MDN docs in new tab |

### Search Algorithm
**Decision**: Client-side filtering with case-insensitive substring matching.

**Rationale**:
- Total items < 100, no need for server-side search
- Instant feedback without network latency
- Simple implementation using `filter()` + `toLowerCase().includes()`

### Result Ranking
1. **Demos** - highest priority (main content)
2. **Examples** - second priority (nested under demos)
3. **Appendix APIs** - lowest priority (reference only)

Within each group, name matches rank above description matches.

### UI Component
**Decision**: Modal dialog with cmdk-style interface (shadcn Command component).

**Rationale**:
- shadcn provides `<Command>` component built on cmdk
- Includes built-in keyboard navigation (arrow keys, Enter)
- Familiar command palette UX
- Supports grouping results by type

---

## Keyboard Shortcuts Modal

### Trigger
**Decision**: `?` key (Shift+/) as industry-standard help trigger.

**Rationale**:
- GitHub, Gmail, and most web apps use `?` for shortcuts help
- Doesn't conflict with Monaco editor (which uses `F1` for command palette)
- Same guard as slides toggle: ignore when focused on inputs/textarea/Monaco

### Content
Display all global shortcuts:
| Shortcut | Action |
|----------|--------|
| `⌘/` or `Ctrl+/` | Toggle slides panel |
| `?` | Show keyboard shortcuts |
| `⌘+Enter` | Run code (in playground) |
| `⌘+Shift+F` | Format code (in playground) |
| `⌘+Shift+P` | Monaco command palette (in editor) |

### UI Component
**Decision**: Modal dialog using shadcn Dialog component.

**Rationale**:
- Full focus trap for accessibility
- Standard pattern for help overlays
- Close via Escape, click outside, or × button
- Can be triggered from anywhere in the app

### State Management
- Modal open state in `__root.tsx` alongside other global UI state
- No persistence needed (help modal is ephemeral)
