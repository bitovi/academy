import { useEffect, useState } from "react"
import { Text } from "react-native"

function DataFetcher() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => {
        const parsedData = response.json()
        setData(parsedData)
      })
      .catch((error) => {
        // Error should be shown to the user
        console.error("Error fetching data:", error)
      })
  }, [])

  return <Text>{data}</Text>
}

export default DataFetcher
