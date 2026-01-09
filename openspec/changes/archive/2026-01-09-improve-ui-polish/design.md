# Design: UI Polish and Feature Improvements

## Architecture Decisions

### 1. Fixed Layout Positioning

**Decision**: Use CSS `overscroll-behavior: none` on the root container combined with `overflow: hidden` on the flex layout.

**Rationale**: 
- CSS-only solution, no JavaScript needed
- Prevents iOS Safari bounce effect
- Works consistently across browsers

**Implementation**:
```css
.root-container {
  overscroll-behavior: none;
  overflow: hidden;
  height: 100vh;
}
```

### 2. QR Code Library Choice

**Decision**: Use `qrcode.react` for QR code generation.

**Rationale**:
- Lightweight React-specific library
- No canvas dependencies needed
- TypeScript support
- SVG output (crisp at any size)
- Well-maintained with 1M+ weekly downloads

**Alternatives Considered**:
- `qrcode` (pure JS) - Would need wrapper component
- `react-qr-code` - Less actively maintained

### 3. MDN Preview Implementation

**Decision**: Use shadcn Dialog with embedded iframe, with fallback messaging.

**Rationale**:
- MDN allows iframe embedding (no X-Frame-Options blocking)
- Dialog provides clean modal experience
- Fallback needed if specific pages block embedding

**Risks**:
- Some MDN pages may have CSP restrictions
- Cross-origin limitations on iframe communication

**Mitigation**:
- Add prominent "Open in new tab" link as primary action
- Show helpful error message if iframe fails to load

### 4. Console Clear Behavior

**Decision**: Split `clear()` into two functions:
- `clearConsole()` - Clears messages only
- `clearAll()` - Full reset including iframe

**Rationale**:
- Users expect "Clear" to clear logs, not the visual output
- Preserves running demos while clearing console
- Reset button handles full cleanup

**Implementation**:
```typescript
const clearConsole = useCallback(() => {
  setState({ isRunning: false, messages: [], error: null })
}, [])

const clearAll = useCallback(() => {
  clearConsole()
  if (iframeRef.current) {
    iframeRef.current.remove()
    iframeRef.current = null
  }
  if (outputContainerRef.current) {
    outputContainerRef.current.innerHTML = ''
  }
}, [clearConsole, outputContainerRef])
```

### 5. Toolbar Button Density

**Decision**: Keep primary actions (Run, Reset) with labels; secondary actions (Format, Copy, Examples) as icon-only with tooltips.

**Rationale**:
- Primary actions should be immediately recognizable
- Secondary actions used less frequently
- Reduces toolbar width for narrow panels
- Tooltips provide discoverability

### 6. Monaco Fixed Overflow Widgets

**Decision**: Enable `fixedOverflowWidgets: true` in Monaco options.

**Rationale**:
- Built-in Monaco option for this exact use case
- Renders widgets (hover cards, autocomplete) as fixed position
- Prevents clipping by panel containers
- No custom CSS needed

## Component Structure

```
src/
├── components/
│   ├── qr-share-button.tsx     # New: QR code popover
│   ├── mdn-preview-dialog.tsx  # New: MDN iframe modal
│   └── api-playground.tsx      # Modified: toolbar, icons, clear
├── hooks/
│   └── use-code-execution.ts   # Modified: split clear functions
└── routes/
    └── __root.tsx              # Modified: fixed positioning
```
