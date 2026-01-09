## REMOVED Requirements

### Requirement: MDN Preview Dialog
The system previously provided an in-app dialog to preview MDN documentation.

**Reason**: MDN Web Docs sets `X-Frame-Options: deny` which prevents embedding their pages in iframes. The feature cannot function as designed.

**Migration**: Users click the MDN Docs link which opens documentation directly in a new browser tab.

#### Scenario: User accesses MDN documentation
- **WHEN** user clicks the "MDN Docs" link for any API
- **THEN** the MDN documentation page opens in a new browser tab
