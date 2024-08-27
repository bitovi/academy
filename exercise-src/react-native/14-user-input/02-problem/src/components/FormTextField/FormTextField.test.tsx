import { render, screen, userEvent } from "@testing-library/react-native"

import FormTextField from "./FormTextField"

beforeEach(() => {
  jest.resetAllMocks()
  jest.useFakeTimers()
})

describe("Components/FormTextField", () => {
  it("renders and handles input change", async () => {
    const handleChangeMock = jest.fn()
    render(
      <FormTextField
        label="Hello!"
        onChange={handleChangeMock}
        value="response"
      />,
    )

    const user = userEvent.setup()
    expect(screen.getByText(/Hello/)).toBeTruthy()

    await user.type(screen.getByLabelText(/Hello/i), "test")

    expect(handleChangeMock).toHaveBeenCalledTimes(4)
    expect(handleChangeMock).toHaveBeenNthCalledWith(1, "responset")
    expect(handleChangeMock).toHaveBeenNthCalledWith(2, "responsee")
    expect(handleChangeMock).toHaveBeenNthCalledWith(3, "responses")
    expect(handleChangeMock).toHaveBeenNthCalledWith(4, "responset")
  })
})
