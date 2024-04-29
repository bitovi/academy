import { render, screen } from "@testing-library/react-native"

import * as restaurantHooks from "../../services/pmo/restaurant/hooks"
import AuthProvider from "../../services/auth"

import RestaurantDetails from "./RestaurantDetails"

const params = {
  state: {
    name: "name",
    short: "short",
  },
  city: {
    name: "name",
    state: "state",
  },
  slug: "test",
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
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

describe("RestaurantDetails component", () => {
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
    error: null,
  }
  it("renders loading state", () => {
    useRestaurant.mockReturnValue({ data: null, isPending: true, error: null })
    render(
      <AuthProvider>
        {/* @ts-ignore */}
        <RestaurantDetails route={{ params }} />
      </AuthProvider>,
    )

    expect(screen.getByText(/Loading/i)).toBeOnTheScreen()
  })

  it("renders error state", () => {
    useRestaurant.mockReturnValue({
      data: null,
      isPending: false,
      error: { name: "Error", message: "Mock error" },
    })
    render(
      <AuthProvider>
        {/* @ts-ignore */}
        <RestaurantDetails route={{ params }} />
      </AuthProvider>,
    )
    expect(
      screen.getByText(/Error loading restaurant details:/i, {
        exact: false,
      }),
    ).toBeOnTheScreen()
    expect(screen.getByText(/Mock error/i)).toBeOnTheScreen()
  })

  it("renders the RestaurantHeader and content when data is available", () => {
    useRestaurant.mockReturnValue(mockRestaurantData)
    render(
      <AuthProvider>
        {/* @ts-ignore */}
        <RestaurantDetails route={{ params }} />
      </AuthProvider>,
    )

    expect(screen.getByText("Test Restaurant")).toBeOnTheScreen()
  })

  it("renders the RestaurantHeader and content when data is not available", () => {
    useRestaurant.mockReturnValue({ ...mockRestaurantData, data: null })
    render(
      <AuthProvider>
        {/* @ts-ignore */}
        <RestaurantDetails route={{ params }} />
      </AuthProvider>,
    )

    expect(screen.getByText("Place an order")).toBeOnTheScreen()
  })
})
