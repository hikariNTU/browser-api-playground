# Tasks: Remove MDN Preview Dialog

## Implementation Tasks

- [x] **Task 1: Replace MDNPreviewDialog with direct link**
  - Modify `src/components/api-playground.tsx`
  - Remove `MDNPreviewDialog` import
  - Replace dialog wrapper with a simple `<a>` tag that opens MDN in a new tab
  - Keep the same visual appearance (text + external link icon)

- [x] **Task 2: Delete MDNPreviewDialog component**
  - Delete `src/components/mdn-preview-dialog.tsx`

- [x] **Task 3: Verify and test**
  - Run `npm run lint` to ensure no broken imports
  - Run `npm run build` to verify build succeeds
  - Manual test: click MDN Docs link opens correct MDN page in new tab

## Dependencies
None - this is a straightforward removal.

## Verification
- No TypeScript/ESLint errors
- Build completes successfully
- MDN links work correctly in browser
