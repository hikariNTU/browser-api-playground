# Change: Add Pinch-to-Minimize/Restore for Slides Panel

## Why
Users need a quick, intuitive way to temporarily minimize the slides panel to view the underlying content without closing it entirely. Trackpad pinch gestures are natural interactions for scaling/minimizing floating panels. The gesture also supports maximizing the panel for full-screen viewing.

## What Changes
- Add pinch gesture detection on the slides panel (Safari gesture events + Chrome wheel+ctrlKey)
- Implement three-state flow: Maximized ↔ Normal ↔ Minimized
  - Pinch in (fingers together): Maximized → Normal → Minimized
  - Pinch out (fingers apart): Minimized → Normal → Maximized
- Minimized state collapses panel to a compact 280×48px strip
- Add cooldown mechanism to prevent continuous state jumps during sensitive gestures
- Persist minimized state preference in localStorage

## Technical Details
- Safari: Uses native `gesturestart`/`gesturechange`/`gestureend` events with scale delta threshold of ±0.15
- Chrome/Firefox: Uses wheel events with `ctrlKey=true` (trackpad pinch), accumulates deltaY over 200ms window with threshold of ±25
- Cooldown: After state transition, blocks further transitions until gesture ends (Safari) or 300ms idle (Chrome)

## Impact
- Affected specs: `slides`
- Affected code: `code/src/components/slides-panel.tsx`
