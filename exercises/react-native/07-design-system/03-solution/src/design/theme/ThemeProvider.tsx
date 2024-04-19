import type { FC } from "react"
import type { Theme } from "./theme"

import { createContext, useContext, useMemo } from "react"
import { Appearance } from "react-native"

import themes from "./theme"

type Mode = keyof typeof themes

interface ThemeContext {
  mode: Mode
}

const Context = createContext<ThemeContext | undefined>(undefined)

const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const mode = Appearance.getColorScheme() || "light"

  const value = useMemo(() => ({ mode }), [mode])

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
