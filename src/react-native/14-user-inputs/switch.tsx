import { useState } from "react"
import { Switch, Text, View } from "react-native"

const SwitchExample = () => {
  const [isEnabled, setIsEnabled] = useState(false)

  return (
    <View>
      <Switch
        onValueChange={(newValue) => setIsEnabled(newValue)}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        value={isEnabled}
      />
      <Text>{isEnabled ? "Enabled" : "Disabled"}</Text>
    </View>
  )
}

export default SwitchExample
