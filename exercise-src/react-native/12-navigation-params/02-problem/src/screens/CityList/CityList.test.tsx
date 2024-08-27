import { NavigationContainer } from "@react-navigation/native"
import { render, screen } from "@testing-library/react-native"

import CityList from "./CityList"

const route = {
  key: "CityList",
  name: "CityList",
  params: {
    state: {
      name: "name",
      short: "short",
    },
  },
} as const

describe("Screens/CityList", () => {
  it("renders", () => {
    render(
      <NavigationContainer>
        {/* @ts-ignore */}
        <CityList route={route} />
      </NavigationContainer>,
    )
    expect(screen.getByText(/Madison/i)).toBeOnTheScreen()
    expect(screen.getByText(/Springfield/i)).toBeOnTheScreen()
  })
})
