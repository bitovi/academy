import { render, screen, userEvent } from "@testing-library/react-native"

import EmailInputField from "./EmailInputField"

it("renders the correct label and value", () => {
  render(<EmailInputField label="Email" value="test@example.com" />)
  const label = screen.getByText("Email:", { exact: false })
  expect(label).toBeOnTheScreen()

  // Validate the input value.
  const input = screen.getByDisplayValue("test@example.com")
  expect(input).toBeOnTheScreen()
})

it("updates when an email is entered", async () => {
  const user = userEvent.setup()

  render(<EmailInputField label="Email" value="" />)

  const input = screen.getByLabelText("Email:")
  expect(input).toBeOnTheScreen()
  expect(input).toHaveDisplayValue("")

  await user.type(input, "test@example.com")
  expect(input).toHaveDisplayValue("test@example.com")
})
