import { NavigationContainer } from "@react-navigation/native"
import { render, screen } from "@testing-library/react-native"

import * as restaurantHooks from "../../services/pmo/restaurant/hooks"

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

describe("CityList component", () => {
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

  it("renders city List", () => {
    useCities.mockReturnValue({
      ...mockCitiesResponse,
      error: null,
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

  it("renders loading city", () => {
    useCities.mockReturnValue({ data: null, error: null, isPending: true })

    render(
      <NavigationContainer>
        {/* @ts-ignore */}
        <CityList route={route} />
      </NavigationContainer>,
    )

    expect(screen.getByText(/Loading/i)).toBeOnTheScreen()
  })
})
