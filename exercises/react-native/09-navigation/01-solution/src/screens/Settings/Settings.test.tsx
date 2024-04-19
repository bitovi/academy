import { render, screen } from "@testing-library/react-native"
import { NavigationContainer } from "@react-navigation/native"

import Settings from "./Settings"

describe("Settings component", () => {
  it("renders Settings Page", async () => {
    render(
      <NavigationContainer>
        <Settings />
      </NavigationContainer>,
    )
    expect(screen.getByText(/welcome/i)).toBeOnTheScreen()
  })
})
