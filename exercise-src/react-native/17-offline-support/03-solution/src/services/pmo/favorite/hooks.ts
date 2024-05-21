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
  syncWithServer: () => void
  localFavorites: LocalStorageFavorites | undefined
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

      const newLocalFavorites = {
        lastSynced: error ? localFavorites.lastSynced : timestamp,
        favorites: newFavorites,
      }

      await storeData<LocalStorageFavorites>("my-favorite", newLocalFavorites)
      setLocalFavorites(newLocalFavorites)
      setResponse({ data: newFavorites, error: error, isPending: false })
    }
  }

  const syncWithServer = async () => {
    // Updating the DB with the local data.
    if (localFavorites) {
      const { data: serverData } = await apiRequest<FavoritesResponse>({
        method: "GET",
        path: "/favorites",
        params: {
          userId: userId,
          "datetimeUpdated[$gt]": localFavorites?.lastSynced,
        },
      })

      const newLocalFavorites = {
        lastSynced: new Date(),
        favorites: [...localFavorites.favorites],
      }

      if (serverData?.data) {
        if (serverData.data.length !== 0) {
          serverData.data.forEach((serverFavorite) => {
            // Looping through the server data and updating it with the local.
            const updateIndex = newLocalFavorites.favorites.findIndex(
              (localFavorite) => localFavorite._id === serverFavorite._id,
            )
            newLocalFavorites.favorites[updateIndex] = { ...serverFavorite }
          })
        }
        await Promise.all(
          // Calling the server to update the DB.
          newLocalFavorites.favorites.map(async (newLocalFavorite, index) => {
            if (
              new Date(localFavorites.lastSynced) <
                new Date(newLocalFavorite.datetimeUpdated) &&
              serverData.data?.findIndex(
                (serverFavorite) => newLocalFavorite._id === serverFavorite._id,
              ) === -1
            ) {
              const { data: postRes, error } =
                await apiRequest<FavoriteResponse>({
                  method: "POST",
                  path: "/favorites",
                  body: {
                    ...newLocalFavorite,
                    datetimeUpdated: newLocalFavorites.lastSynced,
                  },
                })
              if (error) {
                newLocalFavorites.lastSynced = localFavorites.lastSynced
              }
              if (postRes && postRes.data) {
                // Updating local data with any missing _id.
                newLocalFavorites.favorites[index] = { ...postRes.data }
              }
            }
          }),
        )

        await storeData<LocalStorageFavorites>("my-favorite", newLocalFavorites)
      }
    }
  }

  return {
    ...response,
    updateFavorites,
    favorite,
    syncWithServer,
    localFavorites,
  }
}
