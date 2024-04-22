import { render, screen } from "@testing-library/react-native"

import Typography from "./Typography"

describe("Typography component", () => {
  it("renders 'Hello' when given input", () => {
    render(<Typography variant="body">Hello!</Typography>)

    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})
