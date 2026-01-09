# api-demos Specification

## Purpose
Individual browser API demonstrations with default code, output visualization, and curated examples.

## MODIFIED Requirements

### Requirement: Demo Registry
The system SHALL implement a demo registry pattern allowing consistent rendering of all API demos through a unified interface, including browser compatibility lookup keys.

#### Scenario: New demo is added with compat key
- **WHEN** developer creates new demo config in `demos/` folder
- **AND** includes `compatKey` field mapping to MDN compat data path
- **THEN** demo automatically displays browser compatibility information
- **AND** compat data is sourced from `@mdn/browser-compat-data`

#### Scenario: Demo without compat key
- **WHEN** a demo does not have a `compatKey` field
- **THEN** browser compat icons show "unknown" state
- **AND** only runtime `checkSupport()` result is displayed
