@page angular/updating-service-params Filtering Cities & Restaurants
@parent angular 10

@description Updating Restaurant Service to use params

@body

## Overview

In this part, we will:

- Update getRestaurants service method to take params
- Update component to pass state and city params to service method

## Exercise: Update getRestaurants method to take state and city params

### The Problem

Now that we are able to capture a user's state and city preferences, we want to only return restaurants in the selected city. Modify the `getRestaurants` method in the __src/app/restaurant/restaurant.service.ts__ file to take two string parameters, one for city, and one for state. The requested url with params should look like this: `'/api/restaurants?filter[address.state]=IL&filter[address.city]=Chicago'`

In the __src/app/restaurant/restaurant.component.ts__ file, update the call to the `getRestaurants` service method to use the city and state values capture from the user's form input.

### What You Need to Know

- How to use HttpParams (you learned this in the previous section! ✔️)

### To Verify Your Solution is Correct

If you've implemented the solution correctly, when you use the select boxes to choose state and city, you should see a list of just restaurants from the selected city returned.

### Solution

__src/app/restaurant/restaurant.service.ts__

@sourceref ./restaurant.service-httpparams.ts
@highlight 27,28

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component-httpparams.ts
@highlight 95,121,122