import { getData, storeData } from "../../storage"
import { apiRequest } from "../api"

import {
  Favorite,
  FavoriteResponse,
  FavoritesResponse,
  StoredFavorites,
} from "./interfaces"

export const syncWithServer = async (userId: string): Promise<void> => {
  // Fetch the list of favorites from the server.
  const { data: apiResponse } = await apiRequest<FavoritesResponse>({
    method: "GET",
    path: "/favorites",
    params: {
      userId: userId,
    },
  })

  // Get the list of favorites in storage.
  const favoriteRestaurants = await getData<StoredFavorites>(
    "favorite-restaurants",
  )

  // Create an Object with the restaurantId as the key and full Favorite as the value.
  const favoriteRestaurantMap: { [key: string]: Favorite } = {}
  if (favoriteRestaurants && favoriteRestaurants.favorites) {
    favoriteRestaurants.favorites.forEach((storedFavorite) => {
      favoriteRestaurantMap[storedFavorite.restaurantId] = storedFavorite
    })
  }

  if (apiResponse && apiResponse.data) {
    // Iterate through the list of favorites returned by the server:
    const favoritesUpdatedOnServer = apiResponse.data.filter((apiFavorite) => {
      const storedFavorite = favoriteRestaurantMap[apiFavorite.restaurantId]
      // If the server datetimeUpdated is later than the datetimeUpdated in storage, or if the favorite is not in storage:
      const serverDatetimeIsLaterThanStorage = storedFavorite
        ? apiFavorite.datetimeUpdated > storedFavorite.datetimeUpdated
        : true
      return serverDatetimeIsLaterThanStorage
    })

    const idsOfFavoritesUpdatedOnServer = favoritesUpdatedOnServer.map(
      (apiFavorite) => {
        if (favoriteRestaurantMap[apiFavorite.restaurantId]) {
          // Update the object that came from storage.
          favoriteRestaurantMap[apiFavorite.restaurantId]._id = apiFavorite._id
          favoriteRestaurantMap[apiFavorite.restaurantId].datetimeUpdated =
            apiFavorite.datetimeUpdated
          favoriteRestaurantMap[apiFavorite.restaurantId].favorite =
            apiFavorite.favorite
        } else {
          // Create the favorite in the map; this will be added to storage later.
          favoriteRestaurantMap[apiFavorite.restaurantId] = apiFavorite
        }

        // Keep this in an array/set to reference below…
        return apiFavorite._id
      },
    )

    // Query storage for favorites updated since the lastSynced datetime:
    const favoritesUpdatedWhileOffline =
      favoriteRestaurants?.favorites.filter((storedFavorite) => {
        const favoriteUpdatedSinceLastSync =
          storedFavorite.datetimeUpdated > favoriteRestaurants?.lastSynced
        return favoriteUpdatedSinceLastSync
      }) || []

    // If the favorite isn’t in the array/set created above
    const favoritesToUpdateOnServer = favoritesUpdatedWhileOffline.filter(
      (storedFavorite) => {
        const storedFavoriteIsMoreRecentThanServer =
          idsOfFavoritesUpdatedOnServer.includes(storedFavorite._id) === false
        return storedFavoriteIsMoreRecentThanServer
      },
    )

    // Call the API to update the favorite
    favoritesToUpdateOnServer.map(async (storedFavorite) => {
      const { data: updateFavoritesResponse } =
        await apiRequest<FavoriteResponse>({
          method: "POST",
          path: "/favorites",
          body: storedFavorite,
        })

      // Update the object that will be stored:
      if (updateFavoritesResponse && updateFavoritesResponse.data) {
        favoriteRestaurantMap[storedFavorite.restaurantId] =
          updateFavoritesResponse.data
      }
    })

    // Update the lastSynced datetime in storage
    const updatedFavoriteRestaurants = {
      favorites: [] as Favorite[],
      lastSynced: Date.now(),
    }
    for (const restaurantId in favoriteRestaurantMap) {
      const favoriteRestaurant = favoriteRestaurantMap[restaurantId]
      updatedFavoriteRestaurants.favorites.push(favoriteRestaurant)
    }

    // Update the stored data.
    await storeData<StoredFavorites>(
      "favorite-restaurants",
      updatedFavoriteRestaurants,
    )
  }
}
