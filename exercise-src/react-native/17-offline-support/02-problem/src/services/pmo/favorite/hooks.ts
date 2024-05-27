import { useEffect, useState } from "react"

import { getData, storeData } from "../../storage"
import { apiRequest } from "../api"

import { Favorite, FavoriteResponse, StoredFavorites } from "./interfaces"

export const useFavorites = (
  userId?: string,
  restaurantId?: string,
): {
  error: Error | undefined
  isFavorite: boolean
  isPending: boolean
  toggleFavorite: () => void
} => {
  const [error, setError] = useState<Error | undefined>()
  const [isPending, setIsPending] = useState<boolean>(false)
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<
    StoredFavorites | undefined
  >()

  useEffect(() => {
    // Get the favorite restaurant data from storage.
    const getStoredData = async () => {
      const storedData = await getData<StoredFavorites>("favorite-restaurants")
      setFavoriteRestaurants(storedData)
    }
    getStoredData()
  }, [])

  // Finding the restaurant’s favorite status.
  const favoriteRestaurant = favoriteRestaurants?.favorites.find(
    (favorite) => favorite.restaurantId === restaurantId,
  )

  const toggleFavorite = async () => {
    // updatedFavorite has the toggled “favorite” status.
    const updatedFavorite = favoriteRestaurant
      ? {
          ...favoriteRestaurant,
          favorite: !favoriteRestaurant.favorite, // Toggle it.
        }
      : ({
          favorite: true, // Default to it being a new favorite.
          restaurantId: restaurantId,
          userId: userId,
        } as Favorite)

    // Update the datetime on the favorite
    updatedFavorite.datetimeUpdated = Date.now()

    // updatedFavorites will hold all the updated data before storage is updated.
    const updatedFavorites =
      favoriteRestaurants && favoriteRestaurants.favorites
        ? {
            ...favoriteRestaurants,
          }
        : {
            favorites: [] as Favorite[],
            lastSynced: 0,
          }

    // Update the full favorite restaurants array.
    const favoriteIndex = favoriteRestaurants?.favorites.findIndex(
      (favorite) => favorite.restaurantId === restaurantId,
    )
    if (favoriteIndex !== undefined && favoriteIndex >= 0) {
      // Already a favorite, so update the array in place.
      updatedFavorites.favorites[favoriteIndex] = updatedFavorite
    } else {
      // Brand new favorite, so add it to the array.
      updatedFavorites.favorites.push(updatedFavorite)
    }

    try {
      setError(undefined)
      setIsPending(true)

      const { data: updateFavoritesResponse, error } =
        await apiRequest<FavoriteResponse>({
          method: "POST",
          path: "/favorites",
          body: updatedFavorite,
        })

      if (updateFavoritesResponse && updateFavoritesResponse.data) {
        // Assign the _id property created from the API call to the new favorite.
        updatedFavorite._id = updateFavoritesResponse.data._id
      }

      // Update the stored data.
      await storeData<StoredFavorites>("favorite-restaurants", updatedFavorites)

      setError(error)
      setFavoriteRestaurants(updatedFavorites)
      setIsPending(false)
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error("Unknown error while updating favorites."))
      }
      setIsPending(false)
    }
  }

  return {
    error,
    isFavorite: (favoriteRestaurant && favoriteRestaurant.favorite) || false,
    isPending,
    toggleFavorite,
  }
}
