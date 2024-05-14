import { Restaurant } from "../../services/pmo/restaurant"

export const restaurantWithoutAddress: Restaurant = {
  _id: "3ZOZyTY1LH26LnVw",
  images: {
    banner: "banner-image.jpg",
    owner: "owner-image.jpg",
    thumbnail: "thumbnail-image.jpg",
  },
  menu: {
    lunch: [
      {
        name: "Crab Pancakes with Sorrel Syrup",
        price: 35.99,
      },
      {
        name: "Steamed Mussels",
        price: 21.99,
      },
      {
        name: "Spinach Fennel Watercress Ravioli",
        price: 35.99,
      },
    ],
    dinner: [
      {
        name: "Gunthorp Chicken",
        price: 21.99,
      },
      {
        name: "Herring in Lavender Dill Reduction",
        price: 45.99,
      },
      {
        name: "Chicken with Tomato Carrot Chutney Sauce",
        price: 45.99,
      },
    ],
  },
  coordinate: { latitude: 0, longitude: 0 },
  name: "Test Restaurant",
  slug: "poutine-palace",
}

export const restaurantWithAddress: Required<Restaurant> = {
  ...restaurantWithoutAddress,
  address: {
    street: "123 Test St",
    city: "Testville",
    state: "TS",
    zip: "12345",
  },
}
