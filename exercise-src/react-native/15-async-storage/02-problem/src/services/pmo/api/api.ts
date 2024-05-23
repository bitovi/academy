import { getData, storeData } from "../../storage"

const baseUrl = process.env.PMO_API

export interface CachedResponse<T> {
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
}): Promise<{ data: Data | undefined; error: Error | undefined }> {
  try {
    const query = params ? stringifyQuery(params) : ""
    const requestUrl = `${baseUrl}${path}?${query}`

    if (method === "GET") {
      try {
        const cachedResponse = await getData<CachedResponse<Data>>(
          keyPrefix + requestUrl,
        )

        if (cachedResponse) {
          const diff = Date.now() - cachedResponse.dateTime
          // Return cached data if it’s younger than one minute
          if (diff < 60000) {
            return {
              data: cachedResponse.data,
              error: undefined,
            }
          }
        }
      } catch (error) {
        console.error("Failed to get cached value:", error)
      }
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
      ? undefined
      : new Error(`${response.status} (${response.statusText})`)

    if (method === "GET" && response.ok) {
      await storeData<CachedResponse<Data>>(keyPrefix + requestUrl, {
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
      data: undefined,
      error:
        error instanceof Error ? error : new Error("An unknown error occurred"),
    }
  }
}

export function stringifyQuery(
  input: Record<string, string | undefined | undefined>,
): string {
  const output: string[] = []

  for (const [key, value] of Object.entries(input)) {
    if (typeof value !== "undefined" && value !== null) {
      output.push(`${key}=${value}`)
    }
  }

  return output.join("&")
}
