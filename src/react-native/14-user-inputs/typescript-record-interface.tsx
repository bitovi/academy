import React, { useState } from "react"
import { View, Text, Switch } from "react-native"

const landmarks = [
  { id: "0b90c705", name: "Eiffel Tower" },
  { id: "5be758c1", name: "Machu Picchu" },
  { id: "206025c3", name: "Taj Mahal" },
]

type SelectedItems = Record<string, boolean>

const Selected = () => {
  const [selected, setSelected] = useState<SelectedItems>({})

  function handleChange(name: string, isSelected: boolean) {
    setSelected((current) => ({ ...current, [name]: isSelected }))
  }

  return (
    <View>
      {landmarks.map((landmark) => {
        return (
          <View
            key={landmark.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text>{landmark.name}: </Text>
            <Switch
              onValueChange={(newValue) =>
                handleChange(landmark.name, newValue)
              }
              value={!!selected[landmark.name]}
            />
          </View>
        )
      })}
    </View>
  )
}

export default Selected
