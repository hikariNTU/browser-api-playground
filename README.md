<p align="center">
  <img src="src/assets/logo-horizontal.png" alt="Browser API Playground" width="400" />
</p>

<h1 align="center">Browser API Playground</h1>

<p align="center">
  <strong>🔬 An interactive playground for exploring powerful but lesser-known browser APIs</strong>
</p>

<p align="center">
  <a href="https://hikarintu.github.io/browser-api-playground/">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-blue?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
</p>

---

Built for a Frontend team tech sharing session to demonstrate the capabilities of modern browser APIs.

## ✨ Featured APIs

| API | Description |
|-----|-------------|
| 🎨 **EyeDropper API** | Pick colors from anywhere on screen |
| 🖥️ **Window Management API** | Multi-screen detection and window placement |
| 📹 **WebRTC & WebCodecs** | Camera access and video encoding |
| 📤 **Web Share API** | Native OS share dialogs |
| 💡 **Screen Wake Lock API** | Prevent screen dimming |
| 🔌 **Web Serial API** | Connect to hardware via serial port |
| 🎮 **Gamepad API** | Game controller input |
| ✨ **View Transitions API** | Smooth DOM animations |
| 🎙️ **Media Recorder API** | Audio recording and visualization |
| 🗜️ **Compression Streams** | Native gzip/deflate compression |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠 Tech Stack

- **Vite** - Build tool (rolldown-vite)
- **React 19** - UI framework
- **TailwindCSS 4** - Styling
- **shadcn/ui** - Component library
- **TanStack Router** - File-based routing
- **Monaco Editor** - Code editor (same as VS Code)

## 📦 Deployment

The app automatically deploys to GitHub Pages on push to `main`:

**🌐 Live Demo**: [https://hikarintu.github.io/browser-api-playground/](https://hikarintu.github.io/browser-api-playground/)

### Manual Deployment

```bash
# Build with correct base path
VITE_BASE_PATH=/browser-api-playground/ npm run build
```

## 🎯 Usage

1. Select an API from the sidebar
2. Read the description and check browser support
3. Edit the code in the Monaco editor
4. Press **⌘+Enter** (or click Run) to execute
5. View console output and results in the output panel
6. Try different examples from the Examples drawer

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| ⌘+Enter | Run code |
| ⌘+S | Save (auto-saved) |

## 📝 License

MIT

---

<p align="center">
  Made with ❤️ for Frontend team tech sharing
</p>
