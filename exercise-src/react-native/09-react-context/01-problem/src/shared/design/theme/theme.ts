import { TextStyle } from "react-native"

interface Palette {
  main: string
  soft: string
  strong: string
  contrast: string
}

export interface Theme {
  palette: {
    screen: Palette
    primary: Palette
    secondary: Palette
  }
  spacing: {
    none: 0
    xs: number
    s: number
    m: number
    l: number
    xl: number
  }
  typography: {
    title: TextStyle
    heading: TextStyle
    body: TextStyle
    label: TextStyle
  }
}

export type ThemeMargin =
  | keyof Theme["spacing"]
  | [keyof Theme["spacing"], keyof Theme["spacing"]]
export type ThemePadding =
  | keyof Theme["spacing"]
  | [keyof Theme["spacing"], keyof Theme["spacing"]]

const theme: Theme = {
  palette: {
    screen: {
      main: "#ffffff",
      soft: "#e0e0e0",
      strong: "#ffffff",
      contrast: "#222222",
    },
    primary: {
      main: "#007980",
      soft: "#00a5ad",
      strong: "#006166",
      contrast: "#ffffff",
    },
    secondary: {
      main: "#ca2f35",
      soft: "#d93237",
      strong: "#a3262b",
      contrast: "#ffffff",
    },
  },
  spacing: {
    none: 0,
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  typography: {
    title: {
      fontSize: 21,
      fontWeight: "500",
    },
    heading: {
      fontSize: 24,
      fontWeight: "500",
    },
    body: {
      fontWeight: "normal",
    },
    label: {
      fontSize: 12,
      fontWeight: "bold",
    },
  },
}

export default theme
