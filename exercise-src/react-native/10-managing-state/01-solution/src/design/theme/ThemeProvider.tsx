import type { Theme } from "./theme"

import { useState, createContext, useContext, useMemo } from "react"
import { Appearance } from "react-native"

import themes from "./theme"

type Mode = keyof typeof themes

interface ThemeContext {
  mode: Mode
  setMode: (mode: Mode) => void
}

const Context = createContext<ThemeContext | undefined>({
  mode: "light",
  setMode: () => undefined,
})

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<Mode>(Appearance.getColorScheme() || "light")

  const value = useMemo(() => ({ mode, setMode }), [mode])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default ThemeProvider

export function useTheme(): Theme {
  const { mode } = useContext(Context)

  return themes[mode]
}

export function useThemeMode(): {
  mode: Mode
  setMode: (mode: Mode) => void
} {
  const { mode, setMode } = useContext(Context)

  return {
    mode,
    setMode,
  }
}
