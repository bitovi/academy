import type { FC } from "react"

import { render, screen } from "@testing-library/react-native"
import { View, Text } from "react-native"

import Typography from "../Typography"

import ThemeProvider, { useTheme } from "./ThemeProvider"

describe("ThemeProvider Provider", () => {
  it("renders children", async () => {
    render(
      <ThemeProvider>
        <Typography>Hello!</Typography>
      </ThemeProvider>,
    )

    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})

describe("ThemeContext context", () => {
  const TestComponent: FC = () => {
    const theme = useTheme()

    return (
      <View>
        <Text>{theme.palette.primary.main}</Text>
      </View>
    )
  }

  it("context properties are accessible", async () => {
    render(<TestComponent />)

    expect(screen.getByText(/#005d63/)).toBeOnTheScreen()
  })
})
