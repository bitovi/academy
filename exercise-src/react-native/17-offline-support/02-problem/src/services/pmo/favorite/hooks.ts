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
  data: Favorite[] | null
  error: Error | null
  isPending: boolean
}

interface FavoriteResponse {
  data: Favorite | null
  error: Error | null
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
    data: null,
    error: null,
    isPending: true,
  })
  const [localFavorites, setLocalFavorites] = useState<
    LocalStorageFavorites | undefined
  >()
  const [favorite, setFavorite] = useState<Favorite | undefined>()

  useEffect(() => {
    //gathering favorites from both DB and local storage.
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
        data: data?.data || null,
        error: error,
        isPending: false,
      })
    }
    if (userId) {
      fetchData()
    }
  }, [userId])

  useEffect(() => {
    //finding the restaurant's favorite status.
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
        // if favorites doesn't exist create a new entry.
        newFavorite = {
          userId: userId,
          restaurantId: restaurantId,
          favorite: true,
          datetimeUpdated: timestamp,
        }
        newFavorites.push(newFavorite as Favorite)
      } else {
        // else if favorite do exist update the existing entry.
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
        // new entry don't have _id until the api call get's returned. Adding _id to the new favorites.
        newFavorites[newFavorites.length - 1]._id = postRes.data._id
      }
    }
  }

  return {
    ...response,
    updateFavorites,
    favorite,
  }
}
