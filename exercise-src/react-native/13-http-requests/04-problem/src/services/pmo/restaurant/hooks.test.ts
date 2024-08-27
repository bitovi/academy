import { renderHook, waitFor } from "@testing-library/react-native"

import * as api from "../api/api"

import { useStates, useCities, useRestaurants, useRestaurant } from "./hooks"

// Mock the apiRequest function
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
      data: { data: mockStates },
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
      data: { data: mockCities },
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

describe("Services/PMO/Restaurant/useRestaurants", () => {
  it("returns restaurants", async () => {
    const mockRestaurants = [
      { id: 1, name: "Restaurant1" },
      { id: 2, name: "Restaurant2" },
    ]
    apiRequest.mockResolvedValue({
      data: { data: mockRestaurants },
      error: undefined,
    })

    const { result } = renderHook(() =>
      useRestaurants({ state: "test-state", city: "test-city" }),
    )

    await waitFor(() => {
      expect(result.current.isPending).toBeFalsy()
    })
    expect(result.current.data).toEqual(mockRestaurants)
    expect(result.current.error).toBeUndefined()
  })

  it("handles errors", async () => {
    const mockError = new Error("Error fetching restaurants")
    apiRequest.mockResolvedValue({ data: undefined, error: mockError })

    const { result } = renderHook(() =>
      useRestaurants({ state: "test-state", city: "test-city" }),
    )

    await waitFor(() => {
      expect(result.current.isPending).toBeFalsy()
    })
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toEqual(mockError)
  })
})

describe("Services/PMO/Restaurant/useRestaurant", () => {
  it("returns a restaurant", async () => {
    const mockRestaurant = { id: 1, name: "Restaurant1" }
    apiRequest.mockResolvedValue({
      data: { data: mockRestaurant },
      error: undefined,
    })

    const { result } = renderHook(() => useRestaurant({ slug: "test-slug" }))

    await waitFor(() => {
      expect(result.current.isPending).toBeFalsy()
    })
    expect(result.current.data).toEqual(mockRestaurant)
    expect(result.current.error).toBeUndefined()
  })

  it("handles errors", async () => {
    const mockError = new Error("Error fetching restaurant")
    apiRequest.mockResolvedValue({ data: undefined, error: mockError })

    const { result } = renderHook(() => useRestaurant({ slug: "test-slug" }))

    await waitFor(() => {
      expect(result.current.isPending).toBeFalsy()
    })

    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toEqual(mockError)
  })
})
