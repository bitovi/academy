import { useNetInfo } from "@react-native-community/netinfo"
import { useEffect } from "react"

import { useUser } from "../../auth"

import { useFavorites } from "./hooks"

export const useFavoritesSync = (): void => {
  // Exercise: When the user is signed in and has a network connection, sync with the server.

  return
}

const FavoritesSync: React.FC = () => {
  useFavoritesSync()

  return null
}

export default FavoritesSync
