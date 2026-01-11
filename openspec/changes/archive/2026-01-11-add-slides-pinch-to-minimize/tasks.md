## 1. Implementation

- [x] 1.1 Add minimized state management to SlidesPanel component
  - Added `isMinimized` state with `loadMinimizedState()`/`saveMinimizedState()` helpers
  - Storage key: `slides-panel-minimized`
- [x] 1.2 Implement pinch gesture detection for Safari (gesturestart/gesturechange/gestureend events)
  - Scale delta threshold: ±0.15 for responsive feel
- [x] 1.3 Implement pinch gesture detection for Chrome (wheel events with ctrlKey)
  - Added `pinchAccumulatorRef` to accumulate small deltaY values
  - Reset accumulator after 200ms idle timeout
  - Accumulated threshold: ±25 for consistent behavior
- [x] 1.4 Add cooldown mechanism to prevent continuous state jumps
  - `pinchCooldownRef` blocks transitions during active gesture
  - Safari: Cooldown resets on `gestureend`
  - Chrome: Cooldown resets after 300ms of no wheel events
- [x] 1.5 Implement three-state gesture flow (Maximized ↔ Normal ↔ Minimized)
  - Pinch in: Maximized → Normal → Minimized
  - Pinch out: Minimized → Normal → Maximized
- [x] 1.6 Create minimized panel UI (280×48px compact strip)
  - Shows slide number/total and current slide title
  - Expand button to restore via click
- [x] 1.7 Add smooth CSS transitions (0.2s ease-out)
- [x] 1.8 Update keyboard/drag handlers to restore panel when minimized

## 2. Validation

- [x] 2.1 Test pinch gesture on trackpad (macOS Safari and Chrome)
- [x] 2.2 Verify cooldown prevents accidental multi-state jumps
- [x] 2.3 Verify state persistence across page reloads
- [x] 2.4 Run lint, format, and build checks
