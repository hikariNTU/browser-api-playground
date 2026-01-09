## MODIFIED Requirements
### Requirement: Browser Compatibility Badge
The system SHALL display browser compatibility information using MDN browser-compat-data fetched at runtime from jsDelivr (pinned to the installed package version or latest if explicitly chosen) with no bundled local dataset, combined with runtime feature detection, keeping the full dataset out of the initial JavaScript bundle.

#### Scenario: Compat data lazy-loads without blocking UI
- **WHEN** a page with compat UI renders and compat data has not been loaded
- **THEN** the page renders immediately using runtime detection status
- **AND** compat data loads asynchronously via jsDelivr fetch pinned to the installed BCD version (or latest if configured)
- **AND** the loaded data is cached for subsequent lookups
- **AND** if the CDN fetch or payload verification fails, the UI shows "compat data unavailable" without crashing other content

#### Scenario: API supported with compat data available
- **WHEN** runtime feature detection passes and compat data resolves and verifies
- **THEN** the badge shows "Your browser: ✅ Supported"
- **AND** compat UI shows MDN compatibility by target browsers (Chrome, Firefox, Safari, Safari iOS, Chrome Android) with version numbers when available

#### Scenario: API not supported with compat data available
- **WHEN** runtime feature detection fails and compat data resolves and verifies
- **THEN** the badge shows "Your browser: ❌ Not supported"
- **AND** compat UI lists which target browsers do support it with version numbers from the MDN dataset
