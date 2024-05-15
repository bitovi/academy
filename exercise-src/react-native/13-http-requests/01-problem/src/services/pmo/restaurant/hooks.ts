import { useEffect, useState } from "react"

import { State } from "./interfaces"

const baseUrl = process.env.PMO_API

interface StatesResponse {
  isPending: boolean
  data: State[] | undefined
  error: Error | undefined
}

export function useStates(): StatesResponse {}
