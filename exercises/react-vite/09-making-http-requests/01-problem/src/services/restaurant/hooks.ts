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

  return response
}