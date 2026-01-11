// AudioContext Node Editor using LiteGraph.js
// Visual node graph for connecting audio nodes

// Dynamically load LiteGraph from CDN
function loadLiteGraph() {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (typeof LiteGraph !== 'undefined' && typeof LGraph !== 'undefined') {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/litegraph.js@0.7.18/build/litegraph.min.js'
    script.onload = () => {
      // Small delay to ensure globals are available
      setTimeout(resolve, 100)
    }
    script.onerror = () => reject(new Error('Failed to load LiteGraph library'))
    document.head.appendChild(script)
  })
}

loadLiteGraph()
  .then(() => {
    // Hide loading message, show editor FIRST
    document.getElementById('loading-msg').style.display = 'none'
    document.getElementById('editor-container').style.display = 'flex'

    // State object to share across functions
    const state = {
      audioCtx: null,
      isPlaying: false,
    }
    const audioNodes = new Map() // Map LiteGraph node IDs to Web Audio nodes

    // Initialize LiteGraph - need to wait a frame for layout to complete
    const canvasEl = document.getElementById('graph-canvas')

    // Use requestAnimationFrame to ensure container is laid out before measuring
    requestAnimationFrame(() => {
      // Fix canvas resolution to match display size (prevents mouse offset issues)
      const rect = canvasEl.getBoundingClientRect()
      canvasEl.width = rect.width || 700
      canvasEl.height = rect.height || 400

      const graph = new LGraph()
      const canvas = new LGraphCanvas(canvasEl, graph)
      canvas.background_image = null

      // Resize handler - LiteGraph needs special handling
      let resizeTimeout = null
      const resizeCanvas = () => {
        // Debounce resize to avoid excessive redraws
        if (resizeTimeout) clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          const rect = canvasEl.getBoundingClientRect()
          if (rect.width > 0 && rect.height > 0) {
            // Update canvas buffer size to match CSS size
            canvasEl.width = rect.width
            canvasEl.height = rect.height
            // Tell LiteGraph about the new size
            canvas.resize(rect.width, rect.height)
            canvas.setDirty(true, true)
          }
        }, 50)
      }
      window.addEventListener('resize', resizeCanvas)

      // Use ResizeObserver for more reliable container size detection
      const resizeObserver = new ResizeObserver(() => {
        resizeCanvas()
      })
      resizeObserver.observe(canvasEl.parentElement)

      initializeNodes(graph, canvas, state, audioNodes)
    })
  })
  .catch((err) => {
    const loadingMsg = document.getElementById('loading-msg')
    if (loadingMsg) {
      loadingMsg.textContent = '❌ ' + err.message
      loadingMsg.style.color = '#ef4444'
    }
    console.error(err.message)
  })

