import { userEvent, render, screen } from "@testing-library/react-native"

import Button from "./Button"

beforeEach(() => {
  jest.resetAllMocks()
  jest.useRealTimers()
})
describe("Design/Button", () => {
  it("renders", async () => {
    const user = userEvent.setup()
    const handleChangeMock = jest.fn()

    render(<Button onPress={handleChangeMock}>Hello!</Button>)
    const helloButton = screen.getByText(/Hello/)

    expect(helloButton).toBeOnTheScreen()
    await user.press(helloButton)
    expect(handleChangeMock).toHaveBeenCalled()
  })
})
