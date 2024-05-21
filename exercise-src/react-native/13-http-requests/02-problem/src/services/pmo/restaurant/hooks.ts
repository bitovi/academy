import { useEffect, useState } from "react"

import { City, State } from "./interfaces"

const baseUrl = process.env.PMO_API

interface StatesResponse {
  data: State[] | undefined
  error: Error | undefined
  isPending: boolean
}

interface CitiesResponse {
  data: City[] | undefined
  error: Error | undefined
  isPending: boolean
}

export function useStates(): StatesResponse {
  const [response, setResponse] = useState<StatesResponse>({
    data: undefined,
    error: undefined,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseUrl}/states`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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

export function useCities(state: string): CitiesResponse {
  // Exercise: Update our `useCities()` Hook to fetch cities from the Place My Order API, given a selected state.
}
