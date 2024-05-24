import { useEffect, useState } from "react"

import { apiRequest } from "../api"

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

interface UseCitiesParams {
  state?: string
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

export function useCities({ state }: UseCitiesParams): CitiesResponse {
  const [response, setResponse] = useState<CitiesResponse>({
    data: undefined,
    error: undefined,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      if (state) {
        const response = await fetch(`${baseUrl}/cities?state=${state}`, {
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
    }
    fetchData()
  }, [state])

  return response
}
