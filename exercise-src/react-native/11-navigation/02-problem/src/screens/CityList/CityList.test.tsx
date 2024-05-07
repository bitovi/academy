import { render, screen } from "@testing-library/react-native"

import CityList from "./CityList"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

describe("CityList component", () => {
  it("renders city List", () => {
    render(<CityList />)

    expect(screen.getByText(/Madison/i)).toBeOnTheScreen()
    expect(screen.getByText(/Springfield/i)).toBeOnTheScreen()
  })
})
