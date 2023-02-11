@page learn-angular/real-time-connection Real Time Connections
@parent learn-angular 19

@description Updating Order History View with Real Time Connection
@body

## Overview

In this part, we will:

- Install socket.io Client
- Update list view on socket events.

## P1: How to Verify Your Solution is Correct

If you've implemented the solution correctly you should now be able to navigate to <a href="http://localhost:4200/order-history">http://localhost:4200/order-history</a> and see orders be created, updated or removed without refreshing the page!

## Install Socket.io Client and Types

```bash
npm install --save socket.io-client@2
npm install --save-dev @types/socket.io-client@1
```

## Listen to Socket Events

We'll use `apiUrl` for our Socket.io connection, and listen for `orders created`, `order updated`, and `orders deleted` events to change our list on:

✏️ Update **src/app/order/history.component.ts**

@diff ../17-order-history-component/history.component-solution.ts ./history.component.ts only

Now as we create, update, and delete orders we can see them updated in real time across different browser tab instances!
