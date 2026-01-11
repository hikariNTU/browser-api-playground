## 1. Update Demo Configurations (Remove Redundant Examples)

- [x] Update `src/demos/web-serial.ts` - remove ex1, ex2, ex3 imports and examples array entries
- [x] Update `src/demos/screen-wake-lock.ts` - remove ex1 import and example entry
- [x] Update `src/demos/eyedropper.ts` - remove ex1 import and example entry

## 2. Remove Unused Code Files

- [x] Delete `src/demos/code/web-serial-ex1.js`
- [x] Delete `src/demos/code/web-serial-ex2.js`
- [x] Delete `src/demos/code/web-serial-ex3.js`
- [x] Delete `src/demos/code/screen-wake-lock-ex1.js`
- [x] Delete `src/demos/code/eyedropper-ex1.js`

## 3. Add Broadcast Channel API Demo

- [x] Create `src/demos/code/broadcast-channel.js` - main demo code
- [x] Create `src/demos/code/broadcast-channel.html` - UI elements
- [x] Create `src/demos/broadcast-channel.ts` - demo configuration
- [x] Create `src/components/previews/broadcast-channel-preview.tsx` - preview component
- [x] Update `src/components/previews/index.ts` - export new preview
- [x] Update `src/demos/index.ts` - add to demos registry
- [x] Create `src/routes/api/broadcast-channel.tsx` - route file (N/A - uses dynamic routes)
- [x] Remove Broadcast Channel from `src/data/appendix-apis.ts` (promoted to demo)

## 4. Validation

- [x] Run `npm run build` to verify no import errors
- [ ] Manually test each affected demo's examples dropdown
- [ ] Verify remaining examples load and execute correctly
- [ ] Test Broadcast Channel demo with multiple tabs open
