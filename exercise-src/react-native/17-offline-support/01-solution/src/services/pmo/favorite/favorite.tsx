import { useNetInfo } from "@react-native-community/netinfo"
import { FC } from "react"

import Typography from "../../../design/Typography"

const FavoritesSync: FC = () => {
  const { isConnected } = useNetInfo()

  return (
    <Typography>
      Connection Status: {isConnected ? "Online" : "Offline"}
    </Typography>
  )
}

export default FavoritesSync
