import { createContext, useContext, useMemo } from "react"

import theme, { Theme } from "./theme"

interface ThemeContext {
  theme: Theme
}

// TODO

const ThemeProvider: React.FC = () => {
  // TODO
}

export default ThemeProvider

export function useTheme(): Theme {
  // TODO
}
