import {
  render,
  screen,
  renderHook,
  waitFor,
} from "@testing-library/react-native"
import { View, Text } from "react-native"

import ThemeProvider, { useTheme, useThemeMode } from "./ThemeProvider"

describe("ThemeProvider Provider", () => {
  it("renders children", async () => {
    render(
      <ThemeProvider>
        <Text>Hello!</Text>
      </ThemeProvider>,
    )

    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})

describe("ThemeContext context", () => {
  const TestComponent: React.FC = () => {
    const theme = useTheme()

    return (
      <View>
        <Text>{theme.palette.primary.main}</Text>
      </View>
    )
  }

  it("context properties are accessible", async () => {
    render(<TestComponent />)

    expect(screen.getByText(/#007980/)).toBeOnTheScreen()
  })
})

describe("Theme mode", () => {
  it("toggles", async () => {
    const { result } = renderHook(() => useThemeMode(), {
      wrapper: ThemeProvider,
    })

    expect(result.current.mode).toBe("light")

    await waitFor(() => {
      result.current.setMode("dark")
      expect(result.current.mode).not.toBe("light")
    })

    expect(result.current.mode).toBe("dark")
  })
})
