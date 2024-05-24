import { render, screen } from "@testing-library/react-native"

import App, { StateList, ListItem } from "./App"

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

describe("Screens/StateList/ListItem", () => {
  it("renders", async () => {
    render(<ListItem name="This is a given name prop." />)
    expect(
      screen.getByText(/This is a given name prop./i, { exact: false }),
    ).toBeOnTheScreen()
  })
})
