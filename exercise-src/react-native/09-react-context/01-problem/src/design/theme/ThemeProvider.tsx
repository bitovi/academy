import { createContext, useContext, useMemo } from "react"

import theme, { Theme } from "./theme"

interface ThemeContext {
  theme: Theme
}

// Exercise: Update `ThemeProvider` to provide data according to the provided `ThemeContext`.

const ThemeProvider: React.FC = () => {
  // Exercise: Implement the ThemeProvider.
}

export default ThemeProvider

export function useTheme(): Theme {
  // Exercise: Create the Context.
}
