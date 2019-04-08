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
@highlight 90,only

## Exercise: Inject RestaurantService in RestaurantComponent and call the `getRestaurants` function

### The Problem

We want to be able to use the `getRestaurants` method in our component to display a list of restaurants. We also want specify the type of our `restaurant` member on our `RestaurantComponent` class to be an array of restaurants.

### What you need to know

- How to inject a service into a component (you learned this in section above! ✔️)
- How to call a method on a class
- How to specify an array type (you learned this the previous section! ✔️)

> Hint: Call the `getRestaurants` method in the `ngOnInit` method.

### To Verify Your Solution is Correct

You should be able see a list of restaurants when you navigate to <a href="http://localhost:4200/restaurants" target="\_blank">localhost:4200/restaurants</a>!

Update the spec file  __src/app/restaurant/restaurant.component.spec.ts__ to be:

@sourceref ./restaurant.component.spec-service.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### Solution

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component-service.ts
@highlight 2,3,11,13,16-18

## Exercise: Show a loading state while restaurants are being requested.

### The Problem

We want to show a loading div while the request to get the list of restaurants is made. You'll need to do a few things:

1. Create a new interface `Data` that represents the following object:

  ```json
  let data = {
    value: [], //aray of restaurants
    isPending: false //boolean 
  }
  ```

2. Change the `restaurants` member to use the new `Data` type
3. Right before you call the `getRestaurants` method, set the restaurants `isPending` value to true
4. Once the `getRestaurants` response is received, set the restaurants `value` to the response data and `isPending` value to false
5. Update the html to match the new restaurant object values and to show this div while `isPending` is true:

  ```html
    <div class="restaurant loading"></div>
  ```

### What you need to know

- How to write an interface (you learned this in the previous section! ✔️)
- How to conditionally show html blocks (you learned this in a previous section! ✔️)

### To Verify Your Solution is Correct

You should be able see a list of restaurants when you navigate to <a href="http://localhost:4200/restaurants" target="\_blank">localhost:4200/restaurants</a>!

Update the spec file  __src/app/restaurant/restaurant.component.spec.ts__ to be:

@sourceref ./restaurant.component.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### Solution

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component.ts
@highlight 5-8,16-19,23-27

__src/app/restaurant/restaurant.component.html__

@sourceref ./restaurant.component.html
@highlight 3, 4, 5

### Did You Know?

You may have noticed in our markup there's another use of routerLink:

```html
<a class="btn" [routerLink]="['/restaurants', restaurant.slug]">
  Details
</a>
```

One of the ways to create a link is to pass in the individual parts to the `routerLink` directive. This will generate the path `/restaurants/crab-cafe` for the "crab cafe" restaurant from it's slug.