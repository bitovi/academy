import { NavigationContainer } from "@react-navigation/native"
import AuthProvider from "@shared/services/auth/AuthProvider"
import { fireEvent, render, screen } from "@testing-library/react-native"

import Settings from "./Settings"

const mockSetMode = jest.fn()

jest.mock("@shared/design/theme", () => ({
  ...jest.requireActual("@shared/design/theme"),
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
    expect(screen.getByText(/Loading…/i)).not.toBeNull()
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

  it("displays the correct connection status", () => {
    render(
      <AuthProvider>
        <NavigationContainer>
          <Settings />
        </NavigationContainer>
      </AuthProvider>,
    )

    expect(screen.getByText(/Connection status: Online/i)).not.toBeNull()
  })
})
