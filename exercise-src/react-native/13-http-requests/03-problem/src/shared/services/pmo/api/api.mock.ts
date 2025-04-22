export const apiRequest = async <
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
}): Promise<{ data?: Data; error?: Error }> => {
  return {}
}
