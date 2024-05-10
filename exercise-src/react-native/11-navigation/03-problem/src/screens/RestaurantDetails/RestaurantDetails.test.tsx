import { render, screen } from "@testing-library/react-native"

import RestaurantDetails from "./RestaurantDetails"

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native")
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      setOptions: jest.fn(),
    }),
  }
})
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

describe("RestaurantDetails component", () => {
  it("renders the RestaurantHeader and content when data is available", () => {
    render(<RestaurantDetails />)

    expect(screen.getByText("Cheese Curd City")).toBeOnTheScreen()
  })
})
