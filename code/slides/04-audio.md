# AudioContext: The Audio Graph

Web Audio uses a **node-based architecture**:

![Audio Context Graph](/slides/audio-context-graph.png)

Like visual programming for audio!

---

## How Nodes Work

```js
const ctx = new AudioContext()

// Create nodes
const source = ctx.createMediaStreamSource(micStream)
const analyser = ctx.createAnalyser()
const gain = ctx.createGain()

// Connect the graph
source.connect(analyser)
analyser.connect(gain)
gain.connect(ctx.destination)
```

Each node processes audio and passes it along

---

## Real-World: AI Vocal Compositor

Built a **MIDI compositor with voice sync**:

- 🎹 MIDI sequencer for instruments
- 🎤 AI-generated vocals synced to timeline
- 🎚️ Real-time mixing and effects
- 📊 Waveform visualization

All orchestrated through AudioContext nodes

🔗 [Try Yating AI Vocal Studio](https://studio.yating.tw/music/ai-vocal) — Production MIDI compositor with piano preview & voice sync

![AI Vocal Page](/slides/ai-vocal-page.png)

[Try AudioContext Demo](/api/audiocontext)
