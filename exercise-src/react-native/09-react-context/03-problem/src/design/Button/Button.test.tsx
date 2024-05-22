import { userEvent, render, screen } from "@testing-library/react-native"

import Button from "./Button"

describe("Design/Button", () => {
  it("renders", async () => {
    const user = userEvent.setup({ delay: null })
    const handleChangeMock = jest.fn()

    render(<Button onPress={handleChangeMock}>Hello!</Button>)
    const helloButton = screen.getByText(/Hello/)

    expect(helloButton).toBeOnTheScreen()
    await user.press(helloButton)
    expect(handleChangeMock).toHaveBeenCalled()
  })
})
