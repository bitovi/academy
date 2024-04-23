import { useState } from "react"

const landmarks = [
  { id: "0b90c705", name: "Eiffel Tower" },
  { id: "5be758c1", name: "Machu Picchu" },
  { id: "206025c3", name: "Taj Mahal" },
]

type SelectedItems = Record<string, number>

const Selected: React.FC = () => {
  const [selected, setSelected] = useState<SelectedItems>({})

  function handleChange(name: string, isSelected: boolean) {
    setSelected((current) => ({ ...current, [name]: isSelected }))
  }

  return (
    <form>
      {landmarks.map((landmark) => {
        return (
          <label key={landmark.id}>
            {landmark.name}:
            <input
              type="checkbox"
              checked={selected[landmark.name]}
              onChange={(event) =>
                handleChange(landmark.name, event.target.checked)
              }
            />
          </label>
        )
      })}
    </form>
  )
}
