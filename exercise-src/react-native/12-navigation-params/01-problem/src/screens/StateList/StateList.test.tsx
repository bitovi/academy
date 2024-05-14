import { NavigationContainer } from "@react-navigation/native"
import { render, screen } from "@testing-library/react-native"

import StateList from "./StateList"

const route = {
  key: "StateList",
  name: "StateList",
  params: undefined,
} as const

describe("StateList", () => {
  it("renders states", async () => {
    render(
      <NavigationContainer>
        {/* @ts-ignore */}
        <StateList route={route} />
      </NavigationContainer>,
    )
    expect(screen.getByText(/Illinois/i)).toBeOnTheScreen()
    expect(screen.getByText(/Wisconsin/i)).toBeOnTheScreen()
  })
})
