import { useState, useEffect, useCallback } from 'react'

type DevicePreferenceKey = 'preferredCamera' | 'preferredMicrophone'

/**
 * Hook for persisting device preferences (camera/microphone) in localStorage.
 * Returns a useState-compatible tuple [value, setValue].
 */
export function useDevicePreference(key: DevicePreferenceKey): [string, (value: string) => void] {
  const [value, setValue] = useState<string>(() => {
    if (typeof window === 'undefined') return ''
    return localStorage.getItem(key) || ''
  })

  // Sync to localStorage when value changes
  useEffect(() => {
    if (value) {
      localStorage.setItem(key, value)
    }
  }, [key, value])

  const setValueAndPersist = useCallback(
    (newValue: string) => {
      setValue(newValue)
      if (newValue) {
        localStorage.setItem(key, newValue)
      }
    },
    [key]
  )

  return [value, setValueAndPersist]
}
