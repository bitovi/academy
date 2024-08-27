import { NavigationContainer } from "@react-navigation/native"
import { render, screen } from "@testing-library/react-native"

import RestaurantList from "./RestaurantList"

describe("Screens/RestaurantList", () => {
  it("renders", () => {
    render(
      <NavigationContainer>
        <RestaurantList />
      </NavigationContainer>,
    )
    expect(screen.getByText(/Cheese Curd City/i)).toBeOnTheScreen()
    expect(screen.getByText(/Poutine Palace/i)).toBeOnTheScreen()
  })
})
