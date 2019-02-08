@page angular/order-history-component Order History Component
@parent angular 15

@description Writing the Order History Component
@body

## Overview

In this part, we will:

- Create a new order history component
- Get all orders from our order service
- Create a child component to handle different states of orders
- Create ways to update and delete orders in the view
- Add order history link to our main navigation

## Exercise: Generate a `HistoryComponent` and route to it

### The problem

In this problem, we will:

- Generate a `HistoryComponent` in `src/app/order/history/history.component.ts`
- Show `HistoryComponent` when we navigate to `/order-history`

When complete, you should be able to navigate to [http://localhost:4200/order-history](http://localhost:4200/order-history) and see _'history works!'_.

### What you need to know


You got this already, but just in case, here's some hints:

- How to generate a component
  ```shell
  ng g component PATH
  ```
- Update `app-routing.module.ts` to import the component you want and create a path to it.

---

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

---

### The solution

__src/app/app.component.html__

@sourceref ./app.component.html
@highlight 11-13,only

You should now be able to navigate to <a href="http://localhost:4200/order-history" target="\_blank">http://localhost:4200/order-history</a> and see a list of all orders.


## Exercise: List all orders

### The problem

In this exercise, we will:

- List all orders in the `HistoryComponent`.
- Make sure the `<div>` for each order has a class name of _'order'_ and the `order.status` value.


In this component, we want to see a history of all orders. Import the order service into this new component and make the call to get all orders.

__src/app/order/history.component.ts__

@sourceref ./history.component.ts

### What you need to know

- how to import a service
- how to subscribe to a method on a service

---

### The solution

__src/app/order/history.component.ts__

@sourceref ./history.component-solution.ts
@highlight 2, 22, 31-35


__src/app/order/history.component.html__

@sourceref ./history.component-1.html

## Creating a Child Component to Handle Order States

Orders can have states of new, preparing, delivery, and delivered, and we want to have different actions to take in the UI based on an orders status. Let's refactor the UI displaying all the orders into a new component. This new component will take a variety of different inputs:
- orders: an array of orders based on status property
- listTitle: "NewOrders"/"Preparing"/"Out for Delivery"/"Delivery"
- status: "new"/"preparing"/"delivery"/"delivered"
- statusTitle: "New Order!"/"Preparing"/"Out for delivery"/"Delivered"
- action: "preparing"/"delivery"/"delivered"
- actionTitle: "preparing"/"Out for delivery"/"Delivered"
- emptyMessage: "No new orders"/"No orders preparing"/"No orders are being delivered"/"No delivered orders"

```bash
ng g component order/list
```

The markup will look like this:

__src/app/order/list.component.html__

@sourceref ./list.component.html

### The Problem

Update this component to:
- take the above list of inputs
- have three methods
  - `markAs(order, action)` that will update an order based on the action
  - `delete(order._id)` that will delete an order
  - `total(items)` that will return the order total
- have an `isPending` member that gets set before and after actions are performed

You'll need to import `Input` from angular core, as well as `OrderService` and relevant interfaces to handle updating and deleting your orders.

### What you need to know

- set inputs on a component
- call methods on a service
- update a boolean member to show/hide content

---

### The solution

__src/app/order/list.component.ts__

@sourceref ./list.component.ts
@highlight 6

### The problem

Refactor your `src/app/order/history.component.html` file to use the new list component for each order subgroup: new orders, preparing orders, delivery orders, delivered orders.


### What you need to know

- How to pass properties to child components

---

### The solution

__src/app/order/history.component.html__

@sourceref ./history.component.html


Now as you click the actions of the orders and refresh the page, you can see their updated statuses. Next we'll use Socket.io to capture the events and instantly update the ui.
