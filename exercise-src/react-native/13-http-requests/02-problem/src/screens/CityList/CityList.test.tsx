import { NavigationContainer } from "@react-navigation/native"
import * as restaurantHooks from "@shared/services/pmo/restaurant/hooks"
import { render, screen } from "@testing-library/react-native"

import CityList from "./CityList"

const route = {
  key: "RestaurantDetails",
  name: "RestaurantDetails",
  params: {
    state: {
      name: "name",
      short: "short",
    },
  },
} as const

describe("Screens/CityList", () => {
  // Mock the hooks and components used in CityList

  const mockCitiesResponse = {
    data: [
      { name: "Detroit", state: "MI" },
      { name: "Ann Arbor", state: "MI" },
    ],
  }
  let useCities: jest.SpyInstance<ReturnType<typeof restaurantHooks.useCities>>
  beforeEach(() => {
    jest.resetAllMocks()
    useCities = jest.spyOn(restaurantHooks, "useCities")
  })

  it("renders", () => {
    useCities.mockReturnValue({
      ...mockCitiesResponse,
      error: undefined,
      isPending: false,
    })

    render(
      <NavigationContainer>
        {/* @ts-ignore */}
        <CityList route={route} />
      </NavigationContainer>,
    )
    expect(screen.getByText(/Detroit/i)).toBeOnTheScreen()
    expect(screen.getByText(/Ann Arbor/i)).toBeOnTheScreen()
  })

  it("renders loading state", () => {
    useCities.mockReturnValue({
      data: undefined,
      error: undefined,
      isPending: true,
    })

    render(
      <NavigationContainer>
        {/* @ts-ignore */}
        <CityList route={route} />
      </NavigationContainer>,
    )

    expect(screen.getByText(/Loading/i)).toBeOnTheScreen()
  })
})
