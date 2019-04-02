@page angular/nested-routes Nested Restaurant Routes
@parent angular 12

@description Creating nested restaurant routes

@body

## Overview

In this part, we will:

- Create a restaurant detail component
- Add a route path with a param
- Get restaurant slug from route param in component
- Get restaurant data from service based on slug

## Route Parameters & Child Views

A common pattern in SPA architecture is to serve a view of an individual piece of data from a path with an identifying parameter. Previously we've defined static paths with Angulars <a href="https://angular.io/guide/router" target="_blank">router</a>. To create a nested route, we'll need the slug after the slash to be dynamic. We can set a token for the router parameter with `:`. To get the slug from the route in a component, we use the <a href="https://angular.io/api/router/ActivatedRoute" target="_blank">ActivatedRoute</a> interface.

@sourceref ./nested-route.html
@codepen
@highlight 93-94,101,105,107,115,only

### The Problem

Create a new component called `details` in the restaurant component folder that is a detail view for an individual restaurant that is served from the path `'/restaurants/restaurant-slug'`. Create the route as well, and use the `getRestaurant` method on the RestaurantService to fetch the restaurant based on the route snapshot. The detail component should have a member 'restaurant' that is a type of Restaurant and an 'isLoading' member set to true or false based on when the restaurant data has been fetched.

### What You Need to Know

- How to create a nested component

  ```bash
  ng g component restaurant/detail
  ```

  Add markup:

  __src/app/restaurant/detail/detail.component.html__

  @sourceref ./detail.component.html

  We've also added a method called by the html that will return a proper url path for our restaurant image.

  __src/app/restaurant/detail/detail.component.ts__

  @sourceref ./detail.component-starter.ts
  @highlight 15-18

- How to create a route with a param
- How to get a route param using ActivatedRoute

### To Verify Your Solution is Correct

When you click the detail button on a restaurant from the restaurant list view you'll see the detail view of that restaurant.

Update the spec file  __src/app/restaurant/detail.component.spec.ts__ to be:

@sourceref ./detail.component.spec.ts

> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

### The Solution

__src/app/app-routing.module.ts__

@sourceref ./app-routing.module.ts
@highlight 5,16-19

__src/app/restaurant/detail/detail.component.ts__

@sourceref ./detail.component.ts
@highlight 2,4,5,13,14,16,19-24