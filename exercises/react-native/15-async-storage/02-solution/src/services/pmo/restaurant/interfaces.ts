export interface City {
  name: string
  state: string
}

export interface Item {
  name: string
  price: number
}

interface Menu {
  dinner: Item[]
  lunch: Item[]
}

interface Address {
  city: string
  state: string
  street: string
  zip: string
}

interface Images {
  banner: string
  owner: string
  thumbnail: string
}

interface Coordinate {
  latitude: number
  longitude: number
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

export interface State {
  name: string
  short: string
}
