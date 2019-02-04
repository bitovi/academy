@page angular/real-time-connection Real Time Connections
@parent angular 16

@description Updating Order History View with Real Time Connection
@body

## Overview

In this part, we will:

- Install socket.io
- Import and initialize socket.io
- Create an environment variable
- Update list view on socket events. 

## Installing Socket.io

```bash
npm install --save socket.io-client@2.2.0
npm install --save @types/socket.io-client
```

## Importing and Initializing Socket.io

We can import JavaScript libraries that haven't been written into Angular modules and reference them using '*'.

```typescript
import * as io from 'socket.io-client';
```

We need to tell Socket.io where to listen for changes. Locally this is localhost:7070 - where our API is running, but that's not what it will be in production. Angular makes handling this situation easy, we can simply add an environment variable. 

Open `src/environments/environment.ts` and change it to:

@sourceref ./environment.ts 
 
 We'll use `apiUrl` for our Socket.io connection, and listen for `orders created`, `order updated`, and `orders deleted` events to change our list on:

__src/app/order/history.component.ts__

 @sourceref ./history.component.ts
 @highlight 4, 5, 22, 27, 33-35, 37-41, 43-46

Now as we create, update, and delete orders we can see them updated in real time across different browser tab instances!
