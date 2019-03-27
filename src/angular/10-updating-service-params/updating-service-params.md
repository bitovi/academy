@page angular/updating-service-params Filtering Cities & Restaurants
@parent angular 10

@description Updating Restaurant Service to use params

@body

## Overview

In this part, we will:

- Update getRestaurants service method to take params
- Make calls to get cities and restaurants on input change events


## Exercise: Update getRestaurants method to take params

### The Problem

We want to modify our `getRestaurants` method to take two string parameters, one for city, and one for state. Update the __src/app/restaurant/restaurant.service.ts__ file to make this change, and update the __src/app/restaurant/restaurant.component.ts__ file to call the method with params "IL","Chicago".

### What You Need to Know

- how to use HttpParams (you learned this in the section above! ✔️)

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



## Exercise: Use Generics to modify ResponseData interface to work with states and cities

## Exercise: Get cities and states in component

## Exercise: Get cities and states based on dropdown values.



### Get states and cities from the service layer

We're going to a `getStates()` method that publishes states and a
`getCities(state:string)` method that publishes a list of cities
for a provided state.

__src/app/restaurant/restaurant.service.ts__

@sourceref ./restaurant-3.service.ts
@highlight 31-38

We'll use those methods to get all states and cities in `IL`. We'll also want to disable down dropdowns when the component first loads, then enable them as their respective dropdown lists are retrieved.

__src/app/restaurant/restaurant.component.ts__

@sourceref ./3-restaurant.component.ts
@highlight 5,26-34,47-57,59,71-72


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
