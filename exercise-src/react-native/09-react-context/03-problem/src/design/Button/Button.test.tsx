import { userEvent, render, screen } from "@testing-library/react-native"

import Button from "./Button"

describe("Design/Button", () => {
  it("renders", async () => {
    jest.useFakeTimers()

    const user = userEvent.setup()
    const handleChangeMock = jest.fn()

    render(<Button onPress={handleChangeMock}>Hello</Button>)
    const helloButton = screen.getByText(/Hello/)

    expect(helloButton).toBeOnTheScreen()

    await user.press(helloButton)
    jest.advanceTimersByTime(10000)
    expect(handleChangeMock).toHaveBeenCalled()

    jest.useRealTimers()
  })
})
