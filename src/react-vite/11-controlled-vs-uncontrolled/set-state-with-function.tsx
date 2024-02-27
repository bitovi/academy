import React, { useState } from 'react';

const landmarks = [
  { id: '0b90c705', name: 'Eiffel Tower' },
  { id: '5be758c1', name: 'Machu Picchu' },
  { id: '206025c3', name: 'Taj Mahal' },
]

type SelectedItems = Record<string, number>

const Selected: React.FC = () => {
  const [selected, setSelected] = useState<SelectedItems>({});

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
    <form>{
      landmarks.map((landmark) => {
        return (
          <label key={landmark.id}>
            {landmark.name}:
            <input
              checked={selected[landmark.name]}
              onChange={(event) => handleSelectedChange(landmark.name, event.target.checked)}
              type="checkbox"
            />
          </label>
        )
      })
    }</form>
  )
}