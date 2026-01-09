# monaco-types Specification

## Purpose
Browser API type definitions for the Monaco editor, providing autocomplete and type checking for modern browser APIs used in demos.

## Requirements

### Requirement: Browser API Type Definitions
The Monaco editor SHALL provide type definitions for modern browser APIs used in demos, eliminating TypeScript errors for valid browser code.

#### Scenario: EyeDropper API recognized
**Given** the user types `new EyeDropper()` in the editor  
**When** Monaco performs type checking  
**Then** no "Could not find name" error is shown  
**And** autocomplete suggestions include EyeDropper methods

#### Scenario: SpeechRecognition API recognized
**Given** the user types `new SpeechRecognition()` or `new webkitSpeechRecognition()`  
**When** Monaco performs type checking  
**Then** both variants are recognized as valid constructors  
**And** the resulting object has speech recognition methods

#### Scenario: Navigator extensions recognized
**Given** the user accesses `navigator.getBattery()` or `navigator.connection`  
**When** Monaco performs type checking  
**Then** these properties are recognized  
**And** their return types provide proper autocomplete

#### Scenario: Window extensions recognized
**Given** the user calls `window.getScreenDetails()`  
**When** Monaco performs type checking  
**Then** the method is recognized  
**And** returns ScreenDetails type with screens array

#### Scenario: Experimental APIs recognized
**Given** the user types `new IdleDetector()` or `new PressureObserver()`  
**When** Monaco performs type checking  
**Then** these constructors are recognized with proper types
