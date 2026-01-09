# Change: Examples Dropdown Menu

## Why
The current examples UI uses a Sheet (drawer) that slides in from the side. This requires extra clicks and takes up significant screen space. A rich dropdown menu would be:
- More accessible (single click to see all options)
- Less disruptive (doesn't overlay the main content)
- Faster to navigate (hover or click directly on an item)
- Consistent with common UI patterns (like VS Code's command palette style dropdowns)

## What Changes

### 1. Replace Sheet with DropdownMenu
Replace the Sheet component with a shadcn/ui DropdownMenu that shows:
- Example title
- Brief description
- Click to load the example directly

### 2. UI Enhancement
The dropdown should:
- Trigger from the same BookOpen icon button
- **Open on hover** (not just click) for faster access
- Show examples in a clean, scannable list
- Include title and description for each example
- Load example on click (no secondary "Load" button needed)
- Auto-close when mouse leaves or after selection

## Impact
- **Affected file**: `src/components/api-playground.tsx`
- **New dependency**: `@radix-ui/react-dropdown-menu` (shadcn/ui dropdown-menu component)
- **Removed**: Sheet usage for examples (but Sheet component stays as it may be used elsewhere)

## Questions Before Implementation
1. Should the dropdown have a max-height with scroll for APIs with many examples (4+)?
2. Should there be any keyboard navigation hints shown?

