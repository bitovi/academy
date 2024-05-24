import { useEffect, useState } from "react"
import { Pressable, Vibration, View } from "react-native"

function VibrateButtons() {
  const [vibrate, setVibrate] = useState(false)

  useEffect(() => {
    if (vibrate) {
      Vibration.vibrate(1000)
    }

    return () => {
      Vibration.cancel()
    }
  }, [vibrate])

  return (
    <View>
      <Pressable onPress={() => setVibrate(true)}>
        <Text>Vibrate</Text>
      </Pressable>
      <Pressable onPress={() => setVibrate(false)}>
        <Text>Stop vibrating</Text>
      </Pressable>
    </View>
  )
}

export default VibrateButtons
