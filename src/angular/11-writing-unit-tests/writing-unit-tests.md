@page angular/writing-unit-tests Writing Unit Tests
@parent angular 11

@description Write a service unit test

@body

## Overview

In this part, we will:

- Update a current unit test to match for our refactored service method

### Exercise: Write restaurant service test

### The Problem

In the last section we updated an existing method on our RestaurantService. Update the unit test to test that the method works as desired by creating the correct url from parameters given.

> Hint - you can look at the getCities method test for an example.

### The Solution 

__src/app/restaurant/restaurant.service.spec.ts__

@sourceref ./restaurant.service.spec.ts
@highlight 79,83,84
