import { renderHook, waitFor } from "@testing-library/react-native"

import * as api from "@shared/services/pmo/api"

import { useStates, useCities } from "./hooks"

let apiRequest: jest.SpyInstance<ReturnType<typeof api.apiRequest>>
beforeEach(() => {
  jest.resetAllMocks()
  apiRequest = jest.spyOn(api, "apiRequest")
})

describe("Services/PMO/Restaurant/useStates", () => {
  it("returns states", async () => {
    const mockStates = [
      { id: 1, name: "State1" },
      { id: 2, name: "State2" },
    ]
    apiRequest.mockResolvedValue({
      data: mockStates,
      error: undefined,
    })

    const { result } = renderHook(() => useStates())

    await waitFor(() => {
      expect(result.current.isPending).toBeFalsy()
    })
    expect(result.current.data).toEqual(mockStates)
    expect(result.current.error).toBeUndefined()
  })

  it("handles errors", async () => {
    const mockError = new Error("Error fetching states")
    apiRequest.mockResolvedValue({ data: undefined, error: mockError })

    const { result } = renderHook(() => useStates())

    await waitFor(() => {
      expect(result.current.isPending).toBeFalsy()
    })
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toEqual(mockError)
  })
})

describe("Services/PMO/Restaurant/useCities", () => {
  it("returns cities", async () => {
    const mockCities = [
      { id: 1, name: "City1" },
      { id: 2, name: "City2" },
    ]
    apiRequest.mockResolvedValue({
      data: mockCities,
      error: undefined,
    })

    const { result } = renderHook(() => useCities({ state: "test-state" }))

    await waitFor(() => {
      expect(result.current.isPending).toBeFalsy()
    })
    expect(result.current.data).toEqual(mockCities)
    expect(result.current.error).toBeUndefined()
  })

  it("handles errors", async () => {
    const mockError = new Error("Error fetching cities")
    apiRequest.mockResolvedValue({ data: undefined, error: mockError })

    const { result } = renderHook(() => useCities({ state: "test-state" }))

    await waitFor(() => {
      expect(result.current.isPending).toBeFalsy()
    })
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toEqual(mockError)
  })
})
