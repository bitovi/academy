import { useNetInfo } from "@react-native-community/netinfo"
import { useEffect } from "react"

import { useUser } from "../../auth"

import { syncWithServer } from "./sync"

const FavoritesSync: React.FC = () => {
  const { isConnected } = useNetInfo()
  const user = useUser()

  useEffect(() => {
    async function syncData() {
      if (isConnected && user) {
        await syncWithServer(user.id)
      }
    }
    syncData()
  }, [isConnected, user])

  return null
}

export default FavoritesSync
