import { NavigationContainer } from "@react-navigation/native"
import { fireEvent, render, screen } from "@testing-library/react-native"

import AuthProvider from "../../services/auth/AuthProvider"

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
      <AuthProvider>
        <NavigationContainer>
          <Settings />
        </NavigationContainer>
      </AuthProvider>,
    )
    expect(screen.getByText(/Mock Sign in with Google/i)).toBeOnTheScreen()
  })

  it("switches to dark mode", () => {
    render(
      <AuthProvider>
        <NavigationContainer>
          <Settings />
        </NavigationContainer>
      </AuthProvider>,
    )

    const switchElement = screen.getByRole("switch")
    expect(switchElement.props.value).toBe(false)

    fireEvent(switchElement, "onValueChange", true)
    expect(mockSetMode).toHaveBeenCalledWith("dark")
  })
})
