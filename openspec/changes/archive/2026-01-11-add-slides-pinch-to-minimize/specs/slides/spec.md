## ADDED Requirements

### Requirement: Pinch Gesture Three-State Panel Control
The system SHALL allow users to control the slides panel state (Maximized ↔ Normal ↔ Minimized) using trackpad pinch gestures.

#### Scenario: User pinches in to minimize panel
- **WHEN** slides panel is open in normal size
- **AND** user performs a pinch-in gesture (two-finger pinch) on the panel
- **THEN** the panel smoothly transitions to a minimized state (280×48px strip)
- **AND** minimized panel displays current slide number/total and title
- **AND** minimized state is saved to localStorage

#### Scenario: User pinches in to restore from maximized
- **WHEN** slides panel is maximized
- **AND** user performs a pinch-in gesture on the panel
- **THEN** the panel transitions to normal size
- **AND** gesture cooldown activates to prevent immediate further transitions

#### Scenario: User pinches out to restore from minimized
- **WHEN** slides panel is in minimized state
- **AND** user performs a pinch-out gesture (two-finger expand) on the panel
- **THEN** the panel smoothly transitions back to normal size
- **AND** normal state is saved to localStorage

#### Scenario: User pinches out to maximize panel
- **WHEN** slides panel is in normal size
- **AND** user performs a pinch-out gesture on the panel
- **THEN** the panel transitions to maximized state (full viewport minus 40px margins)

#### Scenario: Cooldown prevents continuous state jumps
- **WHEN** user performs a pinch gesture that triggers a state change
- **AND** user continues the same gesture without releasing
- **THEN** no further state changes occur until gesture ends
- **AND** for Chrome, cooldown resets after 300ms of no pinch events

#### Scenario: Minimized panel shows essential info
- **WHEN** slides panel is minimized
- **THEN** panel displays as a 280×48px strip at bottom-right
- **AND** shows current slide number and title in compact form
- **AND** shows an expand button to restore via click

#### Scenario: User clicks expand button to restore
- **WHEN** slides panel is minimized
- **AND** user clicks the expand button
- **THEN** the panel restores to its previous normal size

#### Scenario: Minimized state persists across sessions
- **WHEN** user minimizes the panel
- **AND** user reloads the page
- **AND** user opens slides panel again
- **THEN** panel opens in minimized state

## Technical Implementation Notes

**Safari Gesture Detection:**
- Uses native `gesturestart`, `gesturechange`, `gestureend` events
- Tracks `GestureEvent.scale` delta from gesture start
- Threshold: scale delta of ±0.15 triggers state change
- Cooldown resets on `gestureend` event

**Chrome/Firefox Gesture Detection:**
- Uses wheel events with `ctrlKey=true` (how trackpad pinch is reported)
- Accumulates `deltaY` values in `pinchAccumulatorRef`
- Accumulator resets after 200ms of no pinch events
- Threshold: accumulated deltaY of ±25 triggers state change
- Cooldown: 300ms timeout after state transition before allowing new transitions

**State Flow:**
```
Maximized ←(pinch-out)── Normal ──(pinch-out)→ (blocked at max)
    │                      │
(pinch-in)            (pinch-in)
    ↓                      ↓
  Normal ←(pinch-out)── Minimized ──(pinch-in)→ (blocked at min)
```
