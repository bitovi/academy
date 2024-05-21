import { useEffect, useState } from "react"

import { storeData, getData } from "../../storage/storage"
import { apiRequest } from "../api"

interface Favorite {
  userId: string
  restaurantId: string
  favorite: boolean
  datetimeUpdated: Date
  _id?: string
}

interface FavoritesResponse {
  data: Favorite[] | undefined
  error: Error | undefined
  isPending: boolean
}

interface FavoriteResponse {
  data: Favorite | undefined
  error: Error | undefined
  isPending: boolean
}

interface LocalStorageFavorites {
  lastSynced: Date
  favorites: Favorite[]
}

export const useFavorites = (
  userId?: string,
  restaurantId?: string,
): FavoritesResponse & {
  updateFavorites: (restaurantId: Favorite["restaurantId"]) => void
  favorite: Favorite | undefined
} => {
  const [response, setResponse] = useState<FavoritesResponse>({
    data: undefined,
    error: undefined,
    isPending: true,
  })
  const [localFavorites, setLocalFavorites] = useState<
    LocalStorageFavorites | undefined
  >()
  const [favorite, setFavorite] = useState<Favorite | undefined>()

  useEffect(() => {
    // Gathering favorites from both DB and local storage.
    const fetchData = async () => {
      const localFavorites = await getData<LocalStorageFavorites>("my-favorite")
      setLocalFavorites(
        localFavorites
          ? localFavorites
          : { favorites: [], lastSynced: new Date() },
      )

      const { data, error } = await apiRequest<FavoritesResponse>({
        method: "GET",
        path: "/favorites",
        params: {
          userId: userId,
        },
      })

      setResponse({
        data: data?.data || undefined,
        error: error,
        isPending: false,
      })
    }
    if (userId) {
      fetchData()
    }
  }, [userId])

  useEffect(() => {
    // Finding the restaurant's favorite status.
    if (restaurantId) {
      const getFavorite = async (restaurantId: Favorite["restaurantId"]) => {
        const foundFavorite = localFavorites?.favorites.find(
          (favorite) => favorite.restaurantId === restaurantId,
        )
        setFavorite(foundFavorite)
      }

      getFavorite(restaurantId)
    }
  }, [restaurantId, localFavorites])

  const updateFavorites = async (restaurantId: Favorite["restaurantId"]) => {
    if (localFavorites?.favorites) {
      const favoriteIndex = localFavorites.favorites.findIndex(
        (favorite) => favorite.restaurantId === restaurantId,
      )
      const newFavorites = [...localFavorites.favorites]
      const timestamp = new Date()
      let newFavorite = {}

      if (favoriteIndex === -1) {
        // If the favorite isn’t in storage, then create a new entry.
        newFavorite = {
          userId: userId,
          restaurantId: restaurantId,
          favorite: true,
          datetimeUpdated: timestamp,
        }
        newFavorites.push(newFavorite as Favorite)
      } else {
        // Otherwise, if the favorite is in storage, then update the existing entry.
        newFavorite = {
          ...newFavorites[favoriteIndex],
          favorite: !newFavorites[favoriteIndex].favorite,
          datetimeUpdated: timestamp,
        }
        newFavorites[favoriteIndex] = newFavorite as Favorite
      }

      const { data: postRes, error } = await apiRequest<FavoriteResponse>({
        method: "POST",
        path: "/favorites",
        body: newFavorite,
      })

      if (!("_id" in newFavorite) && postRes && postRes.data) {
        // Assign the _id property created from the API call to the new favorite.
        newFavorites[newFavorites.length - 1]._id = postRes.data._id
      }

      /*
        Exercise:
          1) Update the `my-favorite` storage item with an object that contains the `newFavorites`.
          2) Update the `localFavorites` state.
          3) Update the `response` state.
      */
    }
  }

  return {
    ...response,
    updateFavorites,
    favorite,
  }
}
