import { useNetInfo } from "@react-native-community/netinfo"
import { useEffect } from "react"

import Typography from "../../../design/Typography"
import { useUser } from "../../auth"

import { useFavorites } from "./hooks"

const useFavoritesSync = (): boolean => {
  const { isConnected } = useNetInfo()

  return isConnected
}

const FavoritesSync: React.FC = () => {
  const isConnected = useFavoritesSync()

  return (
    <Typography>
      Connection Status: {isConnected ? "Online" : "Offline"}
    </Typography>
  )
}

export default FavoritesSync
