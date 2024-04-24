import "@testing-library/jest-dom"
import { act, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import * as restaurantHooks from "../../services/restaurant/hooks"
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

describe("RestaurantList component", () => {
  beforeEach(async () => {
    vi.spyOn(restaurantHooks, "useCities").mockReturnValue([
      { name: "Green Bay" },
      { name: "Madison" },
    ])
    render(<RestaurantList />)
    await act(() => {})
  })

  it("renders the Restaurants header", () => {
    expect(screen.getByText(/Restaurants/i)).toBeInTheDocument()
  })

  it("renders the restaurant images", () => {
    const images = screen.getAllByRole("img")
    expect(images[0]).toHaveAttribute(
      "src",
      expect.stringContaining("2-thumbnail.jpg"),
    )
    expect(images[0]).toHaveAttribute("width", "100")
    expect(images[0]).toHaveAttribute("height", "100")
    expect(images[1]).toHaveAttribute(
      "src",
      expect.stringContaining("4-thumbnail.jpg"),
    )
    expect(images[1]).toHaveAttribute("width", "100")
    expect(images[1]).toHaveAttribute("height", "100")
  })

  it("renders the addresses", () => {
    const addressDivs = screen.getAllByText(/Washburne Ave|Kinzie Street/i)
    expect(addressDivs[0]).toHaveTextContent("2451 W Washburne Ave")
    expect(addressDivs[0]).toHaveTextContent("Green Bay, WI 53295")
    expect(addressDivs[1]).toHaveTextContent("230 W Kinzie Street")
    expect(addressDivs[1]).toHaveTextContent("Green Bay, WI 53205")
  })

  it("renders the hours and price information for each restaurant", () => {
    const hoursPriceDivs = screen.getAllByText(/\$\$\$/i)
    hoursPriceDivs.forEach((div) => {
      expect(div).toHaveTextContent("$$$")
      expect(div).toHaveTextContent("Hours: M-F 10am-11pm")
    })
  })

  it("indicates if the restaurant is open now for each restaurant", () => {
    const openNowTags = screen.getAllByText("Open Now")
    expect(openNowTags.length).toBeGreaterThan(0)
  })

  it("renders the details buttons with correct links for each restaurant", () => {
    const detailsButtons = screen.getAllByRole("link")
    expect(detailsButtons[0]).toHaveAttribute(
      "href",
      "/restaurants/cheese-curd-city",
    )
    expect(detailsButtons[1]).toHaveAttribute(
      "href",
      "/restaurants/poutine-palace",
    )
    detailsButtons.forEach((button) => {
      expect(button).toHaveTextContent("Details")
    })
  })

  it("renders ListItem components for each restaurant", () => {
    const restaurantNames = screen.getAllByText(
      /Cheese Curd City|Poutine Palace/,
    )
    expect(restaurantNames.length).toBe(2)
  })
})
