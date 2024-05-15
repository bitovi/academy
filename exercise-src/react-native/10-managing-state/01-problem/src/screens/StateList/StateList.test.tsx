import { render, screen, fireEvent } from "@testing-library/react-native"

import StateList from "./StateList"

const mockSetMode = jest.fn()

jest.mock("../../design/theme", () => ({
  ...jest.requireActual("../../design/theme"),
  useThemeMode: () => ({
    mode: "light",
    setMode: mockSetMode,
  }),
}))

describe("Screens/StateList", () => {
  it("renders", async () => {
    render(<StateList />)
    expect(screen.getByText(/Illinois/i)).toBeOnTheScreen()
    expect(screen.getByText(/Wisconsin/i)).toBeOnTheScreen()
  })

  it("switches to dark mode", () => {
    render(<StateList />)

    const switchElement = screen.getByRole("switch")
    expect(switchElement.props.value).toBe(false)

    fireEvent(switchElement, "onChange", { nativeEvent: { value: true } })
    expect(mockSetMode).toHaveBeenCalledWith("dark")
  })
})
