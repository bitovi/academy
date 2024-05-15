import { NavigationContainer } from "@react-navigation/native"
import { fireEvent, render, screen } from "@testing-library/react-native"

import Settings from "./Settings"

const mockSetMode = jest.fn()

jest.mock("../../design/theme", () => ({
  ...jest.requireActual("../../design/theme"),
  useThemeMode: () => ({
    mode: "light",
    setMode: mockSetMode,
  }),
}))

describe("Screens/Settings", () => {
  it("renders", async () => {
    render(
      <NavigationContainer>
        <Settings />
      </NavigationContainer>,
    )
    expect(screen.getByText(/welcome/i)).toBeOnTheScreen()
  })

  it("switches to dark mode", () => {
    render(
      <NavigationContainer>
        <Settings />
      </NavigationContainer>,
    )

    const switchElement = screen.getByRole("switch")
    expect(switchElement.props.value).toBe(false)

    fireEvent(switchElement, "onChange", {
      nativeEvent: { value: true },
    })
    expect(mockSetMode).toHaveBeenCalledWith("dark")
  })
})
