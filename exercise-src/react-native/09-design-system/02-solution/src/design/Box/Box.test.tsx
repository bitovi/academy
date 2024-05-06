import { render, screen } from "@testing-library/react-native"

import ThemeProvider from "../theme/ThemeProvider"
import Typography from "../Typography"

import Box from "./Box"

describe("Box component", () => {
  it("renders children components 'Hello!' without issue", () => {
    render(
      <ThemeProvider>
        <Box padding="s" margin="s">
          <Typography>Hello!</Typography>
        </Box>
      </ThemeProvider>
    )

    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})
