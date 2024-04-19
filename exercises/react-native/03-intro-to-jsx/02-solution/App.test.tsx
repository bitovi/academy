import { render, screen } from "@testing-library/react-native"
import App from "./App"

describe("App", () => {
  it("renders", async () => {
    render(<App />)
    expect(screen.getByText(/Place my order/i)).toBeOnTheScreen()
  })
  it("renders states", async () => {
    render(<App />)
    expect(screen.getByText(/Illinois/i)).toBeOnTheScreen()
    expect(screen.getByText(/Wisconsin/i)).toBeOnTheScreen()
  })
})