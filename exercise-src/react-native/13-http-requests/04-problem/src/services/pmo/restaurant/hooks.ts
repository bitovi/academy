import { useEffect, useState } from "react"
import { apiRequest } from "../api"
import type { City, Restaurant, State } from "./interfaces"

interface CitiesResponse {
  data: City[] | null
  error: Error | null
  isPending: boolean
}

interface RestaurantResponse {
  data: Restaurant | null
  error: Error | null
  isPending: boolean
}

interface RestaurantsResponse {
  data: Restaurant[] | null
  error: Error | null
  isPending: boolean
}

interface StatesResponse {
  data: State[] | null
  error: Error | null
  isPending: boolean
}

export function useCities(state: string): CitiesResponse {

}

export function useRestaurant(slug: string): RestaurantResponse {
  
}

export function useRestaurants(
  state: string,
  city: string,
): RestaurantsResponse {
  
}

export function useStates(): StatesResponse {
 
}
