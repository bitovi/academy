import { renderHook, waitFor } from "@testing-library/react-native"
import * as api from "../api/api"
import { useStates, useCities, useRestaurants } from "./hooks"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

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
      apiRequest.mockResolvedValue({ data: { data: mockCities }, error: null })

      const { result } = renderHook(() => useCities("test-state"))

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })
      expect(result.current.data).toEqual(mockCities)
      expect(result.current.error).toBeNull()
    })

    it("should handle error when fetching cities data", async () => {
      const mockError = new Error("Error fetching cities")
      apiRequest.mockResolvedValue({ data: null, error: mockError })

      const { result } = renderHook(() => useCities("test-state"))

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })
      expect(result.current.data).toBeNull()
      expect(result.current.error).toEqual(mockError)
    })
  })

  describe("useRestaurant hook", () => {
    it("should return restaurant data successfully", async () => {
      const mockRestaurant = { id: 1, name: "Restaurant1" }
      apiRequest.mockResolvedValue({
        data: { data: mockRestaurant },
        error: null,
      })

      const { result } = renderHook(() =>
        useRestaurants("test-state", "test-city"),
      )

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })
      expect(result.current.data).toEqual(mockRestaurant)
      expect(result.current.error).toBeNull()
    })

    it("should handle error when fetching restaurant data", async () => {
      const mockError = new Error("Error fetching restaurant")
      apiRequest.mockResolvedValue({ data: null, error: mockError })

      const { result } = renderHook(() =>
        useRestaurants("test-state", "test-city"),
      )

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })

      expect(result.current.data).toBeNull()
      expect(result.current.error).toEqual(mockError)
    })
  })

  describe("useRestaurants hook", () => {
    it("should return restaurants data successfully", async () => {
      const mockRestaurants = [
        { id: 1, name: "Restaurant1" },
        { id: 2, name: "Restaurant2" },
      ]
      apiRequest.mockResolvedValue({
        data: { data: mockRestaurants },
        error: null,
      })

      const { result } = renderHook(() =>
        useRestaurants("test-state", "test-city"),
      )

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })
      expect(result.current.data).toEqual(mockRestaurants)
      expect(result.current.error).toBeNull()
    })

    it("should handle error when fetching restaurants data", async () => {
      const mockError = new Error("Error fetching restaurants")
      apiRequest.mockResolvedValue({ data: null, error: mockError })

      const { result } = renderHook(() =>
        useRestaurants("test-state", "test-city"),
      )

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
      apiRequest.mockResolvedValue({ data: { data: mockStates }, error: null })

      const { result } = renderHook(() => useStates())

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })
      expect(result.current.data).toEqual(mockStates)
      expect(result.current.error).toBeNull()
    })

    it("should handle error when fetching states data", async () => {
      const mockError = new Error("Error fetching states")
      apiRequest.mockResolvedValue({ data: null, error: mockError })

      const { result } = renderHook(() => useStates())

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })
      expect(result.current.data).toBeNull()
      expect(result.current.error).toEqual(mockError)
    })
  })
})
