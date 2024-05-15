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

describe("Screens/RestaurantDetails", () => {
  it("renders", () => {
    render(<RestaurantDetails />)

    expect(screen.getByText("Cheese Curd City")).toBeOnTheScreen()
  })
})
