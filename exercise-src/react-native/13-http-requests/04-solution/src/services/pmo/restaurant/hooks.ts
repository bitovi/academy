import { useEffect, useState } from "react"

import { apiRequest } from "../api/api"

import { City, Restaurant, State } from "./interfaces"

interface CitiesResponse {
  isPending: boolean
  data: City[] | undefined
  error: Error | undefined
}

interface RestaurantResponse {
  isPending: boolean
  data: Restaurant | undefined
  error: Error | undefined
}

interface RestaurantsResponse {
  isPending: boolean
  data: Restaurant[] | undefined
  error: Error | undefined
}

interface StatesResponse {
  isPending: boolean
  data: State[] | undefined
  error: Error | undefined
}

export function useCities(state: string): CitiesResponse {
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

export function useRestaurant(slug: string): RestaurantResponse {
  const [response, setResponse] = useState<RestaurantResponse>({
    data: undefined,
    error: undefined,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await apiRequest({
        method: "GET",
        path: `/restaurants/${slug}`,
      })

      setResponse({
        data: data || undefined,
        error: error,
        isPending: false,
      })
    }
    fetchData()
  }, [slug])

  return response
}

export function useRestaurants(
  state: string,
  city: string,
): RestaurantsResponse {
  const [response, setResponse] = useState<RestaurantsResponse>({
    data: undefined,
    error: undefined,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await apiRequest<RestaurantsResponse>({
        method: "GET",
        path: "/restaurants",
        params: {
          "filter[address.state]": state,
          "filter[address.city]": city,
        },
      })

      setResponse({
        data: data?.data || undefined,
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
