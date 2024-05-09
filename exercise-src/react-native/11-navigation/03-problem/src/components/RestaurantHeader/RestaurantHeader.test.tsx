import { render, screen } from "@testing-library/react-native"
import RestaurantHeader from "./RestaurantHeader"
import { restaurantWithAddress, restaurantWithoutAddress } from "./mocks"

describe("RestaurantHeader component", () => {
  it("renders the restaurant name", () => {
    render(<RestaurantHeader restaurant={restaurantWithAddress} />)
    expect(screen.getByText(/Test Restaurant/)).toBeOnTheScreen()
  })

  it("renders the restaurant address when provided", () => {
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

  it("does not render an address when not provided", () => {
    render(<RestaurantHeader restaurant={restaurantWithoutAddress} />)
    expect(
      screen.queryByText(restaurantWithAddress.address.street),
    ).not.toBeOnTheScreen()
  })

  it("renders static details like price and hours", () => {
    render(<RestaurantHeader restaurant={restaurantWithAddress} />)

    expect(screen.getByText(/\$\$\$/i)).toBeOnTheScreen()
    expect(screen.getByText("$$$", { exact: false })).toBeOnTheScreen()
    expect(
      screen.getByText("Hours: M-F 10am-11pm", { exact: false }),
    ).toBeOnTheScreen()
  })

  it('renders the "Open Now" text', () => {
    render(<RestaurantHeader restaurant={restaurantWithAddress} />)
    expect(screen.getByText("Open Now", { exact: false })).toBeOnTheScreen()
  })
})
