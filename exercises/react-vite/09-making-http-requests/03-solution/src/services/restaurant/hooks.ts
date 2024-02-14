import { useEffect, useState } from "react"
import type { PromiseState } from "../interfaces";
import type { State } from "./interfaces"
import { getStates } from "./restaurant"

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