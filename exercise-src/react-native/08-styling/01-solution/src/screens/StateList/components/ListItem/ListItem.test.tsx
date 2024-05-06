import { render, screen } from "@testing-library/react-native"
import ListItem from "./ListItem"

describe("ListItem", () => {
  it("renders", async () => {
    render(<ListItem name="One" />)

    const element = screen.getByText(/One/i)
    expect(element).toBeOnTheScreen()

    expect(element).toHaveStyle({
      fontSize: 21,
      color: "white",
      backgroundColor: "darkgreen",
      padding: 10,
      marginVertical: 5,
    })
  })
})
