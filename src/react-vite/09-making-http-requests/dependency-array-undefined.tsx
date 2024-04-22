import { useEffect, useState } from "react"

function UpdateLogger() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.info("Component updated!")
  }) // No dependency array, runs on every update

  return <button onClick={() => setCount(count + 1)}>Increment</button>
}

export default UpdateLogger
