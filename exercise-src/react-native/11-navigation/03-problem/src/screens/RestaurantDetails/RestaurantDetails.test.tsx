import { render, screen } from "@testing-library/react-native"

import RestaurantDetails from "./RestaurantDetails"

const params = {
  slug: "test",
} as const

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
    render(<RestaurantDetails route={{ params }} />)

    expect(screen.getByText("Cheese Curd City")).toBeOnTheScreen()
  })
})