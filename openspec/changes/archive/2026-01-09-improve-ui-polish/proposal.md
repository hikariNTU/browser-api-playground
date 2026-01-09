# Change: UI Polish and Feature Improvements

## Why
Multiple small UI/UX improvements to enhance the playground experience: preventing overscroll issues, adding QR code sharing, improving tooltip information, optimizing toolbar space, fixing Monaco hover clipping, adding MDN preview, and fixing console clear behavior.

## What Changes
1. **Fixed layout positioning** - Make navbar and header fixed to prevent movement during overscroll bounce
2. **QR Code sharing** - Add share button with QR code popup next to dark mode toggle
3. **Availability tooltip** - Show code snippet for checking API availability in Supported badge tooltip
4. **Icon-only toolbar buttons** - Make Format, Copy, Examples buttons icon-only in editor toolbar
5. **Monaco hover fix** - Configure Monaco editor's `fixedOverflowWidgets` to prevent hover cards clipping
6. **MDN doc preview** - Add floating modal/dialog to preview MDN docs in iframe
7. **User gesture hint** - Convert "Click buttons in this area..." text to a help icon (?) with tooltip
8. **Section icons** - Add icons before "Output" and "Console" labels
9. **Console clear fix** - Fix clear function to only clear console messages, not the preview HTML iframe

## Impact
- Affected specs: platform
- Affected code: `__root.tsx`, `api-playground.tsx`, `use-code-execution.ts`, new QR code component
