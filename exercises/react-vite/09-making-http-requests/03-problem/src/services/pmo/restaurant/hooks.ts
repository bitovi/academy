import type { City, State } from "./interfaces"
import { useEffect, useState } from "react"
import { apiRequest } from "../api"

interface CitiesResponse {
  data: City[] | undefined
  error: Error | undefined
  isPending: boolean
}

interface StatesResponse {
  data: State[] | undefined
  error: Error | undefined
  isPending: boolean
}

export function useCities(state: string): CitiesResponse {
  const [response, setResponse] = useState<CitiesResponse>({
    data: undefined,
    error: undefined,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_PMO_API}/cities?state=${state}`,
        {
          method: "GET",
        },
      )

      const data = await response.json()

      setResponse({
        data: data?.data || undefined,
        error: undefined,
        isPending: false,
      })
    }
    fetchData()
  }, [state])

  return response
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
