@page learn-angular/order-service Order Service
@parent learn-angular 16

@description Writing the Order Service
@body

## Overview

In this part, we will:

- Create a new order service
- Write interfaces to describe orders and items in orders
- Add data methods to our service
- Import our new order service to our component & create an order
- Show completed order in UI

## Problem 1: Create Order Service and Export Items and Order interfaces

We need to create a new service to handle creating and updating orders. We’ll need three interfaces - one to describe the order form data, one to describe the order, and one to describe items in the order.

## P1: Technical requirements

Create a new service `order` in the order directory, and write and export `CreateOrderDto`, `Order` and `Item` interfaces representing these objects in the new service:

```typescript
const createOrderDto = {
  restaurant: "12345",
  name: "Jennifer",
  address: "123 Main st",
  phone: "867-5309",
  items: [
    {
      name: "tacos",
      price: 6.99,
    },
  ],
};

const order = {
  _id: "a123123bdd",
  restaurant: "12345",
  name: "Jennifer",
  address: "123 Main st",
  phone: "867-5309",
  status: "new",
  items: [
    {
      name: "tacos",
      price: 6.99,
    },
  ],
};
```

## P1: What you Need to Know

- How to create services (you learned this in previous sections! ✔️)
- How to write interfaces (you learned this in previous sections! ✔️)

  ```bash
    ng g service order/order
  ```

## P1: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/order/order.service.ts**

@sourceref ./order.service-interfaces.ts
@highlight 3-6, 8-14, 16-24

</details>

## Problem 2: Finish the Order Service

With our order service we’ll want to be able to create new orders, updating existing orders, delete orders, and view all orders.

## P2: Setup

✏️ Paste the following into **src/app/order/order.service.spec.ts**:

@sourceref ./2-order.service.spec.ts

Now, try to understand what this test is doing and
implement the remainder of `order.service.ts` to
get the tests to pass.

✏️ Run your tests with:

```shell
ng test
```

## P2: What you need to know

- The method signatures for the methods you’ll be adding to `OrderService`:
  - `getOrders(): Observable<{data: Order[]}>` should make a `GET` request
  - `createOrder(order: CreateOrderDto): Observable<Order>` should make a `POST` request
  - `updateOrder(order: Order, action: string): Observable<Order>` should make a `PUT` request to `/orders/<order-id>`
  - `deleteOrder(id: string): Observable<Order>` should make a `DELETE` request to `/orders/<order-id>`
- You will need to make sure `HttpClient` is imported and
  added as a property in the `OrderService` constructor.
- You can pass a request `body` using the second argument of `HttpClient` `post` and `put` methods.

## P2: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/order/order.service.ts**
@diff ./order.service-interfaces.ts ./order-2.service.ts only

</details>

## Problem 3: Use the OrderService in the OrderComponent to Create an Order

## P3: Technical requirements

For this problem, we will:

- Create an order when the user submits the form using the service.
- Disable the button while the order is being processed.
- Show the completed order to the user.
- Let the user start a new order.

How we will solve this:

1. We will import the order service, and save it as `orderService` in the
   `OrderComponent`’s `constructor`.
2. Call `orderService`’s `createOrder` with the `orderForm`’s values.
3. While the order is being created `orderProcessing` should be `true`.
4. Once complete, `orderComplete` should be set to `true`
   and set back to `false` when `startNewOrder()` is called.
5. We will save the completed order in `completedOrder`.

> A FormGroup’s `value` property is wrapped in `Partial` type because controls are removed from the form’s value when disabled. For our case, we don’t need to disable controls. We can use a FormGroup’s `getRawValue()` method to access its value with the full type.

## P3: Setup

Before starting:

1\. ✏️ Update **src/app/order/order.component.html** to show the completed order:

@diff ../15-directive/order.component.directive.html ./order.component.html only

2\. ✏️ Update **src/app/order/order.component.ts** to have a `onSubmit` method and
a `startNewOrder` that will start a new order.

@diff ../14-building-order-form/child-component/order-2.component.ts ./order.component.ts only

## P3: How to verify your solution is correct

If you’ve implemented everything correctly, you should now be able to create an order from the UI and see a record of your completed order once it’s created.

✏️ Update the menu-items spec file **src/app/order/order.component.spec.ts** to be:

@diff ../14-building-order-form/order.component.spec-final.ts ./order.component.spec.ts only

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

## P3: What you need to know

- How to import a service
- How to call a method on a service and get the result
- How to show/hide content using \*ngIf

## P3: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/order/order.component.ts**
@diff ./order.component.ts ./order.component-solution.ts only

</details>
