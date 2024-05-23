import { render, screen, fireEvent } from "@testing-library/react-native"

import StateList from "./StateList"

describe("Screens/StateList", () => {
  it("renders", async () => {
    render(<StateList />)
    expect(screen.getByText(/Illinois/i)).toBeOnTheScreen()
    expect(screen.getByText(/Wisconsin/i)).toBeOnTheScreen()
  })
})
