@page angular/nested-routes Nested Restaurant Routes
@parent angular 12

@description Creating nested restaurant routes

@body

## Overview

In this part, we will:

- Create a restaurant detail component
- Add a route path with custom param
- Add a get restaurant method to restaurant class
- Get restaurant slug from route param in component
- Get restaurant data from service based on slug

We're able to nest components and modules in Angular, and the CLI makes it even easier

## Create a Component Inside an Existing Component

### The Problem

We want to create a detail view for individual restaurants. 

### What You Need to Know

- How to create a route with a param
- How to create a nested component
  ```bash
  ng g component restaurant/detail
  ```

## Create the Restaurant Detail Component

The restaurant detail component will display information about the restaurant, and include a link to order from the menu, which we'll build the component for later.



Add markup:

__src/app/restaurant/detail/detail.component.html__

@sourceref ./detail.component.html


 We've also added a method called by the html that will return a proper url path for our restaurant image. 

__src/app/restaurant/detail/detail.component.ts__

@sourceref ./detail.component-1.ts
@highlight 8

We'll also have to update the component name where it was automatically declared in the app root module.

__src/app/app.module.ts__

@sourceref ./app.module.ts
@highlight 12, 21

## Creating a route for restaurant/{{restaurant-slug}}

Previously we've defined static paths with Angulars <a href="https://angular.io/guide/router" target="_blank">router</a>. To create a restaurant path, we'll need the slug after the slash to be dynamic. We can set a token for the router parameter with `:`

__src/app/app-routing.module.ts__

@sourceref ./app-routing.module.ts
@highlight 5,16-19

## Getting restaurant slug from the route

We need to get the slug from the route to determine which restaurant to fetch. We import `ActivatedRoute` into our component, and call `this.route.snapshot.paramMap.get('slug')` to get the slug.

__src/app/restaurant/detail/detail.component.ts__

@sourceref ./detail.component-2.ts
@highlight 2, 12, 16

## Adding getRestaurant method to serivce

We need to add one more method to our restaurant service to get a specific restaurant based on the slug. 

__src/app/restaurant/restaurant.service.ts__
@sourceref ./restaurant.service.ts
@highlight 40-42

## Make call to get restaurant in component

Now we can make a call in our restaurant detail component to get the restaurant data.

__src/app/restaurant/detail/detail.component.ts__

@sourceref ./detail.component-3.ts
@highlight 4, 5, 13-14, 18, 23-27

Now when we click the detail button on a restaurant from the restaurants view we'll see the detail view of that restaurant.
