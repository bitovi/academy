import { useEffect, useState } from "react"

import { apiRequest } from "../api/api"

import { City, Restaurant, State } from "./interfaces"

interface CitiesResponse {
  data: City[] | null
  error: Error | null
  isPending: boolean
}

interface RestaurantResponse {
  data: Restaurant | null
  error: Error | null
  isPending: boolean
}

interface RestaurantsResponse {
  data: Restaurant[] | null
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
      const { data, error } = await apiRequest<CitiesResponse>({
        method: "GET",
        path: "/cities",
        params: {
          state: state,
        },
      })

      setResponse({
        data: data?.data || null,
        error: error,
        isPending: false,
      })
    }
    fetchData()
  }, [state])

  return response
}

export function useRestaurant(slug: string): RestaurantResponse {}

export function useRestaurants(
  state: string,
  city: string,
): RestaurantsResponse {}

export function useStates(): StatesResponse {
  const [response, setResponse] = useState<StatesResponse>({
    data: null,
    error: null,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      setResponse({
        data: null,
        error: null,
        isPending: true,
      })

      const { data, error } = await apiRequest<StatesResponse>({
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
  }, [])

  return response
}
