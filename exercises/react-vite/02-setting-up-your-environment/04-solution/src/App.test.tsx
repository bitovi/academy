import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import App from "./App"

describe("App component", () => {
  it("renders correctly and contains the expected text", () => {
    render(<App />)
    expect(
      screen.getByText("Place My Order App: Coming Soon!"),
    ).toBeInTheDocument()
  })
})
