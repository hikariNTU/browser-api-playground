# Change: Fix Slides Title Extraction and Add File Grouping

## Why
Current slides panel has two UX issues:
1. **Title extraction fails for h2/h3**: The `extractTitle` function only matches `# Title` (h1), so slides starting with `## Title` show as "Untitled Slide"
2. **No visual grouping**: Slides from different source files appear as a flat list with no indication of which file they belong to

## What Changes
- Update `extractTitle` to match any heading level (`#`, `##`, `###`, etc.)
- Add `fileGroup` property to Slide interface for grouping info
- Display file group labels in the preview strip to separate slides by source file
- Show subtle visual separators between slide groups

## Impact
- Affected code:
  - `src/hooks/use-slides.ts` - Fix title regex, add group info
  - `src/components/slides-panel.tsx` - Add group separators in preview strip

## Out of Scope
- Nested slide hierarchies
- Collapsible groups
