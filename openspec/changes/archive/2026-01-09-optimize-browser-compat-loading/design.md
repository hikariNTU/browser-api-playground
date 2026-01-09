## Context
- `getBrowserCompat` imports `@mdn/browser-compat-data` at module load, pulling the full dataset into the main bundle.
- Vite + React app; compat UI is used on home cards, intro pages, sidebar, appendix. Current behavior works but inflates initial JS and runtime memory.
- Updated requirement: fetch compat data from jsDelivr at runtime so the UI stays current even if the local build is old; remove the bundled static dataset instead of keeping a local fallback.

## Goals / Non-Goals
- Goals: reduce initial JS shipped; keep compat display intact; add graceful loading/error handling; prefer CDN-based fetching (no bundled dataset).
- Non-Goals: redesign compat UI; change which browsers are shown; add historical/version-specific timelines; add new APIs.

- Cache the CDN fetch promise in the compat loader to avoid duplicate network requests and share across surfaces.
- Verify the fetched payload shape (presence of `__compat.support` and required browser keys) before using it; if verification fails, surface an unavailable state rather than rendering stale/invalid data.
- Normalize loader output so UI code remains unchanged (still reads the same shape from `getBrowserCompat`).
- Add lightweight loading/unavailable states so UI stays responsive while compat data resolves.

## Risks / Trade-offs
- Remote CDN fetch can add latency and depends on network/CORS; mitigation: cache responses, show loading states, and surface graceful degradation if fetch fails.
- Version drift if CDN path is unpinned; mitigation: pin to installed version and update automatically when dependency bumps (or accept "latest" with stronger validation/telemetry).
- Partial coverage: CDN per-file fetches must map compat keys (e.g., `api.EyeDropper`) to correct JSON paths; need a mapping utility and clear error handling.

## Migration Plan
- Replace static import with lazy loader + fallback.
- Ensure all compat consumers handle async/loading/unavailable states.
- Verify bundle analysis to confirm BCD chunk is split from main bundle.

## Open Questions
- Should we persist CDN responses to local storage to avoid re-fetching between sessions and provide faster offline fallback?
