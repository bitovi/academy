import { NavigationContainer } from "@react-navigation/native"
import { render, screen } from "@testing-library/react-native"

import CityList from "./CityList"

describe("CityList component", () => {
  it("renders city List", () => {
    render(
      <NavigationContainer>
        <CityList
          route={{ params: { state: { name: "test", short: "test" } } }}
        />
      </NavigationContainer>,
    )
    expect(screen.getByText(/Madison/i)).toBeOnTheScreen()
    expect(screen.getByText(/Springfield/i)).toBeOnTheScreen()
  })
})
