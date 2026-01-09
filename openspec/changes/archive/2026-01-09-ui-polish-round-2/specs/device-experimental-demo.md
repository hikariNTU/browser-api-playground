# Spec Delta: Device & Experimental APIs Demo

## Summary

Combined demo showcasing multiple device-related and experimental browser APIs in a single showcase. This groups APIs that individually might be too small for standalone demos but together form a comprehensive device capabilities reference.

## APIs Included

1. **Geolocation API** - Get device location (latitude, longitude, accuracy)
2. **Device Orientation API** - Accelerometer/gyroscope data (alpha, beta, gamma)
3. **Battery Status API** - Battery level, charging state
4. **Network Information API** - Connection type, effective type, downlink speed
5. **Idle Detection API** - Detect user/screen idle state
6. **Compute Pressure API** - CPU pressure monitoring
7. **Local Font Access API** - Enumerate locally installed fonts
8. **Screen Capture API** - Capture screen/window/tab

## Demo Structure

### src/demos/device-experimental.ts

```typescript
import { Demo } from "@/types";
import defaultCode from "./code/device-experimental.js?raw";
import defaultHtml from "./code/device-experimental.html?raw";
import ex1Code from "./code/device-experimental-ex1.js?raw";
import ex1Html from "./code/device-experimental-ex1.html?raw";
import ex2Code from "./code/device-experimental-ex2.js?raw";
import ex2Html from "./code/device-experimental-ex2.html?raw";
import ex3Code from "./code/device-experimental-ex3.js?raw";
import ex3Html from "./code/device-experimental-ex3.html?raw";
import ex4Code from "./code/device-experimental-ex4.js?raw";
import ex4Html from "./code/device-experimental-ex4.html?raw";
import ex5Code from "./code/device-experimental-ex5.js?raw";
import ex5Html from "./code/device-experimental-ex5.html?raw";

export const deviceExperimentalDemo: Demo = {
  id: "device-experimental",
  title: "Device & Experimental APIs",
  description: "Geolocation, sensors, battery, network info, and experimental APIs",
  supportCheck: "'geolocation' in navigator || 'getBattery' in navigator",
  defaultCode,
  defaultHtml,
  examples: [
    { title: "Location & Orientation", code: ex1Code, html: ex1Html },
    { title: "Battery & Network", code: ex2Code, html: ex2Html },
    { title: "Idle & Pressure", code: ex3Code, html: ex3Html },
    { title: "Local Fonts", code: ex4Code, html: ex4Html },
    { title: "Screen Capture", code: ex5Code, html: ex5Html },
  ],
  references: [
    { title: "MDN: Geolocation API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API" },
    { title: "MDN: Device Orientation", url: "https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events" },
    { title: "MDN: Battery Status API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API" },
    { title: "MDN: Network Information API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API" },
    { title: "MDN: Idle Detection API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Idle_Detection_API" },
    { title: "W3C: Compute Pressure", url: "https://www.w3.org/TR/compute-pressure/" },
    { title: "MDN: Local Font Access API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Local_Font_Access_API" },
    { title: "MDN: Screen Capture API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API" },
  ],
};
```

### Example Content

**Default**: Feature detection overview - shows which APIs are supported  
**Example 1**: Geolocation + Device Orientation - map coordinates, compass/tilt display  
**Example 2**: Battery Status + Network Information - battery icon, connection details  
**Example 3**: Idle Detection + Compute Pressure - idle state monitoring, CPU pressure  
**Example 4**: Local Font Access - enumerate and preview installed fonts  
**Example 5**: Screen Capture - capture screen/window/tab to video preview

### Registration

Add to `src/demos/index.ts`:
```typescript
import { deviceExperimentalDemo } from "./device-experimental";
// In demos array:
deviceExperimentalDemo,
```

## Browser Support Notes

- **Geolocation**: Universal support, requires permission
- **Device Orientation**: Wide support, requires HTTPS on mobile
- **Battery Status**: Chrome/Edge only (removed from Firefox/Safari for privacy)
- **Network Information**: Chrome/Edge only (not in Firefox/Safari)
- **Idle Detection**: Chrome/Edge only, requires permission
- **Compute Pressure**: Chrome 125+
- **Local Font Access**: Chrome/Edge only, requires permission
- **Screen Capture**: Wide support, requires permission

Each example should gracefully handle unsupported APIs with appropriate messaging.
