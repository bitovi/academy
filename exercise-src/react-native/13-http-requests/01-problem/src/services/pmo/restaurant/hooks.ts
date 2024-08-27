import { useEffect, useState } from "react"

import { State } from "./interfaces"

const baseUrl = process.env.PMO_API

interface StatesResponse {
  data: State[] | undefined
  error: Error | undefined
  isPending: boolean
}

export function useStates(): StatesResponse {
  // Exercise: Update the `useState` in `hooks.ts` to call `useEffect()` and `fetch` data from `${process.env.PMO_API}/states`.
}
