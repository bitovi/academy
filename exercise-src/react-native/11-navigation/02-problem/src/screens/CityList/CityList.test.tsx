import { render, screen } from "@testing-library/react-native"

import CityList from "./CityList"

describe("Screens/CityList", () => {
  it("renders", () => {
    render(<CityList />)

    expect(screen.getByText(/Madison/i)).toBeOnTheScreen()
    expect(screen.getByText(/Springfield/i)).toBeOnTheScreen()
  })
})
