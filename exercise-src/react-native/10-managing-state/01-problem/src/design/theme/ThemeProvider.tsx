import { useState, createContext, useContext, useMemo } from "react"
import { Appearance } from "react-native"

import themes, { Theme } from "./theme"

type Mode = keyof typeof themes

interface ThemeContext {
  mode: Mode
  setMode: (mode: Mode) => void
}

// Exercise: Update `Context` to set default values for `mode` and `setMode`.
const Context = createContext<ThemeContext>({
  theme,
})

export interface ThemeProviderProps {
  children: React.ReactNode
}

// Exercise: Update `ThemeProvider` to use `useState`, so the user can switch between the 2 modes.
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const value = useMemo(() => ({ theme }), [])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default ThemeProvider

// Exercise: Update `useTheme` to return 1 theme based on the `mode` that is stored in the context.
export function useTheme(): Theme {
  const { theme } = useContext(Context)

  return theme
}

// Exercise: Update `useThemeMode` to return `mode` and `setMode`.
export function useThemeMode(): {
  mode: Mode
  setMode: (mode: Mode) => void
} {
  //
}
