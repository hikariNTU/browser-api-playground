import { useState, useEffect, useRef } from 'react'
import { Gamepad2 } from 'lucide-react'

interface GamepadState {
  id: string
  buttons: boolean[]
  axes: number[]
}

export function GamepadPreview() {
  const [gamepad, setGamepad] = useState<GamepadState | null>(null)
  const rafRef = useRef<number | null>(null)

  const hasGamepad = 'getGamepads' in navigator

  useEffect(() => {
    if (!hasGamepad) return

    const pollGamepads = () => {
      const gamepads = navigator.getGamepads()
      const gp = gamepads[0] || gamepads[1] || gamepads[2] || gamepads[3]

      if (gp) {
        setGamepad({
          id: gp.id,
          buttons: gp.buttons.map((b) => b.pressed),
          axes: Array.from(gp.axes).map((a) => Math.round(a * 100) / 100),
        })
      } else {
        setGamepad(null)
      }

      rafRef.current = requestAnimationFrame(pollGamepads)
    }

    rafRef.current = requestAnimationFrame(pollGamepads)

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [hasGamepad])

  if (!hasGamepad) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Gamepad2 className="h-12 w-12 text-muted-foreground" />
        <p className="text-sm text-destructive">Gamepad API not supported</p>
      </div>
    )
  }

  if (!gamepad) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Gamepad2 className="h-12 w-12 text-muted-foreground animate-pulse" />
        <p className="text-sm text-muted-foreground text-center">
          Connect a gamepad and press any button
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Gamepad2 className="h-10 w-10 text-emerald-500" />
      <p className="text-xs text-muted-foreground text-center truncate max-w-full">{gamepad.id}</p>

      <div className="flex gap-6">
        {/* Buttons visualization */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-center mb-2">Buttons</p>
          <div className="grid grid-cols-4 gap-1">
            {gamepad.buttons.slice(0, 16).map((pressed, i) => (
              <div
                key={i}
                className={`w-5 h-5 rounded text-[10px] flex items-center justify-center ${
                  pressed ? 'bg-emerald-500 text-white' : 'bg-muted text-muted-foreground'
                }`}
              >
                {i}
              </div>
            ))}
          </div>
        </div>

        {/* Axes visualization */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-center mb-2">Axes</p>
          <div className="grid grid-cols-2 gap-2">
            {gamepad.axes.slice(0, 4).map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{
                      width: `${((value + 1) / 2) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
