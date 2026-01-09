# Tasks

## Task Group 1: Add Missing shadcn Components

- [x] **1.1** Add Slider component: `npx shadcn@latest add slider`
- [x] **1.2** Add Textarea component: `npx shadcn@latest add textarea`
- [x] **1.3** Add Select component: `npx shadcn@latest add select`
- [x] **1.4** Add RadioGroup component: `npx shadcn@latest add radio-group`
- [x] **1.5** Add Checkbox component: `npx shadcn@latest add checkbox`
- [x] **1.6** Add Label component: `npx shadcn@latest add label`

## Task Group 2: Migrate AudioContextPreview

- [x] **2.1** Import `Slider` and `Label` from shadcn
- [x] **2.2** Replace `<input type="range">` with `<Slider>` (handle array value)
- [x] **2.3** Replace inline label with `<Label>`

## Task Group 3: Migrate CompressionStreamsPreview

- [x] **3.1** Import `Textarea`, `RadioGroup`, `RadioGroupItem`, and `Label`
- [x] **3.2** Replace `<textarea>` with `<Textarea>`
- [x] **3.3** Replace radio inputs with `<RadioGroup>` and `<RadioGroupItem>`
- [x] **3.4** Replace inline labels with `<Label>`

## Task Group 4: Migrate WebRTCPreview

- [x] **4.1** Import `Select`, `SelectTrigger`, `SelectContent`, `SelectItem`, `Checkbox`, and `Label`
- [x] **4.2** Replace camera `<select>` with shadcn `<Select>`
- [x] **4.3** Replace microphone `<select>` with shadcn `<Select>`
- [x] **4.4** Replace audio checkbox with `<Checkbox>` and `<Label>`
- [x] **4.5** Replace inline labels with `<Label>`

## Task Group 5: Migrate MediaRecorderPreview

- [x] **5.1** Import `Select` components and `Label`
- [x] **5.2** Replace microphone `<select>` with shadcn `<Select>`
- [x] **5.3** Replace inline label with `<Label>`

## Task Group 6: Migrate WebSpeechPreview

- [x] **6.1** Import `Textarea`, `Select` components, and `Label`
- [x] **6.2** Replace text `<textarea>` with `<Textarea>`
- [x] **6.3** Replace voice `<select>` with shadcn `<Select>`
- [x] **6.4** Replace microphone `<select>` with shadcn `<Select>`
- [x] **6.5** Replace inline labels with `<Label>`

## Task Group 7: Validation

- [x] **7.1** Run `npm run build` to verify TypeScript compiles
- [ ] **7.2** Visual inspection: verify components render correctly in dark/light modes
- [ ] **7.3** Functional test: verify form controls work (select, slider, checkbox, etc.)

## Dependencies

- Task Group 1 must complete before Groups 2-6
- Groups 2-6 can be done in parallel
- Group 7 depends on all previous groups
