export async function apiRequest<Data = never>({
    method,
    path,
}: {
    method: string
    path: string
}): Promise<{ data: Data | null, error: Error | null }> {
}