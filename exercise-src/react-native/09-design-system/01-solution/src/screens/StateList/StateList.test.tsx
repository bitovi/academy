import { render, screen } from "@testing-library/react-native"
import StateList from "./StateList"
import ThemeProvider from "../../design/theme/ThemeProvider";

describe("StateList", () => {
  it("renders states", async () => {
    render(
      <ThemeProvider>
        <StateList />
      </ThemeProvider>
    )
    expect(screen.getByText(/Illinois/i)).toBeOnTheScreen()
    expect(screen.getByText(/Wisconsin/i)).toBeOnTheScreen()
  })
})
