# Proposal: UX Enhancements

## Summary
Add three user experience improvements to the Browser API Playground: related API suggestions, global search command palette, and keyboard shortcuts help modal. The editor theme sync is already implemented and will be excluded from this proposal.

## Motivation
- **Related APIs**: Help users discover similar APIs after exploring one demo, increasing engagement and learning
- **Global Search**: Quick navigation to any demo, example, or appendix API via `⌘+K` command palette
- **Keyboard Shortcuts Modal**: Users can't discover available shortcuts (currently only `⌘/` exists)

## Scope
Three distinct capabilities:
1. **related-apis**: Add `relatedApis` field to demo definitions and display at bottom of intro pages
2. **global-search**: Command palette (`⌘+K`) to search all demos, examples, and appendix APIs
3. **keyboard-shortcuts-modal**: Add `?` key to show shortcuts help modal

## Out of Scope
- **Editor Theme Sync**: Already implemented in `api-playground.tsx` (lines 103-117) using MutationObserver to watch `document.documentElement` class changes

## Affected Areas
- `code/src/demos/types.ts` - Add `relatedApis` field to `ApiDemo` interface
- `code/src/demos/*.ts` - Add related API references to each demo
- `code/src/components/intro-page.tsx` - Display related APIs section
- `code/src/routes/__root.tsx` - Add `⌘+K` and `?` keyboard handlers, render search and shortcuts modals
- New component: `code/src/components/global-search.tsx`
- New component: `code/src/components/keyboard-shortcuts-modal.tsx`

## Design Decisions
See `design.md` for detailed rationale on:
- Related APIs data structure (IDs vs full references)
- Global search data sources and ranking
- Modal vs popover for shortcuts display
