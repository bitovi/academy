import { render, screen, fireEvent } from "@testing-library/react-native"
import { SwitchChangeEvent } from "react-native"

import { useThemeMode } from "../../design/theme"

import StateList from "./StateList"

const mockSetMode = jest.fn()

jest.mock("../../design/theme", () => ({
  ...jest.requireActual("../../design/theme"),
  useThemeMode: () => ({
    mode: "light",
    setMode: mockSetMode,
  }),
}))

describe("StateList", () => {
  it("renders states", async () => {
    render(<StateList />)
    expect(screen.getByText(/Illinois/i)).toBeOnTheScreen()
    expect(screen.getByText(/Wisconsin/i)).toBeOnTheScreen()
  })
  it("should switch to dark mode", () => {
    render(<StateList />)
    const switchElement = screen.getByRole("switch")
    expect(switchElement.props.value).toBe(false)
    fireEvent(switchElement, "onChange", {
      nativeEvent: { value: true },
    } as SwitchChangeEvent)
    expect(mockSetMode).toHaveBeenCalledWith("dark")
  })
})
