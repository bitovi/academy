import { useEffect, useState } from "react"
import { Keyboard, Text, View } from "react-native"

const GeolocationComponent: React.FC = () => {
  const [keyboardStatus, setKeyboardStatus] = useState("")

  useEffect(() => {
    // Effect callback function
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard shown")
    })
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard hidden")
    })

    return () => {
      // Teardown function
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, []) // Dependency array

  return (
    <View>
      {keyboardStatus ? (
        <Text>{keyboardStatus}</Text>
      ) : (
        <Text>Checking keyboard status…</Text>
      )}
    </View>
  )
}

export default GeolocationComponent
