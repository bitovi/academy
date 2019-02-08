@page angular/order-service Order Service
@parent angular 14

@description Writing the Order Service
@body

## Overview

In this part, we will:

- Get your tests to pass again.
- Create a new order service
- Write interfaces to describe orders and items in orders
- Add data methods to our service
- Import our new order service to our component & create an order
- Show completed order in UI


## Get tests working again

Update the following two files to get all tests passing again:

__src/app/order/order.component.spec.ts__

@sourceref ./1-order.component.spec.ts

__src/app/restaurant/detail/detail.component.spec.ts__

@sourceref ./1-detail.component.spec.ts

Run the following to confirm:

```shell
ng test
```

## Creating the Order Service

```bash
ng g service order/order
```

## Exercise: Export Items and Order interfaces

### The Problem

We'll need two interfaces - one to describe the order, one to describe items in the order. Write and export `Order` and `Item` interfaces representing these objects in the new service.

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

### What you need to know

- How to write interfaces!

---

### The solution

__src/app/order/order.service.ts__

@sourceref ./order-1.service.ts

## Exercise: Finish the order service

### The Problem

With our order service we'll want to be able to create new orders, updating existing orders, delete orders, and view all orders.

Paste the following into __src/app/order/order.service.spec.ts__:

@sourceref ./2-order.service.spec.ts

Now, try to understand what this test is doing and
implement the remainder of `order.service.ts` to
get the tests to pass.

Run your tests with:

```shell
ng test
```

### What you need to know

- You will need to look at the test code to determine
  the method signatures on `OrderService`.
- You will need to make sure `HttpClient` is imported and
  added as a property in the  `OrderService` constructor.

### The solution

Don't worry, we did the heavy lifting for the rest of the methods ;)

__src/app/order/order.service.ts__
@sourceref ./order-2.service.ts
@highlight 2, 23, 25-27, 29-33, 35-39, 40-43

## Importing the Service into the Order Component

This is what the markup will look like to show a created order:

__src/app/order/order.component.html__

@sourceref ./order.component.html
@highlight 2-34

### The Problem

Now, import your order service into your order component, and implement the functionality to create a new order, and show the completed order upon a successful order creation. Don't forget to use the interfaces you created for order and item types!

__src/app/order/order.component.ts__
@sourceref ./order.component.ts


### What you need to know

- how to import a service
- how to subscribe to a method on a service
- how to show/hide content using *ngIf

---

### The Solution

__src/app/order/order.component.ts__
@sourceref ./order.component-solution.ts
@highlight 7, 30, 38, 71, 78-85

If you've implemented everything correctly, you should now be able to create an order from the UI and see a record of your completed order once it's created.
