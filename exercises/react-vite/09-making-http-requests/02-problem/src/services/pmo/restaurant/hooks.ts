import type { City, State } from "./interfaces"
import { useEffect, useState } from "react"

interface StatesResponse {
  data: State[] | undefined
  error: Error | undefined
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
    data: undefined,
    error: undefined,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.VITE_PMO_API}/states`, {
        method: "GET",
      })

      const data = await response.json()

      setResponse({
        data: data?.data || undefined,
        error: undefined,
        isPending: false,
      })
    }
    fetchData()
  }, [])

  return response
}
