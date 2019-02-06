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
- Show completed order in UI

## Creating the Order Service

```bash
ng g service order/order
```

### Writing the Interfaces

We'll need two interfaces - one to describe the order, one to describe items in the order. Write and export `Order` and `Item` inferfaces representing these objects in the new service.

```typescript
let myorder = {
  _id: 'a123123bdd',
  name: 'Jennifer', 
  address: '123 Main st', 
  phone: '867-5309'
  status: 'new',
  items: [
    {
      name: 'tacos',
      price: 6.99
    }
  ]
}
```

<details>
<summary>Click to see solution</summary>
__src/app/order/order.service.ts__

@sourceref ./order-1.service.ts
</details>

## Adding Methods

With our order service we'll want to be able to create new orders, updating existing orders, delete orders, and view all orders. Implement a `getOrders` method that makes a get request to `'/api/orders'`. Don't forget to import HttpClient into this service!

<details>
<summary>Click to see solution</summary>

Don't worry, we did the heavy lifting for the rest of the methods ;)

__src/app/order/order.service.ts__
@sourceref ./order-2.service.ts
@highlight 2, 23, 25-27, 29-33, 35-39, 40-43
</details>

## Importing the Service into the Order Component

This is what the markup will look like to show a created order:

__src/app/order/order.component.html__

@sourceref ./order.component.html
@highlight 2-34

Now, import your order service into your order component, and implement the functionality to create a new order, and show the completed order upon a successful order creation. Don't forget to use the interfaces you created for order and item types!

__src/app/order/order.component.ts__
@sourceref ./order.component.ts

<details>
<summary>Click to see solution</summary>

__src/app/order/order.component.ts__
@sourceref ./order.component-solution.ts
@highlight 7, 30, 38, 71, 78-85

</details>

If you've implemented everything correctly, you should now be able to create an order from the UI and see a record of your completed order once it's created.


