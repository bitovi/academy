import { renderHook, waitFor } from "@testing-library/react-native"
import { useStates } from "./hooks"

const oldFetch = global.fetch
const mockFetch = jest.fn()
beforeAll(() => {
  global.fetch = mockFetch
})
afterAll(() => {
  global.fetch = oldFetch
})

describe("Restaurant Hooks", () => {
  describe("useStates hook", () => {
    it("should return states data successfully", async () => {
      const mockStates = [
        { id: 1, name: "State1" },
        { id: 2, name: "State2" },
      ]
      // Mock the fetch response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: "success", data: mockStates}),
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
