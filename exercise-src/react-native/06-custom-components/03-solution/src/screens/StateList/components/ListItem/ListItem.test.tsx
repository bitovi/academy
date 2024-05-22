import { render, screen } from "@testing-library/react-native"

import ListItem from "./ListItem"

describe("Screens/StateList/ListItem", () => {
  it("renders", async () => {
    render(<ListItem name="test prop" />)
    expect(screen.getByText(/test prop/i, { exact: false })).toBeOnTheScreen()
  })
})
