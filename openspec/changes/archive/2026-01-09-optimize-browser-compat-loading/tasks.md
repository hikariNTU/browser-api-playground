# Tasks

## 1. Plan / Decision
- [x] 1.1 Finalize CDN-only loading plan (jsDelivr primary), document version pinning vs latest trade-offs, and cache strategy in design.

## 2. Implementation
- [x] 2.1 Implement CDN-backed loader (jsDelivr) as the only compat data source, pinned to the installed package version (or latest if chosen) and cached across consumers.
- [x] 2.2 Add payload verification (schema/keys) before using fetched data; on failure, surface "compat data unavailable" without falling back to bundled data.
- [x] 2.3 Update compat UI surfaces (home cards, intro pages, sidebar, appendix) to handle loading/unavailable states without blocking render.
- [x] 2.4 Verify build output excludes the BCD payload entirely from the bundle (e.g., inspect chunk list or size report) and that only the CDN path is used.

## 3. Validation
- [x] 3.1 Smoke-test compat icons for at least three demos (supported/unsupported mix) with online success and simulated verification failure to confirm graceful handling.
- [x] 3.2 Smoke-test appendix page compat rendering and error state.
- [x] 3.3 Run `npm run build` and confirm no regressions.
