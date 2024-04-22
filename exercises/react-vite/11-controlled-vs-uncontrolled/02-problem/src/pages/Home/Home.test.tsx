import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { beforeEach, describe, expect, it } from "vitest"

import Home from "./Home"

describe("Home component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    )
  })

  it("renders the image with correct attributes", () => {
    const image = screen.getByAltText(/Restaurant table with glasses./i)
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute("width", "250")
    expect(image).toHaveAttribute("height", "380")
  })

  it("renders the title", () => {
    const titleElement = screen.getByText(
      /Ordering food has never been easier/i,
    )
    expect(titleElement).toBeInTheDocument()
  })

  it("renders the description paragraph", () => {
    const description = screen.getByText(/We make it easier/i)
    expect(description).toBeInTheDocument()
  })

  it("renders the link to the restaurants page", () => {
    const link = screen.getByRole("link", { name: /choose a restaurant/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/restaurants")
  })
})
