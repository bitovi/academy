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



