import { renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import type { ArgumentsType, Mock } from "vitest"
import { apiRequest } from "../api"
import { useCities, useStates } from "./hooks"

// Mock the apiRequest function
vi.mock("../api", () => ({
  apiRequest: vi.fn(),
}))

const mockApiRequest = apiRequest as Mock<ArgumentsType<typeof apiRequest>, ReturnType<typeof apiRequest>>;

describe("Hooks", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe("useCities hook", () => {
    it("should return cities data successfully", async () => {
      const mockCities = [
        { id: 1, name: "City1" },
        { id: 2, name: "City2" },
      ]
      mockApiRequest.mockResolvedValue({ data: mockCities , error: undefined })

      const { result } = renderHook(() => useCities("test-state"))

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
        expect(result.current.data).toEqual(mockCities)
        expect(result.current.error).toBeUndefined()
      })
    })

    it("should handle error when fetching cities data", async () => {
      const mockError = new Error("Error fetching cities")
      mockApiRequest.mockResolvedValue({ data: undefined, error: mockError })

      const { result } = renderHook(() => useCities("test-state"))

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
        expect(result.current.data).toBeUndefined()
        expect(result.current.error).toEqual(mockError)
      })
    })
  })

  describe("useStates hook", () => {
    it("should return states data successfully", async () => {
      const mockStates = [
        { id: 1, name: "State1" },
        { id: 2, name: "State2" },
      ]
      mockApiRequest.mockResolvedValue({ data: mockStates , error: undefined })

      const { result } = renderHook(() => useStates())

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
        expect(result.current.data).toEqual(mockStates)
        expect(result.current.error).toBeUndefined()
      })
    })

    it("should handle error when fetching states data", async () => {
      const mockError = new Error("Error fetching states")
      mockApiRequest.mockResolvedValue({ data: undefined, error: mockError })

      const { result } = renderHook(() => useStates())

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
        expect(result.current.data).toBeUndefined()
        expect(result.current.error).toEqual(mockError)
      })
    })
  })
})
