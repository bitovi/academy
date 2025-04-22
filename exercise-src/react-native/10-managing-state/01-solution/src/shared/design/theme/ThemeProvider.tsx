import { useState, createContext, useContext, useMemo } from "react"
import { Appearance } from "react-native"

import themes, { Theme } from "./theme"

type Mode = keyof typeof themes

interface ThemeContext {
  mode: Mode
  setMode: (mode: Mode) => void
}

const Context = createContext<ThemeContext>({
  mode: "light",
  setMode: () => undefined,
})

export interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
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

  return { mode, setMode }
}
