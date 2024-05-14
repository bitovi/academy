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

describe("Restaurant Hooks", () => {
  describe("useCities hook", () => {
    it("should return cities data successfully", async () => {
      const mockCities = [
        { id: 1, name: "City1" },
        { id: 2, name: "City2" },
      ]
      // Mock the fetch response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: "success", data: mockCities }),
        statusText: "OK",
        status: 200,
      })

      const { result } = renderHook(() => useCities("test-state"))

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })
      expect(result.current.data).toEqual(mockCities)
      expect(result.current.error).toBeNull()
    })
  })

  describe("useStates hook", () => {
    it("should return states data successfully", async () => {
      const mockStates = [
        { id: 1, name: "State1" },
        { id: 2, name: "State2" },
      ]
      // Mock the fetch response
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
      expect(result.current.error).toBeNull()
    })
  })
})
