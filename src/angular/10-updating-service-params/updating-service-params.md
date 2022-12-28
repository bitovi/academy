@page learn-angular/updating-service-params Filter Restaurants by City
@parent learn-angular 10

@description Learn how to make a service take multiple parameters.

@body

## Overview

In this part, we will:

- Update getRestaurants service method to take params
- Update component to pass state and city params to service method

## Problem

<img src="../static/img/angular/10-updating-service-params/before.png"
  style="border: solid 1px black; max-width: 400px;"/>

Now that we are able to capture a user's state and city preferences, we want to only return restaurants in the selected city. Modify the `getRestaurants` method in the **src/app/restaurant/restaurant.service.ts** file to take two string parameters, one for city, and one for state. The requested url with params should look like this: `'/api/restaurants?filter[address.state]=IL&filter[address.city]=Chicago'`

<img src="../static/img/angular/10-updating-service-params/after.png"
  style="border: solid 1px black; max-width: 400px;"/>

## Technical Requirements

In the **src/app/restaurant/restaurant.component.ts** file, update the call to the `getRestaurants` service method to use the city and state values capture from the user's form input.

## How to Verify Your Solution is Correct

If you've implemented the solution correctly, when you use the select boxes to choose state and city, you should see a list of just restaurants from the selected city returned.

✏️ Update the spec file **src/app/restaurant/restaurant.component.spec.ts** to be:

@diff ../9-form-value-changes/restaurant.component-citystate.spec.ts ./restaurant.component-httpparams.spec.ts only

✏️ Update the spec file **src/app/restaurant/restaurant.service.spec.ts**

@diff ../9-form-value-changes/restaurant.service-generics.spec.ts ./restaurant.service-httpparams.spec.ts only

> If you've implemented the solution correctly, when you run `npm run test` the tests will pass!

## What You Need to Know

- How to use [learn-angular/form-value-changes#how-to-use-httpparams HttpParams] (you learned this in the previous section! ✔️)

## Solution

<details>
<summary>Click to see the solution</summary>
✏️ Update **src/app/restaurant/restaurant.service.ts**

@diff ../9-form-value-changes/restaurant.service-generics.ts ./restaurant.service-httpparams.ts only

✏️ Update **src/app/restaurant/restaurant.component.ts**

@diff ../9-form-value-changes/restaurant.component-citystate.ts ./restaurant.component-httpparams.ts only

</details>
