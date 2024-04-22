import { renderHook, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { useCities, useStates } from "./hooks"

describe("useCities Hook", () => {
  it("should return cities from Wisconsin when state is WI", () => {
    const { result } = renderHook(() => useCities("WI"))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].name).toBe("Madison")
  })

  it("should return cities from Illinois when state is IL", () => {
    const { result } = renderHook(() => useCities("IL"))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].name).toBe("Springfield")
  })

  it("should return no cities for an unknown state", () => {
    const { result } = renderHook(() => useCities("CA"))
    expect(result.current).toHaveLength(0)
  })
})

describe("useStates Hook", () => {
  beforeEach(async () => {
    // Mocking the fetch function
    global.fetch = vi.fn()
  })

  it("should set the states data on successful fetch", async () => {
    const mockStates = [{ name: "State1" }, { name: "State2" }]
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: mockStates }),
    })

    const { result } = renderHook(() => useStates())

    await waitFor(() => {
      expect(result.current.isPending).toBe(false)
      expect(result.current.data).toEqual(mockStates)
      expect(result.current.error).toBeNull()
    })
  })
})
