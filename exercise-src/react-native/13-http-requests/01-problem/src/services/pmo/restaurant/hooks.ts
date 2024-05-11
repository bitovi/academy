import { useEffect, useState } from "react"
import type { State } from "./interfaces"

const baseUrl = process.env.PMO_API

interface StatesResponse {
  data: State[] | null
  error: Error | null
  isPending: boolean
}

export function useStates(): StatesResponse {
 
}
