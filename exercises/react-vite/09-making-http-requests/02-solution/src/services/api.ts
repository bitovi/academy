export async function apiRequest<Data = never>({
    method,
    path,
}: {
    method: string
    path: string
}): Promise<{ data: Data | null, error: Error | null }> {
    try {
        const response = await fetch(`${import.meta.env.VITE_PMO_API}${path}`, {
            method,
        })

        const data = await response.json()
        const error = response.ok ? null : new Error(`${response.status} (${response.statusText})`)

        return {
            data: data,
            error: error,
        }
    } catch (error) {
        return {
            data: null,
            error: error instanceof Error ? error : new Error('An unknown error occurred'),
        }
    }
}