import { render, screen } from "@testing-library/react-native"

import Typography from "../Typography"

import Screen from "./Screen"

describe("Screen component", () => {
  it("renders children", () => {
    render(
      <Screen>
        <Typography variant="body">How are you?</Typography>
      </Screen>,
    )

    expect(screen.getByText(/How are you?/)).toBeOnTheScreen()
  })
})
