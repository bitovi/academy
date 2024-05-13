const baseUrl = process.env.PMO_API

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
