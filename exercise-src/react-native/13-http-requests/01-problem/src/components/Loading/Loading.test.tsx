import { render, screen } from "@testing-library/react-native"
import Loading from "./Loading"

describe("Loading component", () => {
  it("renders 'loading' text", () => {
    render(<Loading />)
    expect(screen.getByText(/Loading…/)).toBeOnTheScreen()
  })
})
