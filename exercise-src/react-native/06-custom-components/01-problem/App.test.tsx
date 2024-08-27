import { render, screen } from "@testing-library/react-native"

import App, { StateList } from "./App"

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

describe("Screens/StateList", () => {
  it("renders", async () => {
    render(<StateList />)
    expect(screen.getByText(/Illinois/i)).toBeOnTheScreen()
    expect(screen.getByText(/Wisconsin/i)).toBeOnTheScreen()
  })
})
