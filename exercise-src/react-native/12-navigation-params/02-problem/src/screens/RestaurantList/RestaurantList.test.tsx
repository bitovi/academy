import { NavigationContainer } from "@react-navigation/native"
import { render, screen } from "@testing-library/react-native"

import RestaurantList from "./RestaurantList"

const route = {
  key: "RestaurantList",
  name: "RestaurantList",
  params: {
    state: {
      name: "name",
      short: "short",
    },
    city: {
      name: "name",
      state: "state",
    },
    slug: "test",
  },
} as const

describe("Screens/RestaurantList", () => {
  it("renders", () => {
    render(
      <NavigationContainer>
        {/* @ts-ignore */}
        <RestaurantList route={route} />
      </NavigationContainer>,
    )
    expect(screen.getByText(/Cheese Curd City/i)).toBeOnTheScreen()
    expect(screen.getByText(/Poutine Palace/i)).toBeOnTheScreen()
  })
})
