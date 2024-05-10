const baseUrl = process.env.PMO_API

export interface LocalStorageApiRequest<T> {
  data: T
  dateTime: number
}

export const keyPrefix = "apiRequest-"

export async function apiRequest<
  Data = never,
  Params = unknown,
  Body = unknown,
>({
  method,
  params,
  path,
  body,
}: {
  method: string
  params?: Params
  path: string
  body?: Body
}): Promise<{ data: Data | null; error: Error | null }> {
  
}

export function stringifyQuery(
  input: Record<string, string | null | undefined>,
): string {
  const output: string[] = []

  for (const [key, value] of Object.entries(input)) {
    if (typeof value !== "undefined" && value !== null) {
      output.push(`${key}=${value}`)
    }
  }

  return output.join("&")
}
