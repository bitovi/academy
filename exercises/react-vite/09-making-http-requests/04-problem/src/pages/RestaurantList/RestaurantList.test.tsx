import "@testing-library/jest-dom"
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import RestaurantList from "./RestaurantList"

import { useCities, useStates } from "../../services/pmo/restaurant"

// Mock the hooks used in the component
vi.mock("../../services/pmo/restaurant", () => ({
  useCities: vi.fn(() => {
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

describe("RestaurantList component", () => {
  it("renders the Restaurants header", async () => {
    render(<RestaurantList />)
    await act(() => {})
    expect(screen.getByText(/Restaurants/i)).toBeInTheDocument()
  })

  it("renders state and city dropdowns", async () => {
    render(<RestaurantList />)
    await act(() => {})
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument()
  })

  it("renders correctly with initial states", async () => {
    useStates.mockReturnValue({ data: undefined, isPending: true, error: undefined })
    useCities.mockReturnValue({ data: undefined, isPending: false, error: undefined })

    render(<RestaurantList />)
    await act(() => {})

    expect(screen.getByText(/Restaurants/)).toBeInTheDocument()
    expect(screen.getByText(/Loading states…/)).toBeInTheDocument()
  })

  it("displays error messages correctly", async () => {
    useStates.mockReturnValue({
      data: undefined,
      isPending: false,
      error: { message: "Error loading states" },
    })
    useCities.mockReturnValue({
      data: undefined,
      isPending: false,
      error: { message: "Error loading cities" },
    })

    render(<RestaurantList />)
    await act(() => {})

    expect(screen.getByText(/Error loading states/)).toBeInTheDocument()
  })

  it("renders restaurants correctly", async () => {
    useStates.mockReturnValue({
      data: [{ short: "CA", name: "California" }],
      isPending: false,
      error: undefined,
    })
    useCities.mockReturnValue({
      data: [{ name: "Los Angeles" }],
      isPending: false,
      error: undefined,
    })

    render(<RestaurantList />)
    await act(() => {})

    await userEvent.selectOptions(screen.getByLabelText(/State/), "CA")
    await userEvent.selectOptions(screen.getByLabelText(/City/), "Los Angeles")

    expect(screen.getByText("Cheese Curd City")).toBeInTheDocument()
  })
})
