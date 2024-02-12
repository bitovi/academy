import { apiRequest } from "../api"
import { ApiResponse } from "../interfaces"
import { City, Restaurant, State } from "./interfaces"

export async function getCities(
    state: string,
): Promise<ApiResponse<City[]>> {
    const { data, error } = await apiRequest<ApiResponse<City[]>>({
        method: "GET",
        path: "/cities",
        params: {
            state: state
        },
    })

    return {
        data: data?.data || null,
        error: error,
    }
}

export async function getRestaurant(
    slug: string,
): Promise<ApiResponse<Restaurant>> {
    const { data, error } = await apiRequest<Restaurant>({
        method: "GET",
        path: `/restaurants/${slug}`,
    })

    return {
        data: data,
        error: error,
    }
}

export async function getRestaurants(
    state: string,
    city: string,
): Promise<ApiResponse<Restaurant[]>> {
    const { data, error } = await apiRequest<ApiResponse<Restaurant[]>>({
        method: "GET",
        path: "/restaurants",
        params: {
            "filter[address.state]": state,
            "filter[address.city]": city,
        },
    })

    return {
        data: data?.data || null,
        error: error,
    }
}

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