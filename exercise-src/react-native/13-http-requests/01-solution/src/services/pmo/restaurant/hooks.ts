import { useEffect, useState } from "react"

import { State } from "./interfaces"

const baseUrl = process.env.PMO_API

interface StatesResponse {
  isPending: boolean
  data: State[] | undefined
  error: Error | undefined
}

export function useStates(): StatesResponse {
  const [response, setResponse] = useState<StatesResponse>({
    data: undefined,
    error: undefined,
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
        data: data?.data || undefined,
        error: undefined,
        isPending: false,
      })
    }
    fetchData()
  }, [])

  return response
}
