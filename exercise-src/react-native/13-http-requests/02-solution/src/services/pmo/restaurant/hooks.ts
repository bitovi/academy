import { useEffect, useState } from "react"
import type { State, City } from "./interfaces"

const baseUrl = process.env.PMO_API

interface StatesResponse {
  data: State[] | null
  error: Error | null
  isPending: boolean
}

interface CitiesResponse {
  data: City[] | null
  error: Error | null
  isPending: boolean
}

export function useStates(): StatesResponse {
  const [response, setResponse] = useState<StatesResponse>({
    data: null,
    error: null,
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
      console.log(data)
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

export function useCities(state: string): CitiesResponse {
  const [response, setResponse] = useState<CitiesResponse>({
    data: null,
    error: null,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${baseUrl}/cities?state=${state}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )

      const data = await response.json()
      console.log(data)
      setResponse({
        data: data?.data || null,
        error: null,
        isPending: false,
      })
    }
    fetchData()
  }, [state])

  return response
}