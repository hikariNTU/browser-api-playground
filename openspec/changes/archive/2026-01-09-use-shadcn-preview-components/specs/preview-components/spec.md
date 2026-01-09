# preview-components Spec Delta

## ADDED Requirements

### Requirement: Preview components must use shadcn form controls

Preview components SHALL use shadcn/ui form components instead of raw HTML elements for all user inputs. This ensures consistent styling, proper accessibility, and theme support.

#### Scenario: Slider for numeric inputs
**Given** a preview component needs a range input (e.g., frequency)  
**When** the component renders  
**Then** it uses `Slider` from shadcn/ui  
**And** the slider has proper accessible label via `Label` component

#### Scenario: Textarea for text inputs
**Given** a preview component needs multiline text input  
**When** the component renders  
**Then** it uses `Textarea` from shadcn/ui  
**And** styling matches the shadcn theme

#### Scenario: Select for device/option selection
**Given** a preview component needs a dropdown (e.g., camera, microphone, voice)  
**When** the component renders  
**Then** it uses `Select`, `SelectTrigger`, `SelectContent`, `SelectItem` from shadcn/ui  
**And** the trigger shows the currently selected value  
**And** disabled state is properly styled

#### Scenario: RadioGroup for exclusive options
**Given** a preview component needs mutually exclusive options (e.g., compression format)  
**When** the component renders  
**Then** it uses `RadioGroup` and `RadioGroupItem` from shadcn/ui  
**And** each item has a proper `Label`

#### Scenario: Checkbox for boolean toggles
**Given** a preview component needs a boolean toggle (e.g., include audio)  
**When** the component renders  
**Then** it uses `Checkbox` from shadcn/ui  
**And** the checkbox has an associated `Label`

#### Scenario: Labels for all form controls
**Given** any form control in a preview component  
**When** the component renders  
**Then** it uses the `Label` component from shadcn/ui  
**And** the label is properly associated with its control
