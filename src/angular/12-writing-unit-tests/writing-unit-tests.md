@page learn-angular/writing-unit-tests Writing Unit Tests
@parent learn-angular 12

@description Write a unit test for a service in Angular

@body

## Overview

In this part, we will:

- Write a new getRestaurant method on our RestaurantsService
- Write a unit test for the getRestaurant method

## Problem

In the next section we're going to be creating a restaurant detail view. We'll need to have a method on our service that returns one restaurant from the list, and unit tests to make sure it works as expected.

## What You Need to Know

- How to write a method on a service that takes a param. You've learned this in previous sections.
- How to write a unit test. Here's a codeblock to get you started:

  ```typescript
    it('should make a get request to get a restaurant based on its slug', () => {
      //TEST CODE HERE
    });
  ```

## Technical Requirements

1. In the __src/app/restaurant/restaurant.service.ts__ file add a new method called `getRestaurant` to the `RestaurantService` class. It should take a string param `slug` and make a get request to the path `'/restaurants/slug-here'`.

The response from the API looks like this:

http://localhost:7070/restaurants/cow-barn

```javascript
{
  "name":"Cow Barn",
  "slug":"cow-barn",
  "images": {
    "thumbnail":"node_modules/place-my-order-assets/images/3-thumbnail.jpg",
    "owner":"node_modules/place-my-order-assets/images/3-owner.jpg",
    "banner":"node_modules/place-my-order-assets/images/1-banner.jpg"
  },
  "menu":{
    "lunch":[
      {"name":"Roasted Salmon","price":23.99},
      {"name":"Onion fries","price":15.99},
      {"name":"Crab Pancakes with Sorrel Syrup","price":35.99}
    ],
    "dinner":[
      {"name":"Herring in Lavender Dill Reduction","price":45.99},
      {"name":"Spinach Fennel Watercress Ravioli","price":35.99},
      {"name":"Garlic Fries","price":15.99}
    ]
  },
  "address":{"street":"285 W Adams Ave","city":"Detroit","state":"MI","zip":"60632"},
  "resources":{
    "thumbnail":"api/resources/images/2-thumbnail.jpg",
    "owner":"api/resources/images/2-owner.jpg",
    "banner":"api/resources/images/4-banner.jpg"
  },
  "_id":"68LbXVN6mZI7t4fS"
}
```


1. In the __src/app/restaurant/restaurant.service.spec.ts__ file write a unit test for this method ensuring it makes the correct request type to the correct URL and returns an object type of `Restaurant`.

## Solution

✏️ Update __src/app/restaurant/restaurant.service.ts__

@diff ../10-updating-service-params/restaurant.service-httpparams.ts ./restaurant.service.ts only


✏️ Update __src/app/restaurant/restaurant.service.spec.ts__

@diff ../10-updating-service-params/restaurant.service-httpparams.spec.ts ./restaurant.service.spec-withrestaurant.ts only
