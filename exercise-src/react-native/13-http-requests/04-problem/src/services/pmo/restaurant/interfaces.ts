export interface State {
  name: string
  short: string
}

export interface City {
  name: string
  state: string
}

export interface Restaurant {
  _id: string
  address?: Address
  coordinate: Coordinate
  images: Images
  menu: Menu
  name: string
  slug: string
}

interface Address {
  city: string
  state: string
  street: string
  zip: string
}

interface Coordinate {
  latitude: number
  longitude: number
}

interface Images {
  banner: string
  owner: string
  thumbnail: string
}

interface Menu {
  dinner: MenuItem[]
  lunch: MenuItem[]
}

interface MenuItem {
  name: string
  price: number
}
