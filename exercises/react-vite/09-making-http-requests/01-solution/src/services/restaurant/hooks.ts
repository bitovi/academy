import type { City, State } from "./interfaces"
import { useEffect, useState } from "react"

interface StatesResponse {
  data: State[] | null
  error: Error | null
  isPending: boolean
}

export function useCities(state: string): City[] {
  const cities = [
    { name: "Madison", state: "WI" },
    { name: "Springfield", state: "IL" },
  ]
  return cities.filter((city) => {
    return city.state === state
  })
}

export function useStates(): StatesResponse {
  const [response, setResponse] = useState<StatesResponse>({
    data: null,
    error: null,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.VITE_PMO_API}/states`, {
        method: "GET",
      })

      const data = await response.json()

      setResponse({
        data: data?.data || null,
        error: null,
        isPending: false,
      })
    }
    fetchData()
  }, [])

  return response
}
