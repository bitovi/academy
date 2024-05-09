import type { FC } from "react"
import type { Theme } from "./theme"

import { createContext, useContext, useMemo } from "react"

import theme from "./theme"

interface ThemeContext {
  theme: Theme
}

// TODO

const ThemeProvider: FC = () => {
  // TODO
}

export default ThemeProvider

export function useTheme(): Theme {
  // TODO
}
