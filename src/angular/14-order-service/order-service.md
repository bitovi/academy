@page angular/order-service Order Service
@parent angular 14

@description Writing the Order Service
@body

## Overview

In this part, we will:

- Create a new order service
- Write interfaces to describe orders and items in orders
- Add methods to our service
- Import our new order service to our component & create an order

## Creating the Order Service

```bash
ng g service order/Order
```

### Writing the Interfaces

__src/app/order/order.service.ts__

```typescript
import { Injectable } from '@angular/core';

export interface Item {
  name: string;
  price: number;
}

export interface Order {
  _id: string;
  name: string;
  address: string;
  phone: string;
  status: string;
  items: Array<Item>;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

}
```

## Adding Methods

With our order service we'll want to be able to create new orders, updating existing orders, delete orders, and view all orders. 

__src/app/order/order.service.ts__
@sourceref ./order.service.ts
@highlight 2, 23, 25-27, 29-33, 35-39, 40-43

## Importing our Service into our Component

__src/app/order/order.component.ts__
@sourceref ./order.component.ts
@highlight 7, 30, 38, 71, 78-85