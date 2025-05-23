import Typography from "@shared/design/Typography"
import { render, screen } from "@testing-library/react-native"

import Box from "./Box"

describe("Design/Box", () => {
  it("renders", () => {
    render(
      <Box padding="s" margin="s">
        <Typography>Hello!</Typography>
      </Box>,
    )

    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
  })
})
