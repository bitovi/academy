export async function apiRequest<Data = never, Params = unknown>({
  method,
  params,
  path,
}: {
  method: string
  params?: Params
  path: string
}): Promise<{ data: Data | null; error: Error | null }> {
  
  // Exercise: Implement the `apiRequest` helper function to handle errors returned and thrown from `fetch()`.

  return {
    data: null,
    error: null,
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
