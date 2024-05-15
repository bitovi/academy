import { useNetInfo } from "@react-native-community/netinfo"
import { FC, useEffect } from "react"

import { useUser } from "../../auth"
import Typography from "../../../design/Typography"

import { useFavorites } from "./hooks"

const useFavoritesSync = (): boolean => {
  const user = useUser()
  const { isConnected } = useNetInfo()
  const { syncWithServer, localFavorites } = useFavorites(user?.id)

  useEffect(() => {
    if (user && isConnected && localFavorites) {
      syncWithServer()
    }
  }, [isConnected, localFavorites, syncWithServer, user])

  return isConnected
}

const FavoritesSync: FC = () => {
  const isConnected = useFavoritesSync()

  return (
    <Typography>
      Connection Status: {isConnected ? "Online" : "Offline"}
    </Typography>
  )
}

export default FavoritesSync
