import { renderHook, waitFor } from "@testing-library/react-native"
import * as api from "../api/api"
import { useFavorites } from "./hooks"
import * as storage from "../../storage/storage"

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

describe("Favorite Hook", () => {
  // Mock the apiRequest function
  let apiRequest: jest.SpyInstance<ReturnType<typeof api.apiRequest>>
  let mockStorage: jest.SpyInstance<ReturnType<typeof storage.getData>>
  beforeEach(() => {
    jest.resetAllMocks()
    apiRequest = jest.spyOn(api, "apiRequest")
    mockStorage = jest.spyOn(storage, "getData")
  })

  describe("useFavorites hook", () => {
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
    it("should return list of favorites from the server", async () => {
      apiRequest.mockResolvedValue({
        data: { data: mockFavorites },
        error: null,
      })

      const { result } = renderHook(() => useFavorites("user-id"))

      await waitFor(() => {
        expect(result.current.isPending).toBeFalsy()
      })

      expect(result.current.data).toEqual(mockFavorites)
      expect(result.current.error).toBeNull()
    })
    it("should return list of favorites from the local storage", async () => {
      const mockLocalFavorites = {
        lastSynced: "Date",
        favorites: mockFavorites,
      }
      apiRequest.mockResolvedValue({
        data: { data: mockFavorites },
        error: null,
      })
      mockStorage.mockResolvedValue(mockLocalFavorites)
      const { result } = renderHook(() => useFavorites("user-id"))
      await waitFor(() => {
        expect(result.current.localFavorites).toBeTruthy()
      })

      expect(result.current.localFavorites).toEqual(mockLocalFavorites)
    })
  })
})
