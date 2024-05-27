export interface Favorite {
  userId: string
  restaurantId: string
  favorite: boolean
  datetimeUpdated: number
  _id?: string
}

export interface FavoritesResponse {
  data: Favorite[] | undefined
  error: Error | undefined
  isPending: boolean
}

export interface FavoriteResponse {
  data: Favorite | undefined
  error: Error | undefined
  isPending: boolean
}

export interface StoredFavorites {
  lastSynced: number
  favorites: Favorite[]
}
