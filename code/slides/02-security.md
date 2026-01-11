# The Browser Security Model

Browser APIs are **permission-gated** — users stay in control.

## How It Works

```
User Action → Permission Prompt → API Access
    │              │                  │
  Click        "Allow mic?"      Start recording
```

No silent access. No hidden data collection.

---

## Permission Examples

| API | Permission Required |
|-----|---------------------|
| 🎤 Microphone | `getUserMedia()` prompt |
| 📍 Geolocation | Location access prompt |
| 📁 File System | File picker dialog |
| 🔔 Notifications | Notification prompt |
| 📷 Camera | Camera access prompt |

**Secure contexts only** — Most APIs require HTTPS

---

## Sandboxed by Design

- 🔒 **Isolated** — Can't access other tabs or system files
- 🛡️ **Origin-bound** — Permissions tied to domain
- 🚫 **No ambient access** — Must request each capability
- ⏱️ **Revocable** — Users can revoke anytime

This is why browser apps can be trusted more than native downloads.
