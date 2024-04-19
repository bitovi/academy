import type { FC } from "react"
import type { Theme } from "./theme"

import { useState, createContext, useContext, useMemo } from "react"
import { Appearance } from "react-native"

import themes from "./theme"

type Mode = keyof typeof themes

interface ThemeContext {
  mode: Mode
  setMode: (mode: Mode) => void
}

const Context = createContext<ThemeContext | undefined>(undefined)

const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(Appearance.getColorScheme() || "light")

  const value = useMemo(() => ({ mode, setMode }), [mode])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default ThemeProvider

function useThemeContext(): ThemeContext {
  const context = useContext(Context)

  if (!context) {
    throw new Error(
      "Theme context cannot be accessed outside of the ThemeProvider.",
    )
  }

  return context
}

export function useTheme(): Theme {
  const { mode } = useThemeContext()

  return themes[mode]
}

export function useThemeMode(): {
  mode: Mode
  setMode: (mode: Mode) => void
} {
  const { mode, setMode } = useThemeContext()

  return {
    mode,
    setMode,
  }
}
