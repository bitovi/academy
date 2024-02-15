import { useEffect, useState } from 'react'
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
      const response = await fetch(`${import.meta.env.VITE_PMO_API}/cities?state=${state}`, {
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
  }, []);

  return response
}