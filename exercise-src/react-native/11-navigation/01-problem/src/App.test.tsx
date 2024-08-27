import { render, screen } from "@testing-library/react-native"

import App from "./App"

describe("App", () => {
  it("renders", async () => {
    render(<App />)

    const placeMyOrderText = screen.getAllByText(/Place my order/i)
    expect(placeMyOrderText).toHaveLength(3)
  })

  it("renders states", async () => {
    render(<App />)

    expect(await screen.findByText(/Illinois/i)).toBeOnTheScreen()
    expect(await screen.findByText(/Wisconsin/i)).toBeOnTheScreen()
  })
})
