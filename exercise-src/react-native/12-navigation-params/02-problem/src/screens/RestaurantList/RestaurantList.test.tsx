import { NavigationContainer } from "@react-navigation/native"
import { render, screen } from "@testing-library/react-native"

import RestaurantList from "./RestaurantList"

const params = {
  state: {
    short: "sT",
    name: "stateTest",
  },
  city: {
    name: "cityTest",
    state: "sT",
  },
  slug: "slugTest",
}

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

describe("RestaurantList component", () => {
  it("renders restaurant List", () => {
    render(
      <NavigationContainer>
        <RestaurantList route={{ params }} />
      </NavigationContainer>,
    )
    expect(screen.getByText(/Cheese Curd City/i)).toBeOnTheScreen()
    expect(screen.getByText(/Poutine Palace/i)).toBeOnTheScreen()
  })
})
