## 1. Editor Tab UI
- [x] 1.1 Add tab state (`activeTab: 'js' | 'html'`) to ApiPlayground component
- [x] 1.2 Create tab switcher UI above Monaco editor (using existing shadcn Tabs component)
- [x] 1.3 Show "HTML" tab as disabled/muted when example has no HTML template
- [x] 1.4 Add visual indicator (badge/icon) when HTML template exists

## 2. HTML Editor Integration
- [x] 2.1 Add `htmlCode` state initialized from `example.html` (or empty string)
- [x] 2.2 Switch Monaco editor `language` prop based on active tab (`javascript` / `html`)
- [x] 2.3 Switch Monaco editor `value` and `onChange` based on active tab
- [x] 2.4 Ensure type definitions only apply in JavaScript mode

## 3. Persistence
- [x] 3.1 Add separate localStorage key for HTML code (`{prefix}-html-{demoId}-{exampleId}`)
- [x] 3.2 Load persisted HTML on mount if it exists
- [x] 3.3 Save HTML changes with same debounce pattern as JS
- [x] 3.4 Reset button clears both JS and HTML to defaults
- [x] 3.5 Modified indicator shows when either JS or HTML differs from default

## 4. Execution Integration
- [x] 4.1 Pass current HTML (from state) to `execute(code, html)` call
- [x] 4.2 Verify existing `useCodeExecution` properly injects HTML into iframe body
- [x] 4.3 Reset button auto-executes code after restoring defaults

## 5. UX Polish
- [x] 5.1 Show placeholder text in HTML editor when no HTML template exists ("This example uses JavaScript to create DOM elements dynamically")
- [x] 5.2 Keep tab selection when switching between examples (default to JS tab)
- [x] 5.3 Copy button copies content from active tab
- [x] 5.4 Format button formats content in active tab (Monaco handles HTML formatting)

## 6. Example Structure Review
- [x] 6.1 Audit all existing HTML templates for consistent structure
- [x] 6.2 Add HTML templates to examples that would benefit from explicit DOM structure
- [x] 6.3 Improve HTML templates with semantic structure and helpful comments
- [x] 6.4 Ensure all examples that use `getElementById` have corresponding HTML templates
