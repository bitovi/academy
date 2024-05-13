import { fireEvent, render, screen } from "@testing-library/react-native"
import FormTextField from "./FormTextField"

describe("FormTextField component", () => {
  it("renders label", () => {
    const handleChangeMock = jest.fn()
    render(
      <FormTextField
        label="Hello!"
        value="response"
        onChange={handleChangeMock}
      ></FormTextField>,
    )
    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
    fireEvent.changeText(screen.getByLabelText(/Hello/i), "test")
    expect(handleChangeMock).toHaveBeenCalledWith("test")
  })
})
