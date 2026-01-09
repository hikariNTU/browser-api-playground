# Tasks

## Task Group 1: Browser Compat Data Infrastructure

- [x] **1.1** Install `@mdn/browser-compat-data` package
- [x] **1.2** Create `src/lib/browser-compat.ts` utility with:
  - Function to look up compat data by MDN path
  - Function to extract support status for Chrome, Firefox, Safari, Safari iOS, Chrome Android
  - Types for compat results
- [x] **1.3** Add `compatKey` field to `ApiDemo` type in `src/demos/types.ts`
- [x] **1.4** Add `compatKey` values to all existing demos (e.g., `api.EyeDropper`, `api.AudioContext`)

## Task Group 2: Browser Compat Icons Component

- [x] **2.1** Create `src/components/browser-compat-icons.tsx` component
  - Props: `compatKey: string`, `size?: 'sm' | 'md'`
  - Renders 5 browser icons with ✓/✗ indicators
  - Tooltip on each icon showing browser name and version (if available)
- [x] **2.2** Add browser SVG icons (Chrome, Firefox, Safari) or use simple emoji/text fallback

## Task Group 3: Support Check Popover

- [x] **3.1** Create `src/components/support-check-popover.tsx` component
  - Wraps the "Supported/Unsupported" badge
  - On click/hover shows popover with `supportCheck` code snippet
  - Syntax highlighted code block

## Task Group 4: Update Home Page Cards

- [x] **4.1** Import `BrowserCompatIcons` in `src/routes/index.tsx`
- [x] **4.2** Add compat icons below card description
- [x] **4.3** Wrap existing badge with `SupportCheckPopover`

## Task Group 5: Update API Intro Pages

- [x] **5.1** Add "Browser Support" section to `src/components/intro-page.tsx`
- [x] **5.2** Show larger compat display with browser names and versions
- [x] **5.3** Add `SupportCheckPopover` to the support status indicator

## Task Group 6: Update Sidebar

- [x] **6.1** Add tooltip to sidebar support badges in `src/routes/__root.tsx`
- [x] **6.2** Tooltip shows browser compat icons on hover

## Task Group 7: API Appendix Page

- [x] **7.1** Create `src/data/appendix-apis.ts` with list of additional APIs:
  - Each entry: `{ name, description, mdnUrl, compatKey }`
  - Include ~20-30 notable APIs not in demos
- [x] **7.2** Create `src/routes/appendix.tsx` route
  - Simple scrollable list with cards
  - Each card: API name, description, MDN link, browser compat icons
- [x] **7.3** Add "More APIs" link to sidebar navigation
- [x] **7.4** Add "Explore More APIs" link to home page footer

## Task Group 8: Validation

- [x] **8.1** Run `npm run build` to verify no TypeScript errors
- [x] **8.2** Test compat icons render correctly for all demos
- [x] **8.3** Test appendix page lists APIs with correct compat data
- [x] **8.4** Test support check popover shows code snippet

## Dependencies

- Task Groups 1-2 must complete before Groups 4-7
- Task Group 3 can run in parallel with Group 2
- Task Groups 4-7 can be parallelized after dependencies met
