import type { Theme } from "./theme"

import { useState, createContext, useContext, useMemo } from "react"
import { Appearance } from "react-native"

import themes from "./theme"

type Mode = keyof typeof themes

interface ThemeContext {
  mode: Mode
  setMode: (mode: Mode) => void
}

const Context = createContext<ThemeContext>({
  theme,
})

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value = useMemo(() => ({ theme }), [])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default ThemeProvider

export function useTheme(): Theme {
  const { theme } = useContext(Context)

  return theme
}

export function useThemeMode() {
  return
}
