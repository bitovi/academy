import { ApiResponse } from "../interfaces"
import { State } from "./interfaces"

export async function getStates(): Promise<ApiResponse<State[]>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    { name: 'Illinois', short: 'IL' },
                    { name: 'Wisconsin', short: 'WI' },
                ],
                error: null
            })
        }, 1500)
    })
}