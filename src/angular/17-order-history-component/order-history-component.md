@page learn-angular/order-history-component Order History Component
@parent learn-angular 17

@description Writing the Order History Component
@body

## Overview

In this part, we will:

- Create a new order history component
- Get all orders from our order service
- Create a child component to handle different states of orders
- Create ways to update and delete orders in the view
- Add order history link to our main navigation

## Problem 1: Generate a `HistoryComponent` and create a route for it

We want to create a component that will show the app's order history.

## P1: Technical Requirements

1. Generate a `HistoryComponent` in `src/app/order/history/history.component.ts`
2. Show `HistoryComponent` when we navigate to `/order-history`

## P1: How to Verify Your Solution is Correct

If you've implemented the solution correctly you should be able to navigate to [http://localhost:4200/order-history](http://localhost:4200/order-history) and see _'history works!'_.

✏️ Update the spec file **src/app/app.component.spec.ts** to be:

@diff ../14-building-order-form/app.component.spec.ts ./app.component.spec.ts only

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## P1: What you need to know

You got this already, but just in case, here's some hints:

- How to generate a component
  ```shell
  ng g component PATH
  ```
- Update `app-routing.module.ts` to import the component you want and create a path to it.

## P1: solution

<details>
<summary>Click to see the solution</summary>
✏️ First, run:

```bash
ng g component order/history
```

Then route to the component:

✏️ Update **src/app/app-routing.module.ts**

@sourceref ./app-routing.module.ts
@highlight 4, 26-29, only

</details>

## Problem 2: Add `HistoryComponent` to navigation

We want a user to be able to navigate to the HistoryComponent via a link in the main navigation.

## P2: Technical Requirements

1. Add a **Order History** link to the navigation bar at the top of the page.
2. Add the class name `active` to the link if we are on the `OrderHistory` page.

## P2: What You Need to Know

You've seen this before. Checkout how the **Home** link works in
`app.component.html`.

## P2: How to Verify Your Solution is Correct

If you've implemented the solution correctly you should now be able to navigate to <a href="http://localhost:4200/order-history" target="\_blank">http://localhost:4200/order-history</a> and see a list of all orders.

## P2: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/app.component.html**

@diff ../5-creating-navigation/app.component.html ./app.component.html

</details>

## Problem 3: List All Orders

We want to be able to see a list of all created orders and their varying statuses of "new", "preparing", "delivery", and "delivered".

## P3: Technical Requirements

1. List all orders in the `HistoryComponent`.
2. Make sure the `<div>` for each order has a class name of _'order'_ and a class name that is the `order.status` value. Make sure you've created a new order.

## P3: Setup

1\. ✏️ Copy the following into **src/app/order/history/history.component.ts**. You will fill out its
`getOrders` method. The getters `newOrders`, `preparingOrders`, `deliveryOrders`, and `deliveredOrders` will be used later.

@sourceref ./history.component.ts
@highlight 18,22

2\. ✏️ Copy the following into **src/app/order/history/history.component.html**. You will need to
iterate through orders and add the right class names to the outer `<div>` for each order.

@sourceref ./0-history.component.html
@highlight 9,10

## P3: How to Verify Your Solution is Correct

✏️ Update the menu-items spec file **src/app/order/history/history.component.spec.ts** to be:

@sourceref ./history.component-1.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## P3: What You Need to Know

- How to import a service and get data out of it. Hint: Import it and create a
  property in the constructor.
- How to loop through values in HTML. Hint: `*ngFor`.

For this step, you'll need to know how to add multiple class names. You can do this with
`[ngClass]` and setting it to an array like:

```html
<div [ngClass]="['first','second']"></div>
```

## P3: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/order/history.component.ts**

@diff ./history.component.ts ./history.component-solution.ts only

✏️ Update **src/app/order/history.component.html**

@diff ./0-history.component.html ./history.component-1.html

</details>

## Problem 4: Creating a Child Component to Handle Order States

We want to create a child component that will take a list of orders by status and display them, as well as actions a user can perform on an order.

## P4: Technical Requirements

1. Group the orders by status.
2. Allow the user to change the status of an order.
3. Allow the user to delete an order.

**NOTE!!** To see that an order has changed, you will have to refresh the page!

To solve this problem:

- Create a `ListComponent` in **src/app/order/list/list.component.ts** that will take a list
  of orders and other values like:
  ```html
  <pmo-list
    [orders]="newOrders"
    listTitle="New Orders"
    status="new"
    statusTitle="New Order!"
    action="preparing"
    actionTitle="Preparing"
    emptyMessage="No new orders"
  >
  </pmo-list>
  ```
- `ListComponent` will take the following values:
  - `orders` - an array of orders based on status property
  - `listTitle` - A title for the list: "NewOrders" , "Preparing" , "Out for Delivery" , "Delivery"
  - `status` - Which status the list is "new", "preparing", "delivery", "delivered"
  - `statusTitle` - Another title for the status: "New Order!", "Preparing", "Out for delivery", "Delivered"
  - `action` - What status items can be moved to: "preparing", "delivery", "delivered"
  - `actionTitle` - A title for the action: "Preparing", "Out for delivery", "Delivered"
  - `emptyMessage` - What to show when there are no orders in the list: "No new orders", "No orders preparing", "No orders are being delivered", "No delivered orders"
- `ListComponent` will have the following methods:
  - `markAs(order, action)` that will update an order based on the action
  - `delete(order._id)` that will delete an order
  - `total(items)` that will return the order total

## P4: Setup

1\. ✏️ Create the `ListComponent`:

```shell
ng g component order/list
```

2\. ✏️ Update **src/app/order/history.component.html** to use `<pmo-list>`:

@diff ./history.component-1.html ./history.component.html only

3\. ✏️ Update **src/app/order/list/list.component.html** to its final html:

@sourceref ./list.component.html

## P4: How to Verify Your Solution is Correct

✏️ Update **src/app/order/history/history.component.spec.ts** to be:

@diff ./history.component-1.spec.ts ./history.component-2.spec.ts only

✏️ Update **src/app/order/list/list.component.spec.ts** to be:

@sourceref ./list.component.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## P4: What You Need to Know

- How to add `@Input()`s to a component so it can be passed values.
- How to call methods on a service that you get from the `constructor`.

## P4: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/order/list.component.ts**

@sourceref ./list.component.ts
@highlight 2,11-17,19,23-39

</details>