function initializeNodes(graph, canvas, state, audioNodes) {
  // Register custom Audio nodes

  // Oscillator Node
  function OscillatorNode() {
    this.addOutput('audio', 'audio')
    this.addProperty('frequency', 440)
    this.addProperty('type', 'sine')
    this.addWidget(
      'number',
      'Freq',
      440,
      (v) => {
        this.properties.frequency = v
        this.updateAudioNode()
      },
      { min: 20, max: 2000 }
    )
    this.addWidget(
      'combo',
      'Type',
      'sine',
      (v) => {
        this.properties.type = v
        this.updateAudioNode()
      },
      { values: ['sine', 'square', 'sawtooth', 'triangle'] }
    )
    this.size = [180, 100]
    this.color = '#3b82f6'
    this.bgcolor = '#1e3a5f'
  }
  OscillatorNode.title = '🎵 Oscillator'
  OscillatorNode.prototype.updateAudioNode = function () {
    const node = audioNodes.get(this.id)
    if (node) {
      node.frequency.value = this.properties.frequency
      node.type = this.properties.type
    }
  }
  OscillatorNode.prototype.onStart = function () {
    if (!state.audioCtx) return
    const osc = state.audioCtx.createOscillator()
    osc.frequency.value = this.properties.frequency
    osc.type = this.properties.type
    osc.start()
    audioNodes.set(this.id, osc)
  }
  OscillatorNode.prototype.onStop = function () {
    const node = audioNodes.get(this.id)
    if (node) {
      node.stop()
      node.disconnect()
      audioNodes.delete(this.id)
    }
  }
  OscillatorNode.prototype.getAudioNode = function () {
    return audioNodes.get(this.id)
  }
  LiteGraph.registerNodeType('audio/oscillator', OscillatorNode)

  // Gain Node (Mixer) - supports multiple inputs
  function AudioGainNode() {
    this.addInput('audio 1', 'audio')
    this.addInput('audio 2', 'audio')
    this.addInput('audio 3', 'audio')
    this.addOutput('audio', 'audio')
    this.addProperty('gain', 0.5)
    this.addWidget(
      'slider',
      'Volume',
      0.5,
      (v) => {
        this.properties.gain = v
        this.updateAudioNode()
      },
      { min: 0, max: 1 }
    )
    this.size = [180, 110]
    this.color = '#8b5cf6'
    this.bgcolor = '#3d2d5f'
  }
  AudioGainNode.title = '🔊 Gain/Mixer'
  AudioGainNode.prototype.updateAudioNode = function () {
    const node = audioNodes.get(this.id)
    if (node) {
      node.gain.value = this.properties.gain
    }
  }
  AudioGainNode.prototype.onStart = function () {
    if (!state.audioCtx) return
    const gain = state.audioCtx.createGain()
    gain.gain.value = this.properties.gain
    audioNodes.set(this.id, gain)
  }
  AudioGainNode.prototype.onStop = function () {
    const node = audioNodes.get(this.id)
    if (node) {
      node.disconnect()
      audioNodes.delete(this.id)
    }
  }
  AudioGainNode.prototype.getAudioNode = function () {
    return audioNodes.get(this.id)
  }
  LiteGraph.registerNodeType('audio/gain', AudioGainNode)

  // Filter Node
  function FilterNode() {
    this.addInput('audio', 'audio')
    this.addOutput('audio', 'audio')
    this.addProperty('frequency', 1000)
    this.addProperty('type', 'lowpass')
    this.addWidget(
      'number',
      'Cutoff',
      1000,
      (v) => {
        this.properties.frequency = v
        this.updateAudioNode()
      },
      { min: 20, max: 10000 }
    )
    this.addWidget(
      'combo',
      'Type',
      'lowpass',
      (v) => {
        this.properties.type = v
        this.updateAudioNode()
      },
      { values: ['lowpass', 'highpass', 'bandpass', 'notch'] }
    )
    this.size = [180, 100]
    this.color = '#f59e0b'
    this.bgcolor = '#5f4a1e'
  }
  FilterNode.title = '🎛️ Filter'
  FilterNode.prototype.updateAudioNode = function () {
    const node = audioNodes.get(this.id)
    if (node) {
      node.frequency.value = this.properties.frequency
      node.type = this.properties.type
    }
  }
  FilterNode.prototype.onStart = function () {
    if (!state.audioCtx) return
    const filter = state.audioCtx.createBiquadFilter()
    filter.frequency.value = this.properties.frequency
    filter.type = this.properties.type
    audioNodes.set(this.id, filter)
  }
  FilterNode.prototype.onStop = function () {
    const node = audioNodes.get(this.id)
    if (node) {
      node.disconnect()
      audioNodes.delete(this.id)
    }
  }
  FilterNode.prototype.getAudioNode = function () {
    return audioNodes.get(this.id)
  }
  LiteGraph.registerNodeType('audio/filter', FilterNode)

  // Delay Node
  function DelayNode() {
    this.addInput('audio', 'audio')
    this.addOutput('audio', 'audio')
    this.addOutput('dry', 'audio') // Pass-through for dry signal
    this.addProperty('delayTime', 0.3)
    this.addWidget(
      'slider',
      'Delay (s)',
      0.3,
      (v) => {
        this.properties.delayTime = v
        this.updateAudioNode()
      },
      { min: 0, max: 1 }
    )
    this.size = [180, 80]
    this.color = '#ec4899'
    this.bgcolor = '#5f1e3a'
  }
  DelayNode.title = '⏱️ Delay'
  DelayNode.prototype.updateAudioNode = function () {
    const node = audioNodes.get(this.id)
    if (node) {
      node.delayTime.value = this.properties.delayTime
    }
  }
  DelayNode.prototype.onStart = function () {
    if (!state.audioCtx) return
    const delay = state.audioCtx.createDelay(1.0)
    delay.delayTime.value = this.properties.delayTime
    audioNodes.set(this.id, delay)
  }
  DelayNode.prototype.onStop = function () {
    const node = audioNodes.get(this.id)
    if (node) {
      node.disconnect()
      audioNodes.delete(this.id)
    }
  }
  DelayNode.prototype.getAudioNode = function () {
    return audioNodes.get(this.id)
  }
  LiteGraph.registerNodeType('audio/delay', DelayNode)

  // Destination Node (output) - supports multiple inputs
  function DestinationNode() {
    this.addInput('audio 1', 'audio')
    this.addInput('audio 2', 'audio')
    this.addInput('audio 3', 'audio')
    this.size = [140, 90]
    this.color = '#22c55e'
    this.bgcolor = '#1e5f3a'
  }
  DestinationNode.title = '🔈 Output'
  DestinationNode.prototype.onStart = function () {
    if (!state.audioCtx) return
    audioNodes.set(this.id, state.audioCtx.destination)
  }
  DestinationNode.prototype.onStop = function () {
    audioNodes.delete(this.id)
  }
  DestinationNode.prototype.getAudioNode = function () {
    return audioNodes.get(this.id)
  }
  LiteGraph.registerNodeType('audio/destination', DestinationNode)

  // Create initial nodes - a richer demo graph

  // Two oscillators for a chord
  const oscNode1 = LiteGraph.createNode('audio/oscillator')
  oscNode1.pos = [50, 50]
  oscNode1.properties.frequency = 261.63 // C4
  graph.add(oscNode1)

  const oscNode2 = LiteGraph.createNode('audio/oscillator')
  oscNode2.pos = [50, 180]
  oscNode2.properties.frequency = 329.63 // E4
  oscNode2.properties.type = 'triangle'
  graph.add(oscNode2)

  // Filter for tone shaping
  const filterNode = LiteGraph.createNode('audio/filter')
  filterNode.pos = [270, 50]
  filterNode.properties.frequency = 800
  filterNode.properties.type = 'lowpass'
  graph.add(filterNode)

  // Mixer/gain node
  const gainNode = LiteGraph.createNode('audio/gain')
  gainNode.pos = [270, 200]
  gainNode.properties.gain = 0.3
  graph.add(gainNode)

  // Delay for echo effect
  const delayNode = LiteGraph.createNode('audio/delay')
  delayNode.pos = [480, 120]
  delayNode.properties.delayTime = 0.25
  graph.add(delayNode)

  // Final output
  const destNode = LiteGraph.createNode('audio/destination')
  destNode.pos = [680, 150]
  graph.add(destNode)

  // Connect them: osc1 → filter → delay → output
  //               osc2 → gain ↗        ↗
  oscNode1.connect(0, filterNode, 0)
  oscNode2.connect(0, gainNode, 0)
  filterNode.connect(0, delayNode, 0)
  gainNode.connect(0, destNode, 1) // Direct to output (dry)
  delayNode.connect(0, destNode, 0) // Delayed signal (wet)

  // Play/Stop logic
  function startAudio() {
    state.audioCtx = new AudioContext()

    // Initialize all audio nodes
    graph._nodes.forEach((node) => {
      if (node.onStart) node.onStart()
    })

    // Connect based on graph links
    graph.links &&
      Object.values(graph.links).forEach((link) => {
        if (!link) return
        const sourceNode = graph.getNodeById(link.origin_id)
        const targetNode = graph.getNodeById(link.target_id)
        if (sourceNode?.getAudioNode && targetNode?.getAudioNode) {
          const srcAudio = sourceNode.getAudioNode()
          const tgtAudio = targetNode.getAudioNode()
          if (srcAudio && tgtAudio) {
            srcAudio.connect(tgtAudio)
          }
        }
      })

    state.isPlaying = true
    document.getElementById('play-btn').disabled = true
    document.getElementById('stop-btn').disabled = false
    console.log('🎵 Audio playing')
  }

  function stopAudio() {
    graph._nodes.forEach((node) => {
      if (node.onStop) node.onStop()
    })

    if (state.audioCtx) {
      state.audioCtx.close()
      state.audioCtx = null
    }

    state.isPlaying = false
    document.getElementById('play-btn').disabled = false
    document.getElementById('stop-btn').disabled = true
    console.log('⏹ Audio stopped')
  }

  // Button handlers
  document.getElementById('play-btn').onclick = startAudio
  document.getElementById('stop-btn').onclick = stopAudio

  document.getElementById('add-osc').onclick = () => {
    const node = LiteGraph.createNode('audio/oscillator')
    node.pos = [100 + Math.random() * 200, 100 + Math.random() * 200]
    graph.add(node)
  }

  document.getElementById('add-gain').onclick = () => {
    const node = LiteGraph.createNode('audio/gain')
    node.pos = [100 + Math.random() * 200, 100 + Math.random() * 200]
    graph.add(node)
  }

  document.getElementById('add-filter').onclick = () => {
    const node = LiteGraph.createNode('audio/filter')
    node.pos = [100 + Math.random() * 200, 100 + Math.random() * 200]
    graph.add(node)
  }

  document.getElementById('add-delay').onclick = () => {
    const node = LiteGraph.createNode('audio/delay')
    node.pos = [100 + Math.random() * 200, 100 + Math.random() * 200]
    graph.add(node)
  }

  console.log('🎛️ AudioContext Node Editor')
  console.log('Connect nodes and click Play to hear the audio')
  console.log('Adjust parameters in real-time while playing')
}
