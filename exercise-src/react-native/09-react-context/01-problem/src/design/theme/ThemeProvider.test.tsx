import { render, screen } from "@testing-library/react-native"
import { View, Text } from "react-native"

import ThemeProvider, { useTheme } from "./ThemeProvider"

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
