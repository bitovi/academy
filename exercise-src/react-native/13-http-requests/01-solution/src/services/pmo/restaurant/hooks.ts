import { useEffect, useState } from "react"

import { State } from "./interfaces"

const baseUrl = process.env.PMO_API

interface StatesResponse {
  data: State[] | null
  error: Error | null
  isPending: boolean
}

export function useStates(): StatesResponse {
  const [response, setResponse] = useState<StatesResponse>({
    data: null,
    error: null,
    isPending: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseUrl}/states`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      setResponse({
        data: data?.data || null,
        error: null,
        isPending: false,
      })
    }
    fetchData()
  }, [])

  return response
}
