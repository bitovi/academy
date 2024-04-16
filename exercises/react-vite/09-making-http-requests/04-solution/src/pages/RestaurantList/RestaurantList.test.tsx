import "@testing-library/jest-dom"
import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import RestaurantList from "./RestaurantList"

// Mock the hooks used in the component
vi.mock("../../services/restaurant/hooks", () => ({
  useCities: vi.fn(() => {
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

import { useCities, useStates } from "../../services/restaurant/hooks"

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
    useStates.mockReturnValue({ data: null, isPending: true, error: null })
    useCities.mockReturnValue({ data: null, isPending: false, error: null })

    render(<RestaurantList />)
    await act(() => {})

    expect(screen.getByText(/Restaurants/)).toBeInTheDocument()
    expect(screen.getByText(/Loading states…/)).toBeInTheDocument()
  })

  it("displays error messages correctly", async () => {
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

    render(<RestaurantList />)
    await act(() => {})

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

    render(<RestaurantList />)
    await act(() => {})

    await userEvent.selectOptions(screen.getByLabelText(/State/), "CA")
    await userEvent.selectOptions(screen.getByLabelText(/City/), "Los Angeles")

    expect(screen.getByText("Cheese Curd City")).toBeInTheDocument()
  })
})
