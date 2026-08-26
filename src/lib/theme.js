import { create } from 'zustand'

const STORAGE_KEY = 'quoterate.theme'

function applyTheme(mode) {
  const root = document.documentElement
  if (mode === 'system') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', mode)
  }
}

function readStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored
    }
  } catch {
    // localStorage unavailable (private mode, disabled storage) — fall back silently
  }
  return 'system'
}

export const useThemeStore = create((set) => ({
  mode: readStoredTheme(),
  setMode: (mode) => {
    applyTheme(mode)
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      // best-effort persistence only
    }
    set({ mode })
  },
}))

// Apply the persisted theme immediately on module load so there is no
// flash of the wrong theme before React mounts.
applyTheme(useThemeStore.getState().mode)
