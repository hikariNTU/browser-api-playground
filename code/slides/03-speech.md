# What is ASR & TTS?

**ASR** = Automatic Speech Recognition
- Audio → Text
- "Hey Siri", voice typing, transcription

**TTS** = Text-to-Speech  
- Text → Audio
- Screen readers, voice assistants, audiobooks

---

## The Production Pain Points

Building ASR/TTS services is **hard**:

| Challenge | Reality |
|-----------|---------|
| 🐌 Latency | Network round-trip adds 100-500ms |
| 📡 Network | Offline = broken |
| 💰 Cost | GPU servers aren't cheap |
| 🎯 Quality | Always a trade-off |
| 🔧 Customization | Limited by provider APIs |

**Real production examples:**
- 🎤 [asr.yating.tw](https://asr.yating.tw) — Production ASR service
- 🗣️ [Yating TTS Studio](https://studio.yating.tw/dub/project/create/tts) — Production TTS service

![ASR Yating Demo](/slides/asr-yating-tw-result.png)

---

## Browser Alternative: Web Speech API

```js
// Speech Recognition (ASR)
const recognition = new webkitSpeechRecognition()
recognition.onresult = (e) => console.log(e.results[0][0].transcript)
recognition.start()

// Speech Synthesis (TTS)
speechSynthesis.speak(new SpeechSynthesisUtterance("Hello!"))
```

**Pros:** Free, offline-capable, zero setup  
**Cons:** Limited languages, accuracy varies by browser

[Try Web Speech Demo](/api/web-speech)

---

## Whisper in the Browser

**Whisper.cpp + WASM** = Production-grade ASR in browser

- OpenAI's Whisper model compiled to WebAssembly
- Runs entirely client-side
- Much better accuracy than Web Speech API
- Trade-off: ~50MB model download

Great for apps needing offline transcription!

🔗 [Try Whisper WASM Demo](https://whisper.ggerganov.com/) — Live browser-based Whisper
