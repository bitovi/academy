import { createContext, useContext, useMemo } from "react"

import theme, { Theme } from "./theme"

interface ThemeContext {
  theme: Theme
}

const Context = createContext<ThemeContext>({ theme })

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
