import { fireEvent, render, screen } from "@testing-library/react-native"

import Button from "./Button"

describe("Design/Button", () => {
  it("renders", () => {
    const handleChangeMock = jest.fn()

    render(<Button onPress={handleChangeMock}>Hello!</Button>)

    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
    fireEvent.press(screen.getByText(/Hello/i))
    expect(handleChangeMock).toHaveBeenCalled()
  })
})
