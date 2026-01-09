# Change: Visualize Screen Positions

## Why
The current Window Management API demo displays screens in a simple flex-wrap layout that doesn't reflect their actual physical arrangement. The API provides `left`, `top`, `width`, and `height` properties for each screen, which describe the exact position relationship between monitors. Users would benefit from seeing a visual representation that matches their actual monitor setup.

**Current behavior:** Screens shown in a horizontal row with equal gaps, ignoring position data.

**Desired behavior:** Screens rendered in a scaled coordinate system matching their real positions (e.g., stacked vertically, side-by-side with offset, etc.).

## What Changes

### 1. Update Default Demo Code
Modify `src/demos/code/window-management.js` to:
- Calculate the bounding box of all screens (min/max of left, top, right, bottom)
- Use CSS `position: absolute` with scaled `left` and `top` values
- Scale all dimensions proportionally to fit within the display container
- Maintain aspect ratios and relative positions

### 2. Visual Enhancements
- Show screen labels with their actual position coordinates
- Highlight the primary screen distinctly
- Mark the current screen where the window is located
- Add coordinate axes or origin marker for context

## Impact
- **Modified file**: `src/demos/code/window-management.js` - Update visual rendering logic
- **Modified file**: `src/demos/code/window-management.html` - Possibly adjust container styling

## Example
For a setup with:
- Screen 1: 2560x1440 at (0, 0) - primary
- Screen 2: 1920x1080 at (2560, 200) - to the right, slightly lower

The visualization would show Screen 2 positioned to the right of Screen 1 with a vertical offset, matching the physical arrangement.
