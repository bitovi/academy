import React, { useState } from "react"
import { View, Text, Switch } from "react-native"

const landmarks = [
  { id: "0b90c705", name: "Eiffel Tower" },
  { id: "5be758c1", name: "Machu Picchu" },
  { id: "206025c3", name: "Taj Mahal" },
]

type SelectedItems = Record<string, boolean>

const Selected: React.FC = () => {
  const [selected, setSelected] = useState<SelectedItems>({})

  function handleSelectedChange(name: string, isSelected: boolean) {
    setSelected((currentSelectedItems) => {
      const updatedSelectedItems = {
        ...currentSelectedItems,
      }

      if (isSelected) {
        updatedSelectedItems[name] = true
      } else {
        delete updatedSelectedItems[name]
      }

      return updatedSelectedItems
    })
  }

  return (
    <View>
      {landmarks.map((landmark) => (
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
              handleSelectedChange(landmark.name, newValue)
            }
            value={!!selected[landmark.name]}
          />
        </View>
      ))}
    </View>
  )
}

export default Selected
