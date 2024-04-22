import { useEffect, useState } from "react"

function DataFetcher() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((response) => {
        const parsedData = await response.json()
        setData(parsedData)
      })
      .catch((error) => {
        // Error should be shown to the user
        console.error("Error fetching data:", error)
      })
  }, [])

  return <p>{data}</p>
}

export default DataFetcher
