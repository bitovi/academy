import type { City } from './interfaces'

export function useCities(state: string): City[] {
  const cities = [
    { name: 'Madison', state: 'WI' },
    { name: 'Springfield', state: 'IL' },
  ]
  return cities.filter(city => {
    return city.state === state
  })
}