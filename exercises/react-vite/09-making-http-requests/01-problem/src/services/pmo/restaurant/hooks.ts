import type { City, State } from "./interfaces"
import { useEffect, useState } from "react"

interface StatesResponse {
  data: State[] | null
  error: Error | null
  isPending: boolean
}

export function useCities(state: string): City[] {
  const cities = [
    { name: "Madison", state: "WI" },
    { name: "Springfield", state: "IL" },
  ]
  return cities.filter((city) => {
    return city.state === state
  })
}

export function useStates(): StatesResponse {
  // Exercise: Update the `useState` in `hooks.ts` to call `useEffect()` and `fetch` data from `${process.env.PMO_API}/states`.
}
