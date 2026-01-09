# Proposal: Remove MDN Preview Dialog

## Summary
Remove the MDN preview dialog component that attempts to embed MDN documentation in an iframe, replacing it with a simple direct link to MDN.

## Problem
MDN Web Docs sets `X-Frame-Options: deny` as a security header, which prevents their pages from being embedded in iframes. The current `MDNPreviewDialog` component shows a broken/empty iframe or a workaround message, providing no value over a direct link.

## Solution
1. Remove the `MDNPreviewDialog` component entirely
2. Replace the dialog wrapper with a direct external link to MDN
3. Clean up unused imports and files

## Scope
- **Files to modify**: `src/components/api-playground.tsx`
- **Files to delete**: `src/components/mdn-preview-dialog.tsx`
- **Impact**: Minimal - simplifies the UI by removing non-functional feature

## Alternatives Considered
1. **Use a proxy server** - Rejected: Adds complexity and may violate MDN terms of service
2. **Fetch MDN content via API and display** - Rejected: Would require significant work and ongoing maintenance
3. **Show a preview card with description** - Rejected: Adds complexity with minimal benefit over a direct link

## Decision
Direct link is the simplest and most reliable solution. Users already expect external documentation links to open in new tabs.
