import { render, screen } from "@testing-library/react-native"

import { restaurantWithAddress, restaurantWithoutAddress } from "./mocks"
import RestaurantHeader from "./RestaurantHeader"

describe("Components/RestaurantHeader", () => {
  it("renders", () => {
    render(<RestaurantHeader restaurant={restaurantWithAddress} />)
    expect(screen.getByText(/\$\$\$/i)).toBeOnTheScreen()
    expect(screen.getByText("$$$", { exact: false })).toBeOnTheScreen()
    expect(
      screen.getByText("Hours: M-F 10am-11pm", { exact: false }),
    ).toBeOnTheScreen()

    expect(screen.getByText(/Test Restaurant/)).toBeOnTheScreen()
    expect(screen.getByText(/\$\$\$/i)).toBeOnTheScreen()
    expect(screen.getByText("$$$", { exact: false })).toBeOnTheScreen()
    expect(
      screen.getByText("Hours: M-F 10am-11pm", { exact: false }),
    ).toBeOnTheScreen()
  })

  it("renders without an address", () => {
    render(<RestaurantHeader restaurant={restaurantWithoutAddress} />)
    expect(
      screen.getByText(/Test Restaurant/i, { exact: false }),
    ).toBeOnTheScreen()
  })

  it("renders the address", () => {
    render(<RestaurantHeader restaurant={restaurantWithAddress} />)

    expect(screen.getByText(/123 Test St/i, { exact: false })).toBeOnTheScreen()
    expect(
      screen.getByText(restaurantWithAddress.address.street, { exact: false }),
    ).toBeOnTheScreen()
    expect(
      screen.getByText(
        `${restaurantWithAddress.address.city}, ${restaurantWithAddress.address.state} ${restaurantWithAddress.address.zip}`,
        { exact: false },
      ),
    ).toBeOnTheScreen()
  })
})
