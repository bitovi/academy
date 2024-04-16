import type { ReactNode } from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import App from "./App"

// Wrap App with MemoryRouter to mock routing
const renderWithRouter = (ui: ReactNode, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route)
  return render(ui, { wrapper: MemoryRouter })
}

describe("App component", () => {
  it("renders without crashing", () => {
    renderWithRouter(<App />)
    expect(screen.getByText(/place-my-order.com/i)).toBeInTheDocument()
  })

  it("contains the navigation bar with correct links", () => {
    renderWithRouter(<App />)
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Restaurants")).toBeInTheDocument()

    const homeLink = screen.getByText("Home").closest("a")
    expect(homeLink).toHaveAttribute("href", "/")

    const restaurantsLink = screen.getByText("Restaurants").closest("a")
    expect(restaurantsLink).toHaveAttribute("href", "/restaurants")
  })
})
