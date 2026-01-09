# Implementation Tasks

## Dependencies
- Task 11.2 requires `qrcode.react` library installation
- Tasks can mostly run in parallel except where noted

## 11. UI Polish and Feature Improvements

- [x] 11.1 Fix navbar and header positioning
  - [x] Add `overscroll-none` to root layout container
  - [x] Ensure `position: fixed` or `sticky` behavior for sidebar and header
  - [x] Test on Safari/iOS where overscroll bounce is most prominent

- [x] 11.2 Add QR code share button
  - [x] Install `qrcode.react` library: `npm install qrcode.react`
  - [x] Create `QRShareButton` component with popover/dialog
  - [x] Add button next to ThemeToggle in sidebar footer (stacked horizontally)
  - [x] Generate QR code from current page URL
  - [x] Include "Copy URL" button in popover

- [x] 11.3 Improve Supported badge tooltip
  - [x] Update tooltip to show how to check availability
  - [x] Display relevant code snippet (e.g., `'EyeDropper' in window`)
  - [x] Use mono font for code display in tooltip

- [x] 11.4 Make toolbar buttons icon-only
  - [x] Change Format button to icon-only with tooltip
  - [x] Change Copy button to icon-only with tooltip  
  - [x] Change Examples button to icon-only with tooltip
  - [x] Keep Run and Reset buttons with labels (primary actions)

- [x] 11.5 Fix Monaco hover card clipping
  - [x] Add `fixedOverflowWidgets: true` to Monaco editor options
  - [x] Test hover cards appear correctly at panel edges

- [x] 11.6 Add MDN docs preview modal
  - [x] Create `MDNPreviewDialog` component using shadcn Dialog
  - [x] Update "MDN Docs" link to open preview dialog instead of new tab
  - [x] Add "Open in new tab" button inside dialog
  - [x] Handle iframe sandbox restrictions for MDN pages
  - [x] Add loading state for iframe

- [x] 11.7 Convert user gesture hint to help icon
  - [x] Replace "Click buttons in this area..." text with HelpCircle icon
  - [x] Add tooltip explaining user gesture requirement
  - [x] Make icon subtle (muted foreground color)

- [x] 11.8 Add icons to Output and Console headers
  - [x] Add `Monitor` or `AppWindow` icon before "Output"
  - [x] Add `Terminal` icon before "Console"
  - [x] Maintain consistent sizing with existing elements

- [x] 11.9 Fix console clear behavior
  - [x] Separate console clearing from iframe removal
  - [x] `clearConsole()` should only reset messages array and error state
  - [x] Keep `clear()` for full reset including iframe
  - [x] Update Clear button to use the new `clearConsole()` that preserves iframe
