# screen-visualization Specification

## Purpose
Visual representation of multi-screen setups using the Window Management API, showing coordinate-accurate layouts that reflect physical screen arrangements.

## Requirements

### Requirement: Screen Layout Visualization
The Window Management API demo SHALL render screens in a coordinate-accurate layout that reflects their physical arrangement.

#### Scenario: Two screens side-by-side
**Given** the user has two screens: Screen A at (0,0) 2560x1440 and Screen B at (2560,0) 1920x1080  
**When** the user clicks "Get Screen Info"  
**Then** Screen A appears on the left and Screen B appears directly to its right with no vertical offset  
**And** both screens are scaled proportionally to fit the display container

#### Scenario: Two screens with vertical offset
**Given** the user has two screens: Screen A at (0,0) 2560x1440 and Screen B at (2560,200) 1920x1080  
**When** the user clicks "Get Screen Info"  
**Then** Screen A appears on the left  
**And** Screen B appears to the right with a visible vertical offset (lower than Screen A)

#### Scenario: Stacked vertical arrangement
**Given** the user has two screens: Screen A at (0,0) 1920x1080 and Screen B at (0,1080) 1920x1080  
**When** the user clicks "Get Screen Info"  
**Then** Screen A appears on top  
**And** Screen B appears directly below Screen A

#### Scenario: Single screen
**Given** the user has one screen at (0,0)  
**When** the user clicks "Get Screen Info"  
**Then** the single screen is displayed centered in the container

---

### Requirement: Screen Information Display
Each screen card SHALL display its key properties visually.

#### Scenario: Screen card content
**Given** any screen in the layout  
**Then** the card shows the screen index, dimensions (width x height), and position coordinates (left, top)  
**And** the primary screen has a distinct visual indicator (different color or badge)

#### Scenario: Current screen indicator
**Given** the browser window is on a specific screen  
**When** screens are displayed  
**Then** the screen containing the current window has a "Current" indicator
