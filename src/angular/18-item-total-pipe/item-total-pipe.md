@page learn-angular/item-total-pipe Item Total Pipe
@parent learn-angular 18

@description Write an Item Total Pipe to help manage item totals calculation across our application.
@body

## Overview

In this part, we will:

- Create a new pipe called item totals
- Pipe will take an array of item and transform it to the sum of all prices

## Problem

Now that our app is functioning as expected, and we are almost done with the development process.
You might have noticed we are repeating the-same code to calculate the total prices of our items.
We can simplify this by creating an item total pipe which we will use in `order-component.ts` file and use it in the `order-history-component.html` file, to help transform any array of items and return the total sum of the price of each item.

# What You Need to Know
- Generate a pipe using Angular Cli  (you previously learned this in the <a href="/academy/academy/learn-angular/creating-pipes.html">pipe</a>creating section! ✔️)
- Provide the newly generated pipe to the whole application, so it can be used in the component.

## Generating Pipe
✏️ Run the following to generate the __Pipe__ and the test files:

```bash
ng g pipe itemTotal
```

## Provide Pipe Globally
Unlike services, pipes and not readily injectable into our components. In other for you to use them in a component you have to provide or inject it into our application globally. 
To provide the __Pipe__ you just created to the whole application, simple add the pipe to the provider array in the `app.module.ts` file.

✏️ Update __src/app/app.module.ts__. Once you're done, don't forget to restart the server!

@sourceref ./app.module.ts
@highlight 26, 35, only

Now the pipe would be available to be used in components across the application <a href="https://angular.io/guide/providers" target="\_blank">`Providers`</a>.
Below is a simple representation on how angular provides and injected pipe into any part of the application where its used.

@sourceref ./understanding-how-pipes-are-provided.html
@codepen
@highlight 14-22, 24-27, 37, only

## How to Verify Your Solution is Correct

✏️ Update the order spec file __src/app/order/order.component.spec.ts__ to include and provide the new pipe:

@sourceref ./order.component.spec.ts
@highlight 12, 109, only

✏️ Update the spec file  __item-total.pipe.spec.ts__ to be:

@sourceref ./item-total.pipe.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## Solution
✏️ Update __src/app/item-total.pipe.ts__ to:

@sourceref ./item-total.pipe.ts

✏️ Update __src/app/order/list/list.component.html__ to use the item total pipe:

@diff ../17-order-history-component/list.component.html ./list.component.html only.

✏️ Update __src/app/order/list/list.component.html__ to use the item total pipe:

@diff ../17-order-history-component/list.component.html ./list.component.html only