import { useState } from "react"

const ControlledInput: React.FC = () => {
  const [name, setName] = useState("")
  return (
    <label>
      Name:
      <input
        type="text"
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
    </label>
  )
}
