import { useEffect, useState } from "react"

import { apiRequest } from "@shared/services/pmo/api"

import { City, State } from "./interfaces"

interface CitiesResponse {
  data: City[] | undefined
  error: Error | undefined
  isPending: boolean
}

interface UseCitiesParams {
  state?: string
}

interface StatesResponse {
  data: State[] | undefined
  error: Error | undefined
  isPending: boolean
}

export function useCities({ state }: UseCitiesParams): CitiesResponse {
  const [response, setResponse] = useState<CitiesResponse>({
    data: undefined,
    error: undefined,
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
    data: undefined,
    error: undefined,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      setResponse({
        data: undefined,
        error: undefined,
        isPending: true,
      })

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
