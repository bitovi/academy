import { useNetInfo } from "@react-native-community/netinfo"

import Typography from "../../../design/Typography"

const FavoritesSync: React.FC = () => {
  const { isConnected } = useNetInfo()

  return (
    <Typography>
      Connection Status: {isConnected ? "Online" : "Offline"}
    </Typography>
  )
}

export default FavoritesSync
