import { userEvent, render, screen } from "@testing-library/react-native"

import FormTextField from "./FormTextField"

beforeEach(() => {
  jest.resetAllMocks()
  jest.useFakeTimers()
})

describe("Components/FormTextField", () => {
  it("renders", () => {
    const handleChangeMock = jest.fn()
    render(
      <FormTextField
        label="Hello!"
        value="response"
        onChange={handleChangeMock}
      />,
    )
    const user = userEvent.setup()

    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
    await user.type(screen.getByLabelText(/Hello/i), "test")
    expect(handleChangeMock).toHaveBeenCalledWith("test")
  })
})
