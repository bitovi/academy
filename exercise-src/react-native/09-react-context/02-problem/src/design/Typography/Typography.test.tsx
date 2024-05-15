import { render, screen } from "@testing-library/react-native"

import Typography from "./Typography"

describe("Design/Typography", () => {
  it("renders", () => {
    render(<Typography variant="body">Hello!</Typography>)

    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})
