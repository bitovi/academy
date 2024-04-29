import type { FC } from "react"
import { useEffect } from "react"
import { useNetInfo } from "@react-native-community/netinfo"

import { useUser } from "../../auth"

import { useFavorites } from "./hooks"

const useFavoritesSync = (): void => {
  const user = useUser()
  const { isConnected } = useNetInfo()
  const { syncWithServer, localFavorites } = useFavorites(user?.id)

  useEffect(() => {
    if (user && isConnected && localFavorites) {
      syncWithServer()
    }
  }, [isConnected, localFavorites, syncWithServer, user])

  return
}

const FavoritesSync: FC = () => {
  useFavoritesSync()

  return null
}

export default FavoritesSync
