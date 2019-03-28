@page angular/updating-service-params Filtering Cities & Restaurants
@parent angular 10

@description Updating Restaurant Service to use params

@body

## Overview

In this part, we will:

- Update getRestaurants service method to take params


## Exercise: Update getRestaurants method to take params

### The Problem

Now that we are able to capture a user's state and city preferences, we want to only return restaurants in the selected city. Modify the `getRestaurants` method in the __src/app/restaurant/restaurant.service.ts__ file to take two string parameters, one for city, and one for state.

### What You Need to Know

- how to use HttpParams (you learned this in the previous section! ✔️)

### To Verify Your Solution is Correct

Update the spec file  __src/app/restaurant/restaurant.service.spec.ts__ to be:

@sourceref ./restaurant.service-httpparams.spec.ts
@highlight 79,83

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### Solution

__src/app/restaurant/restaurant.service.ts__

@sourceref ./restaurant.service-httpparams.ts
@highlight 2,16-18

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component-httpparams.ts
@highlight 45


## Exercise: Get cities and states based on dropdown values.




## Add methods to retrieve data to component

In the next step, we will want to change the list of cities and restaurants
as the user selects a state and/or city.  In _this_ step, we will
add two functions:

- `getCities(state: string)` which will update the list of cities for
  the given state. We should also reset the `isPending` state for cities.
- `getRestaurants(state: string, city: string)` which will update the list of
  restaurants for a city and state. We should also reset the `isPending` state for restaurants.

__src/app/restaurant/restaurant.component.ts__

@sourceref ./4-restaurant.component.ts
@highlight 53,55,83-101,only

## Make calls for cities and restaurants when inputs change

__src/app/restaurant/restaurant.component.ts__

@sourceref ./5-restaurant.component.ts
@highlight 51-52,68-102

Now when you interact with the UI, cities won't be shown until a state is selected, restaurants will show once a city has been selected.
