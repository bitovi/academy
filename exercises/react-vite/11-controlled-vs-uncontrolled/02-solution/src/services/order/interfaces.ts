export interface Order {
    _id: string
    status: "new" | "preparing" | "delivery" | "delivered"
    restaurant: string
    name: string
    address: string
    phone: string
    items: OrderItem[]
  }
  
  export interface OrderItem {
    name: string
    price: number
  }