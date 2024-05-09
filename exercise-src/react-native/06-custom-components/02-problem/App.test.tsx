import { render, screen } from "@testing-library/react-native"
import App from "./App"
import { StateList, ListItem } from "./App"

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

describe("StateList", () => {
  it("renders states", async () => {
    render(<StateList />)
    expect(screen.getByText(/Illinois/i)).toBeOnTheScreen()
    expect(screen.getByText(/Wisconsin/i)).toBeOnTheScreen()
  })
})

describe("ListItem", () => {
  it("renders ListItem with given name property", async () => {
    render(<ListItem name="This is a given name property." />)
    expect(
      screen.getByText(/This is a given name property./i, { exact: false }),
    ).toBeOnTheScreen()
  })
})
