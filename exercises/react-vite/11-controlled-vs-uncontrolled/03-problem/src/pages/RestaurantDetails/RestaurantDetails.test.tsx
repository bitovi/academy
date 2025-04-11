import "@testing-library/jest-dom"
import type { ReactNode } from "react"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import type { ArgumentsType, Mock } from "vitest"
import RestaurantDetails from "./RestaurantDetails"

import { useRestaurant } from "../../services/pmo/restaurant"

// Mock the hooks and components used in RestaurantDetails
vi.mock("../../services/pmo/restaurant", () => ({
  useRestaurant: vi.fn(),
}))

vi.mock("../../components/RestaurantHeader", () => ({
  default: vi.fn(() => (
    <div data-testid="mock-restaurant-header">Mock RestaurantHeader</div>
  )),
}))

const mockUseRestaurant = useRestaurant as Mock<ArgumentsType<typeof useRestaurant>, ReturnType<typeof useRestaurant>>

const mockRestaurantData = {
  data: {
    _id: "1",
    name: "Test Restaurant",
    slug: "test-restaurant",
    images: { owner: "owner.jpg", banner: '', thumbnail: '' },
    menu: { dinner: [], lunch: [] },
  },
  isPending: false,
  error: undefined,
}

const renderWithRouter = (
  ui: ReactNode,
  { route = "/restaurants/test-restaurant" } = {},
) => {
  window.history.pushState({}, "Test page", route)
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    ),
  })
}

describe("RestaurantDetails component", () => {
  it("renders loading state", () => {
    mockUseRestaurant.mockReturnValue({ data: undefined, isPending: true, error: undefined })
    renderWithRouter(<RestaurantDetails />)
    expect(screen.getByText(/Loading restaurant…/i)).toBeInTheDocument()
  })

  it("renders error state", () => {
    mockUseRestaurant.mockReturnValue({
      data: undefined,
      isPending: false,
      error: { name: '', message: "Error loading" },
    })
    renderWithRouter(<RestaurantDetails />)
    expect(screen.getByText(/Error loading restaurant/i)).toBeInTheDocument()
  })

  it("renders no restaurant found state", () => {
    mockUseRestaurant.mockReturnValue({ data: undefined, isPending: false, error: undefined })
    renderWithRouter(<RestaurantDetails />)
    expect(screen.getByText(/No restaurant found/i)).toBeInTheDocument()
  })

  it("renders the RestaurantHeader and content when data is available", () => {
    mockUseRestaurant.mockReturnValue(mockRestaurantData)
    renderWithRouter(<RestaurantDetails />)

    expect(screen.getByTestId("mock-restaurant-header")).toBeInTheDocument()
    expect(
      screen.getByText(/The best food this side of the Mississippi/i),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Description for Test Restaurant/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /Order from Test Restaurant/i }),
    ).toBeInTheDocument()
  })
})
