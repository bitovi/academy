import { renderHook, waitFor } from "@testing-library/react-native"

import * as api from "../api/api"

import { useFavorites } from "./hooks"

describe("Services/PMO/Favorite", () => {
  // Mock the apiRequest function
  let apiRequest: jest.SpyInstance<ReturnType<typeof api.apiRequest>>
  beforeEach(() => {
    jest.resetAllMocks()
    apiRequest = jest.spyOn(api, "apiRequest")
  })

  describe("useFavorites", () => {
    const mockFavorites = [
      {
        userId: "user-id",
        restaurantId: "WKQjvzup7QWSFXvH",
        favorite: false,
        datetimeUpdated: "2024-04-03T14:12:16.314Z",
        _id: "UslYVUxnBuBwqn0s",
      },
      {
        userId: "user-id",
        restaurantId: "7iiKc0akJPYzaMyw",
        favorite: true,
        datetimeUpdated: "2024-04-02T20:16:18.746Z",
        _id: "dmTvyAYw3o0xjAIk",
      },
    ]

    it("returns favorites from the server", async () => {
      apiRequest.mockResolvedValue({
        data: { data: mockFavorites },
        error: undefined,
      })

      const { result } = renderHook(() => useFavorites("user-id"))

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })

      expect(result.current.data).toEqual(mockFavorites)
      expect(result.current.error).toBeUndefined()
    })
  })
})
