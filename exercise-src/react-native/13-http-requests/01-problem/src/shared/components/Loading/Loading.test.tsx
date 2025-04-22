import { render, screen } from "@testing-library/react-native"

import Loading from "./Loading"

describe("Components/Loading", () => {
  it("renders", () => {
    render(<Loading />)
    expect(screen.getByText(/Loading…/)).toBeOnTheScreen()
  })
})
