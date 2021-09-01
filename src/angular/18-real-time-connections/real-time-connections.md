@page learn-angular/real-time-connection Real Time Connections
@parent learn-angular 18

@description Updating Order History View with Real Time Connection
@body

## Overview

In this part, we will:

- Install socket.io
- Import and initialize socket.io
- Create an environment variable
- Update list view on socket events.

## P1: How to Verify Your Solution is Correct

If you've implemented the solution correctly you should now be able to navigate to <a href="http://localhost:4200/order-history" target="\_blank">http://localhost:4200/order-history</a> and see orders be created, updated or removed without refreshing the page!

✏️ Update __src/app/order/history.component.spec.ts__

@sourceref ./history.component.spec.ts

## Install NGX Socket.io Module

```bash
npm install --save ngx-socket-io
```

## Import and Configure Socket.io

✏️ Update __src/app/app.module.ts__ to:

@sourceref ./app.module.ts
@highlight 18-20,40,only

<!-- This polyfill doesn't seem neccesary for Angular 10, but the bug is still open and doesn't mention Angular 9+, so I'm leaving this here until the issue is actually resolved.
     Bug report: https://github.com/socketio/socket.io-client/issues/1206 
-->

<!-- ## Use Polyfills

Currently there's a bug with the latest CLI verion when using socket.io. Until it's fixed, we can use polyfills.

✏️ Update __src/polyfills.ts__ to:

@sourceref ./polyfills.ts
@highlight 20, only
-->

## Listen to Socket Events

 We'll use `apiUrl` for our Socket.io connection, and listen for `orders created`, `order updated`, and `orders deleted` events to change our list on:

✏️ Update __src/app/order/history.component.ts__

 @diff ../17-order-history-component/history.component-solution.ts ./history.component.ts only


Now as we create, update, and delete orders we can see them updated in real time across different browser tab instances!
