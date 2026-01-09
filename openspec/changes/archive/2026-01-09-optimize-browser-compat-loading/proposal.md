# Proposal: Optimize Browser Compat Data Loading

## Why
- Importing `@mdn/browser-compat-data` eagerly inflates the initial bundle and slows first paint.
- We need to keep compat UI but load the dataset on-demand or from CDN to reduce shipped JS.

## What Changes
- Load MDN browser compat data directly from jsDelivr at runtime (not bundled locally) so the UI always reflects the freshest published dataset.
- Remove the local static `@mdn/browser-compat-data` payload from the bundle and avoid shipping it as a fallback.
- Add runtime verification of fetched data (schema/keys) before use; if verification fails, surface "compat data unavailable" gracefully.
- Update compat UI to handle loading/error states without blocking page render.
- Add guardrails/telemetry hooks in design to keep bundle size constraints explicit.

## Impact
- Affected specs: platform
- Affected code: src/lib/browser-compat.ts, src/components/browser-compat-icons.tsx, compat consumers on cards/intro/sidebar
