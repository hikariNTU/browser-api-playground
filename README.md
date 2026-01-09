# Browser API Playground

An interactive playground for exploring powerful but lesser-known browser APIs. Built for a Frontend team tech sharing session.

## 🎮 Featured APIs

- **EyeDropper API** - Pick colors from anywhere on screen
- **Window Management API** - Multi-screen detection and window placement
- **WebRTC & WebCodecs** - Camera access and video encoding
- **Web Share API** - Native OS share dialogs
- **Screen Wake Lock API** - Prevent screen dimming
- **Web Serial API** - Connect to hardware via serial port
- **Gamepad API** - Game controller input
- **View Transitions API** - Smooth DOM animations

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

- **Vite** - Build tool
- **React 18** - UI framework
- **TailwindCSS** - Styling
- **shadcn/ui** - Component library
- **TanStack Router** - File-based routing
- **Jotai** - State management
- **Monaco Editor** - Code editor (same as VS Code)

## 📦 Deployment

The app automatically deploys to GitHub Pages on push to `main`:

**Live Demo**: https://[username].github.io/browser-api-playground/

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

