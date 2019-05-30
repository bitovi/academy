@page learn-angular/nested-routes Nested Restaurant Routes
@parent learn-angular 13

@description Creating nested restaurant routes

@body

## Overview

In this part, we will:

- Create a restaurant detail component
- Add a route path with a param
- Get restaurant slug from route param in component
- Get restaurant data from service based on slug

## Problem

We want to have a component to display individual restaurants details, and want the path to be nested under the restaurants path.

## What You Need to Know

To solve this exercise you will need to know:

- How to create a nested component
- How to create a route with a param
- How to get a route param using ActivatedRoute

## Route Parameters & Child Views

A common pattern in SPA architecture is to serve a view of an individual piece of data from a path with an identifying parameter. Previously we've defined static paths with Angulars <a href="https://angular.io/guide/router" target="_blank">router</a>. To create a nested route, we'll need the slug after the slash to be dynamic. We can set a token for the router parameter with `:`. To get the slug from the route in a component, we use the <a href="https://angular.io/api/router/ActivatedRoute" target="_blank">ActivatedRoute</a> interface.

@sourceref ./nested-route.html
@codepen
@highlight 93-94,101,105,107,115,only

## Technical Requirements

Create a new component called `details` in the restaurant component folder that is a detail view for an individual restaurant that is served from the path `'/restaurants/restaurant-slug'`. Create the route as well, and use the `getRestaurant` method on the RestaurantService to fetch the restaurant based on the route snapshot. The detail component should have a member 'restaurant' that is a type of Restaurant and an 'isLoading' member set to true or false based on when the restaurant data has been fetched.

## Setup

✏️ Run:

```bash
ng g component restaurant/detail
```

✏️  Update __src/app/restaurant/detail/detail.component.html__:

@sourceref ./detail.component.html

We've also added a method called by the html that will return a proper url path for our restaurant image.

✏️  Update __src/app/restaurant/detail/detail.component.ts__:

@sourceref ./detail.component-starter.ts
@highlight 15-18

## How to Verify Your Solution is Correct

When you click the detail button on a restaurant from the restaurant list view you'll see the detail view of that restaurant.

✏️ Update the spec file  __src/app/restaurant/detail.component.spec.ts__ to be:

@sourceref ./detail.component.spec.ts

✏️ Update the spec file  __src/app/app.component.spec.ts__ to be:

@diff ../8-state-city-options/app.component.spec.ts ./app.component.spec.ts only


> If you've implemented the solution correctly, when you run `npm run test` all tests will pass!

## Solution

✏️ Update __src/app/app-routing.module.ts__

@diff ../4-adding-routing/app-routing.module.ts ./app-routing.module.ts

✏️ Update __src/app/restaurant/detail/detail.component.ts__

@diff ./detail.component-starter.ts ./detail.component.ts
