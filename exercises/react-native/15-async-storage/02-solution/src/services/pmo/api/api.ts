import { getData, storeData } from "../../storage"

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
  try {
    const query = params ? stringifyQuery(params) : ""
    const requestUrl = `${baseUrl}${path}?${query}`

    try {
      const cachedResponse = await getData<LocalStorageApiRequest<Data>>(
        keyPrefix + requestUrl,
      )

      if (cachedResponse) {
        const diff = Date.now() - cachedResponse.dateTime
        //Return Cached data if it's younger than one minute
        if (diff < 60000) {
          return {
            data: cachedResponse.data,
            error: null,
          }
        }
      }
    } catch (error) {
      console.error("Failed to get cached value:", error)
    }

    const response = await fetch(requestUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await response.json()
    const error = response.ok
      ? null
      : new Error(`${response.status} (${response.statusText})`)

    if (method === "GET" && response.ok) {
      storeData<LocalStorageApiRequest<Data>>(keyPrefix + requestUrl, {
        data: data,
        dateTime: Date.now(),
      })
    }

    return {
      data: data,
      error: error,
    }
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    }
  }
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
