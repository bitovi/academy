import { renderHook, waitFor } from "@testing-library/react-native"

import * as api from "../api/api"

import { useStates, useCities } from "./hooks"

describe("Restaurant Hooks", () => {
  // Mock the apiRequest function
  let apiRequest: jest.SpyInstance<ReturnType<typeof api.apiRequest>>
  beforeEach(() => {
    jest.resetAllMocks()
    apiRequest = jest.spyOn(api, "apiRequest")
  })

  describe("useCities hook", () => {
    it("should return cities data successfully", async () => {
      const mockCities = [
        { id: 1, name: "City1" },
        { id: 2, name: "City2" },
      ]
      apiRequest.mockResolvedValue({ data: { data: mockCities }, error: undefined })

      const { result } = renderHook(() => useCities("test-state"))

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })
      expect(result.current.data).toEqual(mockCities)
      expect(result.current.error).toBeNull()
    })

    it("should handle error when fetching cities data", async () => {
      const mockError = new Error("Error fetching cities")
      apiRequest.mockResolvedValue({ data: undefined, error: mockError })

      const { result } = renderHook(() => useCities("test-state"))

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })
      expect(result.current.data).toBeNull()
      expect(result.current.error).toEqual(mockError)
    })
  })

  describe("useStates hook", () => {
    it("should return states data successfully", async () => {
      const mockStates = [
        { id: 1, name: "State1" },
        { id: 2, name: "State2" },
      ]
      apiRequest.mockResolvedValue({ data: { data: mockStates }, error: undefined })

      const { result } = renderHook(() => useStates())

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })
      expect(result.current.data).toEqual(mockStates)
      expect(result.current.error).toBeNull()
    })

    it("should handle error when fetching states data", async () => {
      const mockError = new Error("Error fetching states")
      apiRequest.mockResolvedValue({ data: undefined, error: mockError })

      const { result } = renderHook(() => useStates())

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })
      expect(result.current.data).toBeNull()
      expect(result.current.error).toEqual(mockError)
    })
  })
})
