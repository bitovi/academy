import { useEffect, useState } from "react"

import { apiRequest } from "../api/api"

import { City, Restaurant, State } from "./interfaces"

interface CitiesResponse {
  data: City[] | undefined
  error: Error | undefined
  isPending: boolean
}

interface UseCitiesParams {
  state?: string
}
interface RestaurantResponse {
  data: Restaurant | undefined
  error: Error | undefined
  isPending: boolean
}

interface UseRestaurant {
  slug: string
}

interface RestaurantsResponse {
  data: Restaurant[] | undefined
  error: Error | undefined
  isPending: boolean
}

interface UseRestaurants {
  state: string
  city: string
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
      const { data, error } = await apiRequest<CitiesResponse>({
        method: "GET",
        path: "/cities",
        params: {
          state: state,
        },
      })

      setResponse({
        data: data?.data || undefined,
        error: error,
        isPending: false,
      })
    }
    fetchData()
  }, [state])

  return response
}

export function useRestaurant({ slug }: UseRestaurant): RestaurantResponse {
  // Exercise: Fill in `useRestaurant` Hook for fetching the details of the restaurant.
}

export function useRestaurants({
  state,
  city,
}: UseRestaurants): RestaurantsResponse {
  // Exercise: Fill in `useRestaurants` Hook for fetching the list of restaurants.
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

      const { data, error } = await apiRequest<StatesResponse>({
        method: "GET",
        path: "/states",
      })

      setResponse({
        data: data?.data || undefined,
        error: error,
        isPending: false,
      })
    }
    fetchData()
  }, [])

  return response
}
