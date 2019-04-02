@page angular/writing-unit-tests Writing Unit Tests
@parent angular 11

@description Write a service unit test

@body

## Overview

In this part, we will:

- Update a current unit test to match for our refactored service method
- Write a new getRestaurant method on our RestaurantsService
- Write a unit test for the getRestaurant method

## Exercise: Refactor RestaurantService getRestaurants test

### The Problem

In the last section we updated the existing `getRestaurants` method on our RestaurantService. Update the unit test to test that the method works as desired by creating the correct url from parameters given.

> Hint - you can look at the getCities method test for an example.

### The Solution

__src/app/restaurant/restaurant.service.spec.ts__

@sourceref ./restaurant.service.spec.ts
@highlight 79,83,84

## Exercise: Write a test for new RestaurantService method & Write the new method

### The Problem

In the next section we're going to be creating a restaurant detail view. We'll need to have a method on our service that returns one restaurant from the list. Write this method and call it `getRestaurant`. It should take a string param "slug" and make a get request to the path `'/api/restaurants/slug-here'`. Then write a unit test for this method ensuring it makes the correct request and returns an object type of `Restaurant`.

### What You Need to Know

- How to write a method on a service that takes a param. You've learned this in previous sections.
- How to write a unit test. Here's a codeblock to get you started:

  ```typescript
    it('should make a get request to get a restaurant based on its slug', () => {
    });
  ```

### The Solution

__src/app/restaurant/restaurant.service.ts__

@sourceref ./restaurant.service.ts
@highlight 40-42, only

__src/app/restaurant/restaurant.service.spec.ts__

@sourceref ./restaurant.service.spec-withrestaurant.ts
@highlight 164-202, only
