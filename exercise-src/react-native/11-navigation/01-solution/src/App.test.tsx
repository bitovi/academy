import { render, screen, waitFor } from "@testing-library/react-native"

import App from "./App"

describe("App", () => {
  it("renders", async () => {
    render(<App />)

    const placeMyOrderText = screen.getAllByText(/Place my order/i)
    expect(placeMyOrderText).toHaveLength(3)
  })

  it("renders states", async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/Illinois/i)).toBeOnTheScreen()
      expect(screen.getByText(/Wisconsin/i)).toBeOnTheScreen()
    })
  })
})
