@page learn-angular/pull-restaurant-data-into-view Rendering Data in Components
@parent learn-angular 7

@description Learn how to render API data into HTML with a view.

@body

## Overview

In this part, we will:

- Import new service into Restaurant Component
- Call `getRestaurants()` method in component
- Change restaurant markup to use new restaurant object

## Problem 1: Make `RestaurantComponent` use the `getRestaurants` function

In this section, we will change `RestaurantComponent` to actually get
data from the service API. Instead of two hard coded restaurants, we will
see a longer list:

<img src="../static/img/angular/7-data-into-view/1-after.png"
  style="border: solid 1px black;" width="640"/>

## P1: What you need to know

- How to inject a service into a component
- How to subscribe to an observable

## Inject a service into a component

To use a service in a component, we use dependency injection to pass the service in the component constructor function. We’re then able to access methods on it for use in our component.

@sourceref ./di.html
@codepen
@highlight 90,only

## Subscribe to an `Observable`

The result of `getRestaurants()` is an observable. Use [subscribe](https://rxjs.dev/guide/subscription) to listen to when
an RxJS observable changes:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.1/rxjs.umd.js"></script>
<script type="typescript">
const { Observable } = rxjs;

const observable = Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
});

observable.subscribe(function subscriber(value) {
  console.info('got value ' + value);
  // Logs 1, 2, 3
});
</script>
```

@codepen
@highlight 11

## P1: Technical requirements

1. Change `RestaurantComponent`’s _restaurants_ property definition:

@sourceref ../../../exercises/angular/6-restaurant-service/problem/src/app/restaurant/restaurant.component.ts
@highlight 104, only

2. Use `RestaurantService`’s `getRestaurants` to get an array of restaurants and
   set it on `RestaurantComponent`’s _restaurants_ property.

## P1: How to verify your solution is correct

You should be able see a list of all restaurants when you navigate to <a href="http://localhost:4200/restaurants">localhost:4200/restaurants</a>, instead of the two that were previously hard-coded.

✏️ Update the spec file **src/app/restaurant/restaurant.component.spec.ts** to be:

@diff ../../../exercises/angular/6-restaurant-service/problem/src/app/restaurant/restaurant.component.spec.ts ./restaurant.component.spec-service.ts only

✏️ Update the spec file **src/app/app.component.spec.ts** to be:

@diff ../../../exercises/angular/6-restaurant-service/problem/src/app/app.component.spec.ts ./app.component.spec.ts only

> Hint: Call the `getRestaurants` method in the `ngOnInit` method.

## P1: Solution

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/restaurant/restaurant.component.ts** as follows:

@diff ../../../exercises/angular/6-restaurant-service/problem/src/app/restaurant/restaurant.component.ts ./restaurant.component-service.ts

</details>

## Problem 2: Show a loading state while restaurants are being requested

Sometimes the server can take a long time to respond. It’s a better experience for the user
to show a loading icon to the user while data is loading:

This icon will be shown with the following HTML:

```html
<div class="restaurant loading"></div>
```

## P2: What you need to know

- How to write an interface (you learned this in the previous section! ✔️)
- How to conditionally show html blocks (you learned this in a previous section! ✔️)

## P2: Technical requirements

1. Create a new interface `Data` that represents the following object:

   ```js
   let data = {
     value: [], // array of restaurants
     isPending: false, // boolean
   };
   ```

2. Change the `restaurants` member to use the new `Data` type in the `RestaurantsComponent`.
3. Right before you call the `getRestaurants` method, set the restaurants `isPending` value to true.
4. Once the `getRestaurants` response is received, set the restaurants `value` to the response data and `isPending` value to false.
5. Update the html to match the new restaurant object values and to show the following HTML while `isPending` is true:

```html
<div class="restaurant loading"></div>
```

## P2: How to verify your solution is correct

You should be able see a list of restaurants when you navigate to <a href="http://localhost:4200/restaurants">localhost:4200/restaurants</a>!

✏️ Update the spec file **src/app/restaurant/restaurant.component.spec.ts** to be:

@diff ./restaurant.component.spec-service.ts ./restaurant.component.spec.ts only

## P2: Solution

If you’ve implemented the solution correctly, the tests will pass when you run `npm run test`!

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/restaurant/restaurant.component.ts** to:

@diff ./restaurant.component-service.ts ./restaurant.component.ts

✏️ Update **src/app/restaurant/restaurant.component.html** to:

@diff ../../../exercises/angular/6-restaurant-service/problem/src/app/restaurant/restaurant.component.html ./restaurant.component.html only

</details>

## Did you know?

You may have noticed in our markup there’s another use of `routerLink`:

```html
<a class="btn" [routerLink]="['/restaurants', restaurant.slug]">
  Details
</a>
```

One of the ways to create a link is to pass in the individual parts to the `routerLink` directive. This will generate the path `/restaurants/crab-cafe` for the "crab cafe" restaurant from its slug.
