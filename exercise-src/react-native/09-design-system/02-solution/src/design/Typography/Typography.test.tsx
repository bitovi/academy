import { render, screen } from "@testing-library/react-native"

import ThemeProvider from "../theme/ThemeProvider"
import Typography from "./Typography"

describe("Typography component", () => {
  it("renders 'Hello' when given input", () => {
    render(
      <ThemeProvider>
        <Typography variant="body">
          Hello!
        </Typography>
      </ThemeProvider>
    )

    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})
