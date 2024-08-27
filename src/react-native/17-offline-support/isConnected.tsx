import { useNetInfo } from "@react-native-community/netinfo"
import React from "react"
import { Text, View } from "react-native"

const NetworkStatusComponent = () => {
  const { isConnected } = useNetInfo()

  return (
    <View>
      <Text>Is connected: {isConnected ? "Yes" : "No"}</Text>
    </View>
  )
}

export default NetworkStatusComponent
