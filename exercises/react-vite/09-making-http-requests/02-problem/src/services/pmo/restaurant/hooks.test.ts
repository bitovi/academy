import { renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, Mock, vi } from "vitest"
import { useCities, useStates } from "./hooks"

describe("useCities Hook", () => {
  beforeEach(() => {
    // @ts-ignore `global` exists in node environments like our test runner.
    global.fetch = vi.fn()
  })

  it("initial state of useCities", async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({ data: null }),
    })

    const { result } = renderHook(() => useCities("someState"))
    await waitFor(() => {
      expect(result.current.isPending).toBe(true)
      expect(result.current.data).toBeUndefined()
      expect(result.current.error).toBeUndefined()
    })
  })

  it("fetches cities successfully", async () => {
    const mockCities = [
      { id: 1, name: "City1" },
      { id: 2, name: "City2" },
    ]
    vi.mocked(fetch).mockResolvedValueOnce({
      json: async () => ({ data: mockCities }),
    })

    const { result } = renderHook(() => useCities("someState"))

    await waitFor(() => {
      expect(result.current.data).toEqual(mockCities)
      expect(result.current.isPending).toBe(false)
      expect(result.current.error).toBeUndefined()
    })
  })
})

describe("useStates Hook", () => {
  beforeEach(async () => {
    // Mocking the fetch function
    // @ts-ignore `global` exists in node environments like our test runner.
    global.fetch = vi.fn()
  })

  it("should set the states data on successful fetch", async () => {
    const mockStates = [{ name: "State1" }, { name: "State2" }]
    ;(fetch as Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ data: mockStates }),
    })

    const { result } = renderHook(() => useStates())

    await waitFor(() => {
      expect(result.current.isPending).toBe(false)
      expect(result.current.data).toEqual(mockStates)
      expect(result.current.error).toBeUndefined()
    })
  })
})
