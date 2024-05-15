import { useEffect, useState } from "react"
import { Text } from "react-native"

function DataFetcher() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/data")
        const parsedData = response.json()
        setData(parsedData)
      } catch (error) {
        // Error should be shown to the user
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return <Text>{data}</Text>
}

export default DataFetcher
