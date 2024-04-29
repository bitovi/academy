import { render, screen } from "@testing-library/react-native"

import Typography from "../Typography"

import Box from "./Box"

describe("Box component", () => {
  it("renders children components 'Hello!' without issue", () => {
    render(
      <Box padding="s" margin="s">
        <Typography>Hello!</Typography>
      </Box>,
    )

    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})
