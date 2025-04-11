import "@testing-library/jest-dom"
import type { ReactNode } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"
import type { ArgumentsType, Mock } from "vitest"

import RestaurantList from "./RestaurantList"

import {
  useCities,
  useRestaurants,
  useStates,
} from "../../services/pmo/restaurant"

// Mock the hooks used in the component
vi.mock("../../services/pmo/restaurant", () => ({
  useCities: vi.fn(() => {
    return {
      data: undefined,
      error: undefined,
      isPending: false,
    }
  }),
  useRestaurants: vi.fn(() => {
    return {
      data: undefined,
      error: undefined,
      isPending: false,
    }
  }),
  useStates: vi.fn(() => {
    return {
      data: undefined,
      error: undefined,
      isPending: false,
    }
  }),
}))

const mockUseCities = useCities as Mock<ArgumentsType<typeof useCities>, ReturnType<typeof useCities>>
const mockUseStates = useStates as Mock<ArgumentsType<typeof useStates>, ReturnType<typeof useStates>>
const mockUseRestaurants = useRestaurants as Mock<ArgumentsType<typeof useRestaurants>, ReturnType<typeof useRestaurants>>

// Wrap component with MemoryRouter to mock routing
const renderWithRouter = (ui: ReactNode, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route)
  return render(ui, { wrapper: MemoryRouter })
}

describe("RestaurantList component", () => {
  it("renders the Restaurants header", () => {
    render(<RestaurantList />)
    expect(screen.getByText(/Restaurants/i)).toBeInTheDocument()
  })

  it("renders state and city dropdowns", () => {
    render(<RestaurantList />)
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument()
  })

  it("renders correctly with initial states", () => {
    mockUseStates.mockReturnValue({ data: undefined, isPending: true, error: undefined })
    mockUseCities.mockReturnValue({ data: undefined, isPending: false, error: undefined })
    mockUseRestaurants.mockReturnValue({
      data: undefined,
      isPending: false,
      error: undefined,
    })

    render(<RestaurantList />)

    expect(screen.getByText(/Restaurants/)).toBeInTheDocument()
    expect(screen.getByText(/Loading states…/)).toBeInTheDocument()
  })

  it("displays error messages correctly", () => {
    mockUseStates.mockReturnValue({
      data: undefined,
      isPending: false,
      error: { name: 'loading-error', message: "Error loading states" },
    })
    mockUseCities.mockReturnValue({
      data: undefined,
      isPending: false,
      error: { name: 'loading-error', message: "Error loading cities" },
    })
    mockUseRestaurants.mockReturnValue({
      data: undefined,
      isPending: false,
      error: { name: 'loading-error', message: "Error loading restaurants" },
    })

    render(<RestaurantList />)

    expect(screen.getByText(/Error loading states/)).toBeInTheDocument()
  })

  it("renders restaurants correctly", async () => {
    mockUseStates.mockReturnValue({
      data: [{ short: "CA", name: "California" }],
      isPending: false,
      error: undefined,
    })
    mockUseCities.mockReturnValue({
      data: [{ name: "Los Angeles", state: "CA" }],
      isPending: false,
      error: undefined,
    })
    mockUseRestaurants.mockReturnValue({
      data: [
        {
          _id: "1",
          slug: "test-restaurant",
          name: "Test Restaurant",
          address: { street: "123 Test St", city: "Anytown", "state": "USA", zip: "12345" },
          images: { thumbnail: "test.jpg", banner: "", owner: "" },
          menu: { dinner: [], lunch: [] }
        },
      ],
      isPending: false,
      error: undefined,
    })

    renderWithRouter(<RestaurantList />)

    await userEvent.selectOptions(screen.getByLabelText(/State/), "CA")
    await userEvent.selectOptions(screen.getByLabelText(/City/), "Los Angeles")

    expect(screen.getByText("Test Restaurant")).toBeInTheDocument()
  })
})
