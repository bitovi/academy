import { render, screen } from "@testing-library/react-native"

import * as restaurantHooks from "../../services/pmo/restaurant/hooks"

import RestaurantOrder from "./RestaurantOrder"
import MockApp from "../../MockApp"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

describe("RestaurantOrder component", () => {
  // Mock the hooks and components used in RestaurantOrder

  const mockRestaurantResponse = {
    data: {
      name: "Bagel Restaurant",
      slug: "bagel-restaurant",
      images: {
        thumbnail: "node_modules/place-my-order-assets/images/3-thumbnail.jpg",
        owner: "node_modules/place-my-order-assets/images/1-owner.jpg",
        banner: "node_modules/place-my-order-assets/images/2-banner.jpg",
      },
      menu: {
        lunch: [
          { name: "Crab Pancakes with Sorrel Syrup", price: 35.99 },
          { name: "Steamed Mussels", price: 21.99 },
          { name: "Roasted Salmon", price: 23.99 },
        ],
        dinner: [
          { name: "Truffle Noodles", price: 14.99 },
          { name: "Spinach Fennel Watercress Ravioli", price: 35.99 },
          { name: "Herring in Lavender Dill Reduction", price: 45.99 },
        ],
      },
      address: {
        street: "285 W Adams Ave",
        city: "Detroit",
        state: "MI",
        zip: "60045",
      },
      coordinate: {
        latitude: 0,
        longitude: 0,
      },
      resources: {
        thumbnail: "api/resources/images/3-thumbnail.jpg",
        owner: "api/resources/images/4-owner.jpg",
        banner: "api/resources/images/1-banner.jpg",
      },
      _id: "5NVE3Z5MXxX3O57R",
    },
  }

  let useRestaurant: jest.SpyInstance<
    ReturnType<typeof restaurantHooks.useRestaurant>
  >
  beforeEach(() => {
    jest.resetAllMocks()
    useRestaurant = jest.spyOn(restaurantHooks, "useRestaurant")
  })

  it("renders restaurant order form", () => {
    useRestaurant.mockReturnValue({
      ...mockRestaurantResponse,
      error: null,
      isPending: false,
    })

    render(
      <MockApp
        component={RestaurantOrder}
        params={{ restaurantId: "bagel-restaurant" }}
      />,
    )
    expect(screen.getByText(/Lunch Menu/i)).toBeOnTheScreen()
    expect(
      screen.getByText(mockRestaurantResponse.data.menu.lunch[0].name, {
        exact: false,
      }),
    ).toBeOnTheScreen()
    expect(screen.getByText(/Dinner Menu/i)).toBeOnTheScreen()
    expect(
      screen.getByText(mockRestaurantResponse.data.menu.dinner[0].name, {
        exact: false,
      }),
    ).toBeOnTheScreen()
  })

  it("renders loading restaurant", () => {
    useRestaurant.mockReturnValue({ data: null, error: null, isPending: true })

    render(
      <MockApp
        component={RestaurantOrder}
        params={{ restaurantId: "bagel-restaurant" }}
      />,
    )
    expect(screen.getByText(/Loading/i)).toBeOnTheScreen()
  })
  it("renders error restaurant", () => {
    useRestaurant.mockReturnValue({
      data: null,
      error: { name: "Oops", message: "This is the error" },
      isPending: false,
    })

    render(
      <MockApp
        component={RestaurantOrder}
        params={{ restaurantId: "bagel-restaurant" }}
      />,
    )

    expect(
      screen.getByText(/Error loading restaurant order:/),
    ).toBeOnTheScreen()
    expect(screen.getByText(/This is the error/)).toBeOnTheScreen()
  })
})
