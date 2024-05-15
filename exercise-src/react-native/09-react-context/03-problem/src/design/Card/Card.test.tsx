import { render, screen } from "@testing-library/react-native"

import Typography from "../Typography"

import Card from "./Card"

describe("Design/Card", () => {
  it("renders", () => {
    render(
      <Card title="Hello!">
        <Typography variant="body">How are you?</Typography>
      </Card>,
    )

    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
    expect(screen.getByText(/How are you?/)).toBeOnTheScreen()
  })
})
