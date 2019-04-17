@page angular-training/order-history-component Order History Component
@parent angular-training 15

@description Writing the Order History Component
@body

## Overview

In this part, we will:

- Create a new order history component
- Get all orders from our order service
- Create a child component to handle different states of orders
- Create ways to update and delete orders in the view
- Add order history link to our main navigation

## Exercise: Generate a `HistoryComponent` and create a route for it

### The problem

In this problem, we will:

- Generate a `HistoryComponent` in `src/app/order/history/history.component.ts`
- Show `HistoryComponent` when we navigate to `/order-history`

### What you need to know


You got this already, but just in case, here's some hints:

- How to generate a component
  ```shell
  ng g component PATH
  ```
- Update `app-routing.module.ts` to import the component you want and create a path to it.

### To Verify Your Solution is Correct

If you've implemented the solution correctly you should be able to navigate to [http://localhost:4200/order-history](http://localhost:4200/order-history) and see _'history works!'_.

### The solution

First, run:

```bash
ng g component order/history
```

Then route to the component:

__src/app/app-routing.module.ts__

@sourceref ./app-routing.module.ts
@highlight 8, 27-30,only

## Exercise: Add `HistoryComponent` to navigation

### The Problem

In this problem, we will:

- Add a __Order History__ link to the navigation bar at the top of the page.
- Add the class name `active` to the link if we are on the `OrderHistory` page.

### What you need to know

You've seen this before. Checkout how the __Home__ link works in
`app.component.html`.

### To Verify Your Solution is Correct

If you've implemented the solution correctly you should now be able to navigate to <a href="http://localhost:4200/order-history" target="\_blank">http://localhost:4200/order-history</a> and see a list of all orders.

### The solution

__src/app/app.component.html__

@sourceref ./app.component.html
@highlight 11-13,only

## Exercise: List all orders

### The problem

In this exercise, we will:

- List all orders in the `HistoryComponent`.
- Make sure the `<div>` for each order has a class name of _'order'_ and the
  `order.status` value. Make sure you've created a new order.

Start this exercise by:

1\. Copying the following into __src/app/order/history.component.ts__. You will fill out its
`getOrders` method.  The getters `newOrders`, `preparingOrders`, `deliveryOrders`, and `deliveredOrders` will be used later.

@sourceref ./history.component.ts
@highlight 18,22

2\. Copy the following into __src/app/order/history.component.html__.  You will need to
iterate through orders and add the right class names to the outer `<div>` for each order.

@sourceref ./0-history.component.html
@highlight 9,10

### What you need to know

- How to import a service and get data out of it.  Hint: Import it and create a
  property in the constructor.
- How to loop through values in HTML.  Hint: `*ngFor`.

For this step, you'll need to know how to add multiple class names.  You can do this with
`[ngClass]` and setting it to an array like:

```html
<div [ngClass]="['first','second']">
```

### To Verify Your Solution is Correct

Update the menu-items spec file  __src/app/order/history/history.component.spec.ts__ to be:

@sourceref ./history.component-1.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### The solution

__src/app/order/history.component.ts__

@sourceref ./history.component-solution.ts
@highlight 2, 22, 31-35, only

__src/app/order/history.component.html__

@sourceref ./history.component-1.html
@highlight 9-10,only

## Exercise: Creating a Child Component to Handle Order States

### The problem

In this exercise, we will:

- Group the orders by status.
- Allow the user to change the status of an order.
- Allow the user to delete an order.

__NOTE!!__ To see that an order has changed, you will have to refresh the page!

To complete this we will:

- Create a `ListComponent` in __src/app/order/list/list.component.ts__ that will take a list
  of orders and other values like:
  ```html
  <pmo-list
    [orders]="newOrders"
    listTitle="New Orders"
    status="new"
    statusTitle="New Order!"
    action="preparing"
    actionTitle="Preparing"
    emptyMessage="No new orders">
    </pmo-list>
  ```
- `ListComponent` will take the following values:
  - `orders` - an array of orders based on status property
  - `listTitle` - A title for the list: "NewOrders" , "Preparing" , "Out for Delivery" , "Delivery"
  - `status` - Which status the list is "new", "preparing", "delivery", "delivered"
  - `statusTitle` - Another title for the status: "New Order!", "Preparing", "Out for delivery",  "Delivered"
  - `action` - What status items can be moved to: "preparing", "delivery", "delivered"
  - `actionTitle` - A title for the action: "Preparing", "Out for delivery", "Delivered"
  - `emptyMessage` - What to show when there are no orders in the list: "No new orders", "No orders preparing", "No orders are being delivered", "No delivered orders"
- `ListComponent` will have the following methods:
  - `markAs(order, action)` that will update an order based on the action
  - `delete(order._id)` that will delete an order
  - `total(items)` that will return the order total


Before staring, follow these steps:

1\. Create the `ListComponent`:

```shell
ng g component order/list
```

2\. Update __src/app/order/history.component.html__ to use `<pmo-list>`:

@sourceref ./history.component.html
@highlight 9-45,only


3\. Update __src/app/order/list/list.component.html__ to its final html:

@sourceref ./list.component.html



### What you need to know

You'll need to remember how to:

- Add `@Input()`s to a component so it can be passed values.
- Call methods on a service that you get from the `constructor`.

### The solution

__src/app/order/list.component.ts__

@sourceref ./list.component.ts
@highlight 2,11-17,19,23-39
