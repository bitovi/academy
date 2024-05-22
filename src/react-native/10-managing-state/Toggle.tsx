import React from "react"
import { View, Text, Switch } from "react-native"

import { useToggle } from "./useToggle"

const Toggle: React.FC = () => {
  const [active, toggleActive] = useToggle(true)

  return (
    <View>
      <Switch onValueChange={toggleActive} value={active} />
      <Text>{active ? "On" : "Off"}</Text>
    </View>
  )
}

export default Toggle
