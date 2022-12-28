@page learn-angular/writing-unit-tests Writing Unit Tests
@parent learn-angular 12

@description Write a unit test for a service in Angular

@body

## Overview

In this part, we will:

- Write a new getRestaurant method on our RestaurantsService
- Write a unit test for the getRestaurant method

## Problem

In the next section we're going to be creating a restaurant detail view. We'll need to have a method on our service that returns one restaurant from the list. Write this method and call it `getRestaurant`. It should take a string param "slug" and make a get request to the path `'/restaurants/slug-here'`. Then write a unit test for this method ensuring it makes the correct request and returns an object type of `Restaurant`.

## What You Need to Know

- How to write a method on a service that takes a param. You've learned this in previous sections.
- How to write a unit test. Here's a codeblock to get you started:

  ```typescript
  it('should make a get request to get a restaurant based on its slug', () => {
    
  });
  ```
- Refer to the existing tests on the service to see how to use `HttpMock` to test `HttpClient` calls.

## Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/restaurant/restaurant.service.ts**

@diff ../10-updating-service-params/restaurant.service-httpparams.ts ./restaurant.service.ts only

✏️ Update **src/app/restaurant/restaurant.service.spec.ts**

@diff ../10-updating-service-params/restaurant.service-httpparams.spec.ts ./restaurant.service.spec-withrestaurant.ts only

</details>
