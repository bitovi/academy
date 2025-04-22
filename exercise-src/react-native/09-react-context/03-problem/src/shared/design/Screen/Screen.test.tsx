import Typography from "@shared/design/Typography"
import { render, screen } from "@testing-library/react-native"

import Screen from "./Screen"

describe("Design/Screen", () => {
  it("renders", () => {
    render(
      <Screen>
        <Typography variant="body">How are you?</Typography>
      </Screen>,
    )

    expect(screen.getByText(/How are you?/)).toBeOnTheScreen()
  })
})
