import { apiRequest } from "../api"
import { ApiResponse } from "../interfaces"
import { City, State } from "./interfaces"

export async function getStates(): Promise<ApiResponse<State[]>> {
    const { data, error } = await apiRequest<ApiResponse<State[]>>({
        method: "GET",
        path: "/states",
    })

    return {
        data: data?.data || null,
        error: error,
    }
}