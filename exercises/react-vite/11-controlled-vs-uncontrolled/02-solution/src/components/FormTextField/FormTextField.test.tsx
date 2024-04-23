import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"
import FormTextField from "./FormTextField"

describe("FormTextField component", () => {
  const mockOnChange = vi.fn()

  it("renders with correct label and type", () => {
    render(
      <FormTextField
        label="Test Label"
        type="text"
        value=""
        onChange={mockOnChange}
      />,
    )

    expect(screen.getByLabelText(/Test Label:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Test Label:/i)).toHaveAttribute(
      "type",
      "text",
    )
  })

  it("renders with the correct value", () => {
    render(
      <FormTextField
        label="Test Label"
        type="text"
        value="Test Value"
        onChange={mockOnChange}
      />,
    )

    expect(screen.getByLabelText(/Test Label:/i)).toHaveValue("Test Value")
  })

  it("calls onChange prop when input changes", async () => {
    render(
      <FormTextField
        label="Test Label"
        type="text"
        value=""
        onChange={mockOnChange}
      />,
    )

    await userEvent.type(screen.getByLabelText(/Test Label:/i), "New")

    expect(mockOnChange).toHaveBeenCalledTimes(3)
    expect(mockOnChange).toHaveBeenCalledWith("N")
    expect(mockOnChange).toHaveBeenCalledWith("e")
    expect(mockOnChange).toHaveBeenCalledWith("w")
  })

  it("respects different input types", () => {
    render(
      <FormTextField
        label="Email"
        type="email"
        value=""
        onChange={mockOnChange}
      />,
    )

    expect(screen.getByLabelText(/Email:/i)).toHaveAttribute("type", "email")
  })
})
