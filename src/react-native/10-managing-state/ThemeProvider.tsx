import { createContext, useContext, useMemo } from "react"

import theme, { Theme } from "./theme"

interface ThemeContext {
  theme: Theme
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
