export async function apiRequest<Data = never, Params = unknown>({
  method,
  params,
  path,
}: {
  method: string
  params?: Params
  path: string
}): Promise<{ data?: Data; error?: Error }> {
  try {
    const query = params ? stringifyQuery(params) : ""
    const response = await fetch(
      `${import.meta.env.VITE_PMO_API}${path}?${query}`,
      {
        method,
      },
    )

    const data = await response.json()
    const error = response.ok
      ? undefined
      : new Error(`${response.status} (${response.statusText})`)

    return {
      data: "data" in data ? data.data : data,
      error: error,
    }
  } catch (error) {
    return {
      data: undefined,
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    }
  }
}

export function stringifyQuery(input: Record<string, string | null | undefined>): string {
  const output: string[] = []

  for (const [key, value] of Object.entries(input)) {
    if (typeof value !== "undefined" && value !== null) {
      output.push(`${key}=${value}`)
    }
  }

  return output.join("&")
}
