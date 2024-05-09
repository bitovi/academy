import { render, screen, waitFor } from "@testing-library/react-native"
import App from "./App"

describe("App", () => {
  it("renders", async () => {
    render(<App />)

    await waitFor(() => {
      const placeMyOrderText = screen.getAllByText(/Place my order/i)
      expect(placeMyOrderText).toHaveLength(2)
    })
  })
})
