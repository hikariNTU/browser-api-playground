# Proposal: Add Browser Compatibility Display and API Appendix Page

## Why

1. **Browser compatibility visibility** - Users don't know if an API works in Safari, Firefox, or mobile browsers until they try. The current "Supported" badge only reflects the current browser.

2. **Discoverability of additional APIs** - The playground covers ~15 APIs but dozens more exist. An appendix page helps visitors explore and learn about APIs not yet demoed.

3. **Support check transparency** - When hovering/clicking the "Supported" badge, users should see the actual JavaScript code used to detect support (e.g., `'EyeDropper' in window`).

## What Changes

### 1. Browser Compatibility Data Integration
- Add `@mdn/browser-compat-data` package for authoritative compatibility info
- Create a utility to look up compat data by API path (e.g., `api.EyeDropper`)
- Add `compatKey` field to `ApiDemo` type to map demos to MDN compat paths

### 2. Browser Compatibility Display
Show support icons for 5 browsers:
- Chrome (desktop)
- Firefox (desktop)  
- Safari (desktop)
- Safari iOS (mobile)
- Chrome Android (mobile)

Display locations:
- **Home page cards** - Small browser icons with ✓/✗ below description
- **API intro pages** - Browser compat section with version numbers
- **Sidebar** - Tooltip on hover showing browser icons

### 3. Support Check Code Snippet
- Make "Supported" badge interactive (click or hover)
- Show popover/tooltip with the `supportCheck` code snippet
- Helps users understand how feature detection works

### 4. API Appendix Page
- New route at `/appendix` or `/more-apis`
- Simple list of additional browser APIs not yet demoed
- Each item: API name, one-line description, MDN link, browser compat icons
- Categories optional (can be flat list initially)

## Affected Files

- `package.json` - Add `@mdn/browser-compat-data`
- `src/demos/types.ts` - Add `compatKey` field
- `src/demos/*.ts` - Add `compatKey` to each demo
- `src/lib/browser-compat.ts` - New utility for compat lookups
- `src/components/browser-compat-icons.tsx` - New component
- `src/routes/index.tsx` - Add compat icons to cards
- `src/components/intro-page.tsx` - Add compat section
- `src/routes/__root.tsx` - Add tooltip to sidebar badges
- `src/routes/appendix.tsx` - New appendix page
- `src/components/support-check-popover.tsx` - New component

## Out of Scope

- Full demos for appendix APIs (just links)
- Historical version data (just current support yes/no)
- Polyfill suggestions
