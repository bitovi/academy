import { useEffect, useState } from "react"
import { Pressable, Text } from "react-native"

function UpdateLogger() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.info("Component updated!")
  }) // No dependency array, runs on every update

  return (
    <Pressable onPress={() => setCount(count + 1)}>
      <Text>Increment</Text>
    </Pressable>
  )
}

export default UpdateLogger
