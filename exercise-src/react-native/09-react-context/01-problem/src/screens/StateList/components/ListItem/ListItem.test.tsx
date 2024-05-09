import { render, screen } from "@testing-library/react-native"
import ListItem from "./ListItem"

describe("ListItem", () => {
  it("renders", async () => {
    render(<ListItem name="One" />)

    const element = screen.getByText(/One/i)
    expect(element).toBeOnTheScreen()

    expect(element).toHaveStyle({
      fontSize: 21,
      color: "#ffffff",
      backgroundColor: "#007980",
      padding: 16,
      marginVertical: 8,
    })
  })
})
