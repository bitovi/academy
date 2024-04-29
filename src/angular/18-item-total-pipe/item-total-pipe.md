@page learn-angular/item-total-pipe Item Total Pipe
@parent learn-angular 18

@description Write an Item Total Pipe to help manage item total calculation across our application.
@body

## Overview

In this part, we will:

- Create a new Pipe called Item Totals
- Use Angular Default Currency Pipe

## Problem 1: Implementing and Using Item Total Pipe

Now that our application is coming together nicely, you might have noticed we are repeating the same code to calculate the total prices of our items.
We can simplify this by creating an Item Total Pipe which we will use in the `list.component.html` template file and call directly using `transform` within `order.component.ts` file. The Pipe will transform an array of items and return the total sum of the price of each item.

After implementing this Pipe, you should be able to remove the `total` method from `list.component.ts`.

## P1: What you need to know

How to:

- Generate a Pipe using Angular CLI (you previously learned this in the [learn-angular/creating-pipes Creating Pipes] section! ✔️)
  ```bash
  ng g pipe itemTotal
  ```
- Provide a Pipe globally to the entire application, so it can be used in any component

## Provide Pipe Globally

Unlike services, Pipes are not readily injectable into our components. In order to be able to use a Pipe in a component’s `.ts` file, the Pipe has to be provided by a module.
To provide the **Pipe** just created in the app module, simply add the Pipe to the `providers` array in the `app.module.ts` file. [Learn More](https://angular.io/guide/providers).

By including the Pipe in a component’s constructor, you gain the ability to run the Pipe using its `transform` method.

✏️ Update **src/app/app.module.ts**

@sourceref ./app.module.ts
@highlight 42, only

Now the Pipe is available to be used in components across the application.

The example below shows how to provide a Pipe globally in Angular. The Pipe being created will transform two separate words into one compound word. It will take a string value, then a parameter, that is used as a prefix to the string value.

@sourceref ./understanding-how-pipes-are-provided.html
@codepen
@highlight 14-22, 27, 29, 39, 50, 52, only

## P1: How to verify your solution is correct

✏️ Update the following spec files to include and provide the new Pipe:

- **src/app/order/order.component.spec.ts**
  @diff ../16-order-service/order.component.spec.ts ./order.component.spec.ts only

- **src/app/app.component.spec.ts**
  @diff ../17-order-history-component/app.component.spec.ts ./app.component.spec.ts only

- **src/app/order/history/history.component.spec.ts**
  @diff ../17-order-history-component/history.component-2.spec.ts ./history.component.spec.ts only

- **src/app/order/list/list.component.spec.ts**
  @diff ../17-order-history-component/list.component.spec.ts ./list.component.spec.ts only

✏️ Update the spec file **item-total.pipe.spec.ts** to be:

@sourceref ./item-total.pipe.spec.ts

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

## P1: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/item-total.pipe.ts** to:

@sourceref ./item-total.pipe.ts

✏️ Update **src/app/order/order.component.ts** to use the item total Pipe:

@diff ../16-order-service/order.component-solution.ts ./order.component-solution.ts only

✏️ Update **src/app/order/list/list.component.html** to use the item total Pipe:

@diff ../17-order-history-component/list.component.html ./list.component.html only

</details>

## Problem 2: Using Currency Pipe

Now that we have finished implementing our Item Total Pipe, this is a good time for us to talk about using Currency Pipe. You might have noticed that our prices are in USD, which is a currency, and is a perfect use for the Currency Pipe.
Angular provides us with a [Currency Pipe](https://angular.io/api/common/CurrencyPipe) that formats a number as currency using locale rules. Locale Rules refers to a user’s country or region specific details like currency, language and more.

Add the Currency Pipe to the `order.component.html` , `menu-items.component.html` and `list.component.html` template files:

## P2: What you need to know

How to:

- Apply a Pipe (you previously learned this ✔️)

Like all the other Pipes we have created, the Currency Pipe can be used the exact same way.

## P2: Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/order/order.component.html** to use the Currency Pipe:

@diff ../16-order-service/order.component.html ./order.component.html only

✏️ Update **src/app/order/list/list.component.html** to use the currency Pipe:

@diff ./list.component.html ./list.component-currency.html only

✏️ Update **src/app/order/menu-items/menu-items.component.html** to use the Currency Pipe:
@diff ../14-building-order-form/child-component/menu-items-1.component.html ./menu-items-1.component-currency.html only

</details>

## Set Default Currency Code

If we want to display a different currency than the one provided by the application’s locale, which defaults to `en-US` and therefore `USD`, we may override the locale’s currency by providing `DEFAULT_CURRENCY_CODE` in `app.module.ts`.

✏️ Update **app.module.ts** to provide currency code:

@diff ./app.module.ts ./app.module-currency-pipe.ts only
