@page angular-training/order-service Order Service
@parent angular-training 14

@description Writing the Order Service
@body

## Overview

In this part, we will:

- Create a new order service
- Write interfaces to describe orders and items in orders
- Add data methods to our service
- Import our new order service to our component & create an order
- Show completed order in UI

## Exercise: Create Order Service and Export Items and Order interfaces

### The Problem

We need to create a new service to handle creating and updating orders. We'll need two interfaces - one to describe the order, one to describe items in the order. Create a new service `order` in the order directory, and write and export `Order` and `Item` interfaces representing these objects in the new service:

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

- How to create services (you learned this in previous sections! ✔️)
- How to write interfaces (you learned this in previous sections! ✔️)

  ```bash
    ng g service order/order
  ```

### The solution

__src/app/order/order.service.ts__

@sourceref ./order.service-interfaces.ts
@highlight 3-6, 8-15

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

__src/app/order/order.service.ts__
@sourceref ./order-2.service.ts
@highlight 2, 23, 25-27, 29-33, 35-39, 40-43, only

## Exercise: Using the order service in the order component

### The Problem

For this problem, we will:

- Create an order when the user submits a service.
- Disable the button while the order is being processed.
- Show the completed order to the user.
- Let the user start a new order.

How we will solve this:

- We will import the order service, and save it as `orderService` in the
  `OrderComponent`'s `constructor`.
- Call `orderService`'s `createOrder` with the `orderForm`'s values.
- While the order is being created `orderProcessing` should be `true`.
- Once complete, `orderComplete` should be set to `true`
  and set back to `false` when `.startNewOrder()` is called.
- We will save the completed order in `completedOrder`.

Before starting:

1\. Update __src/app/order/order.component.html__ to show the completed order:

@sourceref ./order.component.html
@highlight 2-34,only

2\. Update __src/app/order/order.component.ts__ to have a `onSubmit` method and
    a `startNewOrder` that will start a new order.

@sourceref ./order.component.ts
@highlight 76-85,only


### What you need to know

- how to import a service
- how to call a method on a service and get the result
- how to show/hide content using \*ngIf

----

### The Solution

__src/app/order/order.component.ts__
@sourceref ./order.component-solution.ts
@highlight 7, 30, 38, 71, 78-85,only

If you've implemented everything correctly, you should now be able to create an order from the UI and see a record of your completed order once it's created.

### Update Order Component Tests

Update the order spec file  __src/app/order/order.component.spec.ts__ to be:

@sourceref ./order.component.spec.ts