import { render, screen } from "@testing-library/react-native"

import ListItem from "./ListItem"

describe("ListItem", () => {
  it("renders ListItem with given props", async () => {
    render(<ListItem key="test" name="test prop" />)
    expect(screen.getByText(/test prop/i, { exact: false })).toBeOnTheScreen()
  })
})
