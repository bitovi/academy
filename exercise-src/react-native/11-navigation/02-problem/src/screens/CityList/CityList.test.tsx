import { render, screen } from "@testing-library/react-native"

import CityList from "./CityList"

describe("CityList component", () => {
  it("renders city List", () => {
    render(<CityList />)

    expect(screen.getByText(/Madison/i)).toBeOnTheScreen()
    expect(screen.getByText(/Springfield/i)).toBeOnTheScreen()
  })
})
