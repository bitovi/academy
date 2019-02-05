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

## Creating Order History Component

```bash
ng g component order/history
```

__src/app/order/history.component.ts__

@sourceref ./history.component.ts
@highlight 2, 22, 31-35

__src/app/order/history.component.html__

@sourceref ./history.component.html

## Creating a Child Component to Handle Order States

Orders can have states of new, preparing, delivery, and delivered, and we want to have different actions to take in the UI based on an orders status. This new component will take a variety of different data sources.

```bash
ng g component order/list
```

__src/app/order/list.component.html__

@sourceref ./list.component.html

__src/app/order/list.component.ts__

@sourceref ./list.component.ts
@highlight 6

## Add Order History Route

__src/app/app-routing.module.ts__

@sourceref ./app-routing.module.ts
@highlight 8, 27-30

## Adding Order History to Main Navigation

Finally, let's add the order history path to the navigation. 

__src/app/app.component.html__

@sourceref ./app.component.html
@highlight 11-13

You should now be able to navigate to <a href="http://localhost:4200/order-history" target="_blank">http://localhost:4200/order-history</a>. 
