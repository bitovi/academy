import type { City, State } from "./interfaces"
import { useEffect, useState } from "react"

export function useCities(state: string): City[] {
  const cities = [
    { name: "Madison", state: "WI" },
    { name: "Springfield", state: "IL" },
  ]
  return cities.filter((city) => {
    return city.state === state
  })
}
