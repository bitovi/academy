@page learn-angular/updating-service-params Filter Restaurants by City
@parent learn-angular 10

@description Learn  how to make a service take multiple parameters.

@body

## Overview

In this part, we will:

- Update getRestaurants service method to take params
- Update component to pass state and city params to service method

## The problem

<img src="../static/img/angular/10-updating-service-params/before.png"
  style="border: solid 1px black; max-width: 400px;"/>


Now that we are able to capture a user's state and city preferences, we want to only return restaurants in the selected city. Modify the `getRestaurants` method in the __src/app/restaurant/restaurant.service.ts__ file to take two string parameters, one for city, and one for state. The requested url with params should look like this: `'/api/restaurants?filter[address.state]=IL&filter[address.city]=Chicago'`

<img src="../static/img/angular/10-updating-service-params/after.png"
  style="border: solid 1px black; max-width: 400px;"/>

In the __src/app/restaurant/restaurant.component.ts__ file, update the call to the `getRestaurants` service method to use the city and state values capture from the user's form input.

## What you need to know

- How to use [angular/form-value-changes#exercise-write-service-methods-to-get-states-and-cities HttpParams] (you learned this in the previous section! ✔️)


## Verify the solution

If you've implemented the solution correctly, when you use the select boxes to choose state and city, you should see a list of just restaurants from the selected city returned.

Update the spec file  __src/app/restaurant/restaurant.component.spec.ts__ to be:

@sourceref ./restaurant.component-httpparams.spec.ts
@highlight 11,106,127,142,432-441,only

Update the spec file __src/app/restaurant/restaurant.service.spec.ts__

@sourceref ./restaurant.service-httpparams.spec.ts
@highlight 79-83,only

> If you've implemented the solution correctly, when you run `npm run test` the restaurant component tests will pass! We'll fix the service tests in the next step.

## The solution

__src/app/restaurant/restaurant.service.ts__

@sourceref ./restaurant.service-httpparams.ts
@highlight 26-28,only

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component-httpparams.ts
@highlight 97,123,124,only
