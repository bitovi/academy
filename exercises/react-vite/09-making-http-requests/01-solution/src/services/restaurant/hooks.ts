import { useEffect, useState } from "react"
import type { PromiseState } from "../interfaces";
import type { City, Restaurant, State } from "./interfaces"
import { getCities, getRestaurants, getStates } from "./restaurant"

export function useCities(
  state: string,
): PromiseState<City[]> {
  const [response, setResponse] = useState<PromiseState<City[]>>({
    data: null,
    error: null,
    isPending: true,
  })

  useEffect(() => {
    if (state) {
      setResponse({
        data: null,
        error: null,
        isPending: true,
      })
      const fetchData = async () => {
        try {
          const apiResponse = await getCities(state)
          setResponse({
            ...apiResponse,
            isPending: false,
          })
        } catch (error) {
          setResponse({
            data: null,
            error: error instanceof Error ? error : new Error('An unknown error occurred'),
            isPending: false,
          })
        }
      }
      fetchData()
    } else {
      setResponse({
        data: null,
        error: null,
        isPending: false,
      })
    }
  }, [state]);

  return response
}

export function useRestaurants(
  state: string,
  city: string,
): PromiseState<Restaurant[]> {
  const [response, setResponse] = useState<PromiseState<Restaurant[]>>({
    data: null,
    error: null,
    isPending: true,
  })

  useEffect(() => {
    if (city && state) {
      setResponse({
        data: null,
        error: null,
        isPending: true,
      })
      const fetchData = async () => {
        try {
          const apiResponse = await getRestaurants(state, city)
          setResponse({
            ...apiResponse,
            isPending: false,
          })
        } catch (error) {
          setResponse({
            data: null,
            error: error instanceof Error ? error : new Error('An unknown error occurred'),
            isPending: false,
          })
        }
      }
      fetchData()
    } else {
      setResponse({
        data: null,
        error: null,
        isPending: false,
      })
    }
  }, [city, state]);

  return response
}

export function useStates(): PromiseState<State[]> {
  const [response, setResponse] = useState<PromiseState<State[]>>({
    data: null,
    error: null,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiResponse = await getStates()
        setResponse({
          ...apiResponse,
          isPending: false,
        })
      } catch (error) {
        setResponse({
          data: null,
          error: error instanceof Error ? error : new Error('An unknown error occurred'),
          isPending: false,
        })
      }
    }
    fetchData()
  }, []);

  return response
}