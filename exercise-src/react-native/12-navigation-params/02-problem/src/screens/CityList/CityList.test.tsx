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

describe("CityList component", () => {
  it("renders city List", () => {
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
