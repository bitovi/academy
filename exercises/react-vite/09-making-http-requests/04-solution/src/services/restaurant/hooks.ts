import { useEffect, useState } from 'react'
import { apiRequest } from '../api'
import type { City, State } from './interfaces'

interface CityResponse {
  data: City[] | null;
  error: Error | null;
  isPending: boolean;
}

interface StateResponse {
  data: State[] | null;
  error: Error | null;
  isPending: boolean;
}

export function useCities(state: string): CityResponse {
  const [response, setResponse] = useState<CityResponse>({
    data: null,
    error: null,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await apiRequest<CityResponse>({
          method: "GET",
          path: "/cities",
          params: {
              state: state
          },
      })

      setResponse({
        data: data?.data || null,
        error: error,
        isPending: false,
      })
    }
    fetchData()
  }, [state]);

  return response
}

export function useStates(): StateResponse {
  const [response, setResponse] = useState<StateResponse>({
    data: null,
    error: null,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await apiRequest<StateResponse>({
          method: "GET",
          path: "/states",
      })

      setResponse({
        data: data?.data || null,
        error: error,
        isPending: false,
      })
    }
    fetchData()
  }, []);

  return response
}