@page angular/updating-service-params Filtering Cities & Restaurants
@parent angular 10

@description Updating Restaurant Service to use params

@body

## Overview

In this part, we will:

- Update getRestaurants service method to take params
- Convert ResponseData interface to generic
- Add service methods to get states and cities
- Add call to get states on component init
- Refactor getting restaurants into own function
- Make calls to get cities and restaurants on input change events

## Changing http call to use params

Import HttpParams, add state and city params to getRestaurants method. Add new methods to get states, and cities(with a state param)

__src/app/restaurant/restaurant.service.ts__

@sourceref ./restaurant-1.service.ts
@highlight 2, 26-28

## Convert ResponseData to Generic

Because our API returns different data types that follow the same structure, we can change our `ResponseData` interface to a generic to accept any kind of type, including the interfaces for city and state.

__src/app/restaurant/restaurant.service.ts__

@sourceref ./restaurant-2.service.ts
@highlight 5-7, 28

### Get states and cities from the service layer

Add `getStates()` method that publishes states and a
`getCities(state:string)` method that publishes a list of cities
for a provided state.

__src/app/restaurant/restaurant.service.ts__

@sourceref ./restaurant-3.service.ts
@highlight 31-38

We'll use those methods to get all states and cities in `IL`.
Enable the state and city forms.

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