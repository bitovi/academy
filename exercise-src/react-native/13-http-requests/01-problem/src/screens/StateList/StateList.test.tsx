import { NavigationContainer } from "@react-navigation/native"
import { render, screen } from "@testing-library/react-native"

import * as restaurantHooks from "@shared/services/pmo/restaurant/hooks"

import StateList from "./StateList"

describe("Screens/StateList", () => {
  // Mock the hooks and components used in StateList
  const mockStateResponse = {
    data: [
      { short: "MI", name: "Michigan" },
      { short: "WI", name: "Wisconsin" },
      { short: "IL", name: "Illinois" },
    ],
  }

  let useStates: jest.SpyInstance<ReturnType<typeof restaurantHooks.useStates>>
  beforeEach(() => {
    jest.resetAllMocks()
    useStates = jest.spyOn(restaurantHooks, "useStates")
  })

  it("renders", () => {
    useStates.mockReturnValue({
      ...mockStateResponse,
      error: undefined,
      isPending: false,
    })

    render(
      <NavigationContainer>
        <StateList />
      </NavigationContainer>,
    )
    expect(screen.getByText(/Michigan/i)).toBeOnTheScreen()
    expect(screen.getByText(/Wisconsin/i)).toBeOnTheScreen()
    expect(screen.getByText(/Illinois/i)).toBeOnTheScreen()
  })

  it("renders loading state", () => {
    useStates.mockReturnValue({
      data: undefined,
      error: undefined,
      isPending: true,
    })

    render(
      <NavigationContainer>
        <StateList />
      </NavigationContainer>,
    )

    expect(screen.getByText(/Loading/i)).toBeOnTheScreen()
  })
})
