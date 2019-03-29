@page angular/pull-restaurant-data-into-view Use Restaurant API data
@parent angular 7

@description Pulling Restaurant Data into Our View

@body

## Overview

In this part, we will:

- Import new service into Restaurant Component
- Call `getRestaurants()` method in component
- Change restaurant markup to use new restaurant object

## Importing Service into Component

To use a service in a component, we use dependency injection to pass the service in the component constructor function. We're then able to access methods on it for use in our component

@sourceref ./di.html
@codepen
@highlight 90, only

## Exercise: Inject Restaurants Service in Restaurants component and call the `getRestaurants` function

## The Problem

We want to be able to use the `getRestaurants` method in our component to display a list of restaurants. Update your 
__src/app/restaurant/restaurant.component.html__ to be:

@sourceref ./restaurant.component.html
@highlight 3, 4, 5

Use this as a guide to figure out how to structure getting the call to get restaurants from the service - it's important to note that our new markup shows `restaurants` is now an object that has an `isPending` property and a `value` prop for the array of restaurants. 

Here's the generic interface for you to use that should represent what the new restaurant type is.

```typescript
export interface Data<T> {
  value: Array<T>;
  isPending: boolean;
}
```

## What you need to know

- How to inject a service into a component (you learned this in section above! ✔️)
- How to call a method from a class

> Hint: Call the `getRestaurants` method in the `ngOnInit` method.

### To Verify Your Solution is Correct

You should be able see a list of restaurants when you navigate to <a href="http://localhost:4200/restaurants" target="\_blank">localhost:4200/restaurants</a>! 

Update the spec file  __src/app/restaurant/restaurant.component.spec.ts__ to be:

@sourceref ./restaurant.component.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### Solution

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component.ts
@highlight 2, 3, 5-8, 16-19, 20, 23-27


### Did You Know?

You may have noticed in our markup there's another use of routerLink:

```html
<a class="btn" [routerLink]="['/restaurants', restaurant.slug]">
  Details
</a>
```

One of the ways to create a link is to pass in the individual parts to the `routerLink` directive. This will generate the path `/restaurants/crab-cafe` for the "crab cafe" restaurant from it's slug.