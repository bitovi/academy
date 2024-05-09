import { useState } from "react"

export function useToggle(intialValue = true) {
  const [on, setOn] = useState(intialValue)

  const handleToggle = (value?: unknown) => {
    if (typeof value === "boolean") {
      setOn(value)
    } else {
      setOn(!on)
    }
  }

  return [on, handleToggle]
}
