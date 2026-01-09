# Spec Delta: Examples UI Component

## MODIFIED Requirements

### Requirement: Examples Browser UI
The examples browser SHALL provide quick access to code examples via a dropdown menu triggered from the editor toolbar, opening automatically on hover.

#### Scenario: User hovers over examples button
**Given** the user is on an API playground page  
**When** they hover over the BookOpen icon button in the editor toolbar  
**Then** a dropdown menu appears showing all available examples for that API

#### Scenario: User opens examples dropdown by click
**Given** the user is on an API playground page  
**When** they click the BookOpen icon button in the editor toolbar  
**Then** a dropdown menu appears showing all available examples for that API

#### Scenario: User selects an example
**Given** the examples dropdown is open  
**When** the user clicks on an example item  
**Then** the example code and HTML are loaded into the editor  
**And** the code is auto-executed if the API is supported  
**And** the dropdown closes automatically

#### Scenario: Example item display
**Given** the examples dropdown is open  
**Then** each example shows its title in medium font weight  
**And** each example shows its description in smaller muted text below the title

#### Scenario: Dropdown with many examples
**Given** an API has more than 4 examples  
**When** the dropdown is opened  
**Then** the dropdown has a maximum height  
**And** the content is scrollable to access all examples

#### Scenario: Keyboard navigation
**Given** the examples dropdown is open  
**When** the user presses arrow keys  
**Then** focus moves between example items  
**And** pressing Enter loads the focused example
