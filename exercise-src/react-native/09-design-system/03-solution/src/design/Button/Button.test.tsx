import { fireEvent, render, screen } from "@testing-library/react-native"

import ThemeProvider from "../theme/ThemeProvider"

import Button from "./Button"

describe("Button component", () => {
  it("renders title", () => {
    const handleChangeMock = jest.fn()

    render(
      <ThemeProvider>
        <Button onPress={handleChangeMock}>
          Hello!
        </Button>
      </ThemeProvider>
    )
    
    expect(screen.getByText(/Hello/)).toBeOnTheScreen()
    fireEvent.press(screen.getByText(/Hello/i))
    expect(handleChangeMock).toHaveBeenCalled()
  })
})
