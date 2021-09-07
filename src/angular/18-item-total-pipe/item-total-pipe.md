@page learn-angular/item-total-pipe Item Total Pipe
@parent learn-angular 18

@description Write an Item Total Pipe to help manage item total calculation across our application.
@body

## Overview

In this part, we will:

- Create a new Pipe called Item Totals
- Use Angular Default Currency Pipe

## Problem

Now that our application is coming together nicely, you might have noticed we are repeating the same code to calculate the total prices of our items.
We can simplify this by creating an Item Total Pipe which we will use in `order-component.ts` file and in the `order-history-component.html` file. The pipe will transform an array of items and return the total sum of the price of each item.


# What You Need to Know

How to:

- Generate a Pipe using Angular Cli  (you previously learned this in the <a href="/academy/academy/learn-angular/creating-pipes.html">Creating Pipes</a> section! ✔️)
- Provide a Pipe globally to the entire application, so it can be used in any component

## Generating Pipe
✏️ Run the following to generate the __Pipe__ and the test files:

```bash
ng g pipe itemTotal
```

## Provide Pipe Globally
Unlike services, Pipes are not readily injectable into our components. In order to be able to use Pipes in a component, it has to be provided to the application globally. 
To provide the __Pipe__ just created to the entire application, simply add the Pipe to the provider array in the `app.module.ts` file. [Learn More](https://angular.io/guide/providers)

✏️ Update __src/app/app.module.ts__

@sourceref ./app.module.ts
@highlight 26, 35, only

Now the Pipe is available to be used in components across the application <a href="https://angular.io/guide/providers" target="\_blank">Providers</a>.

The example below shows how to provide a Pipe globally in Angular. The Pipe being created will transform two separate words into one compound word. It will take a string value, then a parameter, that is used as a prefix to the string value.

@sourceref ./understanding-how-pipes-are-provided.html
@codepen
@highlight 14-22, 27, 29, 39, 51, 53, only

## How to Verify Your Solution is Correct

✏️ Update the order spec file __src/app/order/order.component.spec.ts__ to include and provide the new Pipe:

@sourceref ./order.component.spec.ts
@highlight 12, 109, only

✏️ Update the spec file  __item-total.pipe.spec.ts__ to be:

@sourceref ./item-total.pipe.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## Solution

✏️ Update __src/app/item-total.pipe.ts__ to:

@sourceref ./item-total.pipe.ts

✏️ Update __src/app/order/order.component.ts__ to use the item total Pipe:

@sourceref ./order.component-solution.ts
@highlight 10, 42, 75, only

✏️ Update __src/app/order/list/list.component.html__ to use the item total Pipe:

@diff ../17-order-history-component/list.component.html ./list.component.html only

## Using Currency Pipe

Now that we have finished implementing our Item Total Pipe, this is a good time for us to talk about using Currency Pipe. You might have noticed that our prices are in USD, which is a currency, and is a perfect use for the Currency Pipe.
Angular provides us with a [Currency Pipe](https://angular.io/api/common/CurrencyPipe) that formats a number as currency using locale rules. Locale Rules refers to a user's country or region specific details like currency, language and more.

# What You Need to Know

How to:

- Apply a Pipe (you previously learned this ✔️)
- Set a default Currency Code

Like all the other Pipe we have created, the Currency Pipe can be used the exact same way.
Add the Currency Pipe to the `order.component.html` , `menu-items.component.html` and `list.component.html`:

✏️ Update __src/app/order/order.component.html__ to use the Currency Pipe:

@diff ../14-building-order-form/order.component-final.html ./order.component-currency-pipe.html only

✏️ Update __src/app/order/list/list.component.html__ to use the currency Pipe:

@diff ./list.component.html ./list.component-currency.html only

✏️ Update __src/app/order/menu-items/menu-items.component.html__ to use the Currency Pipe:
@diff ../14-building-order-form/child-component/menu-items-1.component.html ./menu-items-1.component-currency.html only

## Set Default Currency Code

In our application we want to have a default currency regardless of what country or language the user is accessing our application from. 
To do this, simply provide the default currency you want use in the entire application (we previously discussed how to implement this).

✏️ Update __app.module.ts__ to provide currency code:

@diff ./app.module.ts ./app.module-currency-pipe.ts only