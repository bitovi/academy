import { useState, createContext, useContext, useMemo } from "react"
import { Appearance } from "react-native"

import themes, { Theme } from "./theme"

type Mode = keyof typeof themes

interface ThemeContext {
  mode: Mode
  setMode: (mode: Mode) => void
}

const Context = createContext<ThemeContext>({
  theme,
})

export interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const value = useMemo(() => ({ theme }), [])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default ThemeProvider

export function useTheme(): Theme {
  const { theme } = useContext(Context)

  return theme
}

export function useThemeMode(): {
  mode: Mode
  setMode: (mode: Mode) => void
} {
  //
}
