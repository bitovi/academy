import { render, screen, waitFor } from "@testing-library/react-native"

import App from "./App"

const oldFetch = global.fetch
const mockFetch = jest.fn()
beforeAll(() => {
  global.fetch = mockFetch
})
afterAll(() => {
  global.fetch = oldFetch
})

describe("App", () => {
  const mockStateResponse = {
    data: [
      { short: "MI", name: "Michigan" },
      { short: "WI", name: "Wisconsin" },
      { short: "IL", name: "Illinois" },
    ],
  }

  it("renders", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockStateResponse),
      statusText: "OK",
      status: 200,
    })

    render(<App />)

    await waitFor(() => {
      const placeMyOrderText = screen.getAllByText(/Place my order/i)
      expect(placeMyOrderText).toHaveLength(2)
    })
  })
})
