import { NavigationContainer } from "@react-navigation/native"
import { render, screen } from "@testing-library/react-native"

import AuthProvider from "../../services/auth/AuthProvider"
import * as restaurantHooks from "../../services/pmo/restaurant/hooks"

import RestaurantDetails from "./RestaurantDetails"

const route = {
  key: "RestaurantDetails",
  name: "RestaurantDetails",
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
  // Mock the hooks and components used in RestaurantDetails

  let useRestaurant: jest.SpyInstance<
    ReturnType<typeof restaurantHooks.useRestaurant>
  >
  beforeEach(() => {
    jest.resetAllMocks()
    useRestaurant = jest.spyOn(restaurantHooks, "useRestaurant")
  })

  const mockRestaurantData = {
    data: {
      _id: "1",
      name: "Test Restaurant",
      slug: "test-restaurant",
      images: {
        banner: "banner.jpg",
        owner: "owner.jpg",
        thumbnail: "thumbnail.jpg",
      },
      menu: {
        dinner: [{ name: "yum", price: 1 }],
        lunch: [{ name: "snack", price: 2 }],
      },
      coordinate: { latitude: 0, longitude: 0 },
    },
    isPending: false,
    error: undefined,
  }

  it("renders", () => {
    useRestaurant.mockReturnValue(mockRestaurantData)

    render(
      <NavigationContainer>
        <AuthProvider>
          {/* @ts-ignore */}
          <RestaurantDetails route={route} />
        </AuthProvider>
      </NavigationContainer>,
    )

    expect(screen.getByText("Test Restaurant")).toBeOnTheScreen()
  })

  it("renders before data loads", () => {
    useRestaurant.mockReturnValue({ ...mockRestaurantData, data: undefined })
    render(
      <NavigationContainer>
        <AuthProvider>
          {/* @ts-ignore */}
          <RestaurantDetails route={route} />
        </AuthProvider>
      </NavigationContainer>,
    )

    expect(screen.getByText("")).toBeOnTheScreen()
  })

  it("renders loading state", () => {
    useRestaurant.mockReturnValue({
      data: undefined,
      isPending: true,
      error: undefined,
    })

    render(
      <NavigationContainer>
        <AuthProvider>
          {/* @ts-ignore */}
          <RestaurantDetails route={route} />
        </AuthProvider>
      </NavigationContainer>,
    )

    expect(screen.getByText(/Loading/i)).toBeOnTheScreen()
  })

  it("renders error state", () => {
    useRestaurant.mockReturnValue({
      data: undefined,
      isPending: false,
      error: { name: "Error", message: "Mock error" },
    })

    render(
      <NavigationContainer>
        <AuthProvider>
          {/* @ts-ignore */}
          <RestaurantDetails route={route} />
        </AuthProvider>
      </NavigationContainer>,
    )

    expect(
      screen.getByText(/Error loading restaurant details:/i, {
        exact: false,
      }),
    ).toBeOnTheScreen()
    expect(screen.getByText(/Mock error/i)).toBeOnTheScreen()
  })
})
