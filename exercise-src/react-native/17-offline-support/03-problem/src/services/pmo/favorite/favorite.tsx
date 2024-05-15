import { useNetInfo } from "@react-native-community/netinfo"
import { useEffect } from "react"

import { useUser } from "../../auth"

import { useFavorites } from "./hooks"

export const useFavoritesSync = (): void => {
  return
}

const FavoritesSync: React.FC = () => {
  useFavoritesSync()

  return null
}

export default FavoritesSync
