import React, { ChangeEvent, useState } from "react"
import { View, Text, TextInput } from "react-native"

const NameField: React.FC = () => {
  const [value, setValue] = useState<string>("")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <View>
      <Text>Name</Text>
      <TextInput
        onChangeText={handleChange}
        value={value}
        style={{ borderWidth: 1, borderColor: "gray", padding: 10 }}
      />
    </View>
  )
}
