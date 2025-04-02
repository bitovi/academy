import type { City, Restaurant, State } from "./interfaces"
import { useEffect, useState } from "react"
import { apiRequest } from "../api"

interface CitiesResponse {
  data: City[] | null
  error: Error | null
  isPending: boolean
}

interface StatesResponse {
  data: State[] | null
  error: Error | null
  isPending: boolean
}

export function useCities(state: string): CitiesResponse {
  const [response, setResponse] = useState<CitiesResponse>({
    data: null,
    error: null,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await apiRequest<City[]>({
        method: "GET",
        path: "/cities",
        params: {
          state: state,
        },
      })

      setResponse({
        data: data,
        error: error,
        isPending: false,
      })
    }
    fetchData()
  }, [state])

  return response
}

export function useStates(): StatesResponse {
  const [response, setResponse] = useState<StatesResponse>({
    data: null,
    error: null,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await apiRequest<State[]>({
        method: "GET",
        path: "/states",
      })

      setResponse({
        data: data,
        error: error,
        isPending: false,
      })
    }
    fetchData()
  }, [])

  return response
}
