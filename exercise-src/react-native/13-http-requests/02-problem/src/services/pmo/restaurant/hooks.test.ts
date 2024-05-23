import { renderHook, waitFor } from "@testing-library/react-native"

import { useStates, useCities } from "./hooks"

const oldFetch = global.fetch
const mockFetch = jest.fn()
beforeAll(() => {
  global.fetch = mockFetch
})
afterAll(() => {
  global.fetch = oldFetch
})

describe("Services/PMO/Restaurant/useStates", () => {
  it("returns states", async () => {
    const mockStates = [
      { id: 1, name: "State1" },
      { id: 2, name: "State2" },
    ]
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: "success", data: mockStates }),
      statusText: "OK",
      status: 200,
    })

    const { result } = renderHook(() => useStates())

    await waitFor(() => {
      expect(result.current.isPending).toBeFalsy()
    })
    expect(result.current.data).toEqual(mockStates)
    expect(result.current.error).toBeUndefined()
  })
})

describe("Services/PMO/Restaurant/useCities", () => {
  it("returns cities", async () => {
    const mockCities = [
      { id: 1, name: "City1" },
      { id: 2, name: "City2" },
    ]
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ message: "success", data: mockCities }),
      statusText: "OK",
      status: 200,
    })

    const { result } = renderHook(() => useCities({ state: "test-state" }))

    await waitFor(() => {
      expect(result.current.isPending).toBeFalsy()
    })
    expect(result.current.data).toEqual(mockCities)
    expect(result.current.error).toBeUndefined()
  })
})
