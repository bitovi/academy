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

export function useRestaurant({ slug }: UseRestaurant): RestaurantResponse {
  const [response, setResponse] = useState<RestaurantResponse>({
    data: undefined,
    error: undefined,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await apiRequest<Restaurant>({
        method: "GET",
        path: `/restaurants/${slug}`,
      })

      setResponse({
        data: data,
        error: error,
        isPending: false,
      })
    }
    fetchData()
  }, [slug])

  return response
}

export function useRestaurants({
  state,
  city,
}: UseRestaurants): RestaurantsResponse {
  const [response, setResponse] = useState<RestaurantsResponse>({
    data: undefined,
    error: undefined,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await apiRequest<Restaurant[]>({
        method: "GET",
        path: "/restaurants",
        params: {
          "filter[address.state]": state,
          "filter[address.city]": city,
        },
      })

      setResponse({
        data: data,
        error: error,
        isPending: false,
      })
    }
    fetchData()
  }, [state, city])

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
