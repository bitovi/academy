import "@testing-library/jest-dom"
import type { ReactNode } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it, vi } from "vitest"

import RestaurantList from "./RestaurantList"

import {
  useCities,
  useRestaurants,
  useStates,
} from "../../services/restaurant/hooks"

// Mock the hooks used in the component
vi.mock("../../services/restaurant/hooks", () => ({
  useCities: vi.fn(() => {
    return {
      data: null,
      error: null,
      isPending: false,
    }
  }),
  useRestaurants: vi.fn(() => {
    return {
      data: null,
      error: null,
      isPending: false,
    }
  }),
  useStates: vi.fn(() => {
    return {
      data: null,
      error: null,
      isPending: false,
    }
  }),
}))

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
    useStates.mockReturnValue({ data: null, isPending: true, error: null })
    useCities.mockReturnValue({ data: null, isPending: false, error: null })
    useRestaurants.mockReturnValue({
      data: null,
      isPending: false,
      error: null,
    })

    render(<RestaurantList />)

    expect(screen.getByText(/Restaurants/)).toBeInTheDocument()
    expect(screen.getByText(/Loading states…/)).toBeInTheDocument()
  })

  it("displays error messages correctly", () => {
    useStates.mockReturnValue({
      data: null,
      isPending: false,
      error: { message: "Error loading states" },
    })
    useCities.mockReturnValue({
      data: null,
      isPending: false,
      error: { message: "Error loading cities" },
    })
    useRestaurants.mockReturnValue({
      data: null,
      isPending: false,
      error: { message: "Error loading restaurants" },
    })

    render(<RestaurantList />)

    expect(screen.getByText(/Error loading states/)).toBeInTheDocument()
  })

  it("renders restaurants correctly", async () => {
    useStates.mockReturnValue({
      data: [{ short: "CA", name: "California" }],
      isPending: false,
      error: null,
    })
    useCities.mockReturnValue({
      data: [{ name: "Los Angeles" }],
      isPending: false,
      error: null,
    })
    useRestaurants.mockReturnValue({
      data: [
        {
          _id: "1",
          slug: "test-restaurant",
          name: "Test Restaurant",
          address: "123 Test St",
          images: { thumbnail: "test.jpg" },
        },
      ],
      isPending: false,
      error: null,
    })

    renderWithRouter(<RestaurantList />)

    await userEvent.selectOptions(screen.getByLabelText(/State/), "CA")
    await userEvent.selectOptions(screen.getByLabelText(/City/), "Los Angeles")

    expect(screen.getByText("Test Restaurant")).toBeInTheDocument()
  })
})
