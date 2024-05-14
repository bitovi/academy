import { NavigationContainer } from "@react-navigation/native"
import { render, screen } from "@testing-library/react-native"

import StateList from "./StateList"

describe("StateList", () => {
  it("renders states", async () => {
    render(
      <NavigationContainer>
        <StateList />
      </NavigationContainer>,
    )
    expect(screen.getByText(/Illinois/i)).toBeOnTheScreen()
    expect(screen.getByText(/Wisconsin/i)).toBeOnTheScreen()
  })
})
