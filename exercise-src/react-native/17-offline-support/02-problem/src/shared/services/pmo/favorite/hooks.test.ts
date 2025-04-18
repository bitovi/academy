import * as api from "@shared/services/pmo/api"
import * as storage from "@shared/services/storage"
import { renderHook, waitFor } from "@testing-library/react-native"

import { useFavorite } from "./hooks"

describe("Services/PMO/Favorite", () => {
  // Mock the apiRequest function
  let apiRequest: jest.SpyInstance<ReturnType<typeof api.apiRequest>>
  let mockStorage: jest.SpyInstance<ReturnType<typeof storage.getData>>
  beforeEach(() => {
    jest.resetAllMocks()
    apiRequest = jest.spyOn(api, "apiRequest")
    mockStorage = jest.spyOn(storage, "getData")
  })

  describe("useFavorite", () => {
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

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it("should initialize with the correct default values", async () => {
      apiRequest.mockResolvedValue({
        data: { data: mockFavorites },
        error: undefined,
      })
      mockStorage.mockResolvedValue({
        lastSynced: Date.now(),
        favorites: mockFavorites,
      })

      const { result } = renderHook(() =>
        useFavorite("user-id", "7iiKc0akJPYzaMyw"),
      )

      await waitFor(() => {
        expect(result.current.isFavorite).toBe(true)
      })

      expect(result.current.error).toBeUndefined()
      expect(result.current.isPending).toBe(false)
    })

    it("should set isFavorite to false if the restaurant is not a favorite", async () => {
      apiRequest.mockResolvedValue({
        data: { data: mockFavorites },
        error: undefined,
      })
      mockStorage.mockResolvedValue({
        lastSynced: Date.now(),
        favorites: mockFavorites,
      })

      const { result } = renderHook(() =>
        useFavorite("user-id", "WKQjvzup7QWSFXvH"),
      )

      await waitFor(() => {
        expect(result.current.isFavorite).toBe(false)
      })
    })
  })
})
