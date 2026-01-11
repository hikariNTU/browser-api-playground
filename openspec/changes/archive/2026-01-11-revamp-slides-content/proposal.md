# Proposal: Revamp Slides Content

## Summary
Replace placeholder slide content with a narrative-driven presentation structure designed for a 30-minute tech sharing session with live demos. Focus on real-world production experiences with browser APIs.

## Motivation
Current slides are placeholder content. Need proper content for a Frontend team tech sharing that:
- Complements live demos (not duplicates them)
- Shares production experience stories
- Provides brief talking points, not dense documentation
- Engages audience with "why/how/what" narrative

## Proposed Structure

### Recommended Flow (30 min total)

| Section | Time | Slides | Content |
|---------|------|--------|---------|
| **1. The Hook** | 2 min | 2 | Attention grabber - what's possible |
| **2. The Problem** | 3 min | 2-3 | Pain points that led to discovery |
| **3. Production Stories** | 18 min | 6-8 | 3-4 API demos with context |
| **4. Gotchas & Tips** | 4 min | 3 | Things learned the hard way |
| **5. Wrap-up** | 3 min | 2 | Resources, Q&A prompt |

### Slide Files Restructure

```
slides/
├── 01-hook.md           # Attention grabber
├── 02-problem.md        # Why we needed these APIs
├── 03-story-media.md    # Media recording/processing story
├── 04-story-hardware.md # Hardware integration story  
├── 05-story-ux.md       # UX enhancement story
├── 06-gotchas.md        # Lessons learned
├── 07-resources.md      # Wrap-up and links
└── assets/              # Screenshots, GIFs, diagrams
```

## Detailed Content Plan

### 01-hook.md (2 slides)
**Goal:** Grab attention, show what's possible

- **Slide 1:** Title + provocative question
  - "What if your web app could control hardware?"
  - Or: "Beyond fetch() and localStorage"
  
- **Slide 2:** Quick showcase montage
  - 4-6 visual examples of what we'll cover
  - Tease the "wow factor"

### 02-problem.md (2-3 slides)  
**Goal:** Establish context, create relatability

- **Slide 1:** "The Electron Trap"
  - "Client wanted desktop features... in a browser"
  - Common pattern: reaching for Electron/Tauri
  
- **Slide 2:** "What we actually needed"
  - List real requirements from past projects
  - Hardware access, offline capability, native feel
  
- **Slide 3:** "The browser has grown up"
  - Transition to solution - browser APIs exist!

### 03-story-speech.md (3-4 slides)
**Goal:** First production story - Speech APIs (ASR/TTS)

- **Production context:** Worked at an AI research lab on online ASR/TTS services
- **Pain points of production ASR/TTS:**
  - High latency (network round-trip)
  - Requires network connectivity
  - Heavy computation (GPU servers)
  - Quality trade-offs
  - Missing features, limited customization
- **Browser alternative:** Web Speech API
  - Free, offline-capable, zero setup
  - But: limited languages, accuracy varies
- **Bonus:** Whisper WASM - bringing production-grade ASR to browser
- **Live demo link:** → Web Speech Demo
- **Key takeaway:** Browser Speech API = good enough for many use cases

### 04-story-audio.md (3-4 slides)
**Goal:** Second story - AudioContext & Web Audio

- **Production context:** Built MIDI compositor with voice sync at AI music studio
- **How AudioContext works:**
  - Audio graph concept (source → processing → destination)
  - Node-based architecture (like visual programming)
- **Real use case:** AI vocal generation + music sync
- **Live demo link:** → AudioContext Demo
- **Key takeaway:** Web Audio is surprisingly powerful for pro audio

### 05-story-bonus.md (2-3 slides)
**Goal:** Quick showcase of other useful APIs

- **EyeDropper:** Native color picker (design tools)
- **Screen Wake Lock:** Keep screen on (music apps, presentations)
- **View Transitions:** Smooth page transitions
- **Window Management:** Multi-monitor support
- **Live demo links:** → Various demos
- **Key takeaway:** Browser keeps adding native-like capabilities

### 06-gotchas.md (3 slides)
**Goal:** Share hard-won lessons

- **Slide 1:** "Permission UX Matters"
  - Users reject prompts they don't understand
  - Always explain before requesting
  
- **Slide 2:** "Feature Detection is Your Friend"
  - Code pattern for graceful fallback
  - Browser support reality check
  
- **Slide 3:** "HTTPS Required"
  - Most APIs need secure context
  - Local dev considerations

### 07-resources.md (2 slides)
**Goal:** Give audience next steps

- **Slide 1:** "Try it yourself"
  - Link to this playground
  - QR code for mobile
  
- **Slide 2:** "Learn more"
  - MDN links
  - Can I Use
  - Chrome Developer blog

## Media Assets Needed

| Asset | Type | For Slide |
|-------|------|-----------|
| Logo/Title card | PNG | 01-hook |
| API montage | GIF/Image | 01-hook |
| "Electron vs Browser" diagram | PNG | 02-problem |
| Media recording demo | GIF | 03-story-media |
| Hardware connection demo | GIF | 04-story-hardware |
| EyeDropper in action | GIF | 05-story-ux |
| Browser support chart | PNG | 06-gotchas |
| QR code | SVG | 07-resources |

## Questions for You

Before finalizing, please clarify:

1. **Which production stories resonate most?**
   - Media recording/processing
   - Hardware integration (Serial, Gamepad)
   - UX tools (EyeDropper, Window Management)
   - Real-time communication (WebRTC, Broadcast Channel)
   - File handling (File System Access, Compression)

2. **What specific projects can you reference?**
   - Even anonymized: "At a fintech startup..." / "For an IoT dashboard..."

3. **Preferred demo order?**
   - Start with impressive → practical → niche?
   - Or: familiar → surprising → cutting-edge?

4. **Any specific "war stories"?**
   - Bugs, edge cases, or surprises worth sharing?

## Scope

### In Scope
- Replace all slide markdown files
- Create new slide structure
- Define asset requirements
- Update slide grouping in code if needed

### Out of Scope
- Creating actual visual assets (separate task)
- Code changes to slides-panel component
- Adding new demo implementations

## Success Criteria
- [ ] Slides flow naturally for 30-min talk
- [ ] Each slide has clear talking point
- [ ] Live demo integration points are marked
- [ ] Content reflects real production experience
- [ ] Asset placeholders identified
