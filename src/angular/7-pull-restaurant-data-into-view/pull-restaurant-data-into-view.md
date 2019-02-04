@page angular/pull-restaurant-data-into-view Pulling restaurant data into our view
@parent angular 7

@description Pulling Restaurant Data into Our View

@body

## Overview

In this part, we will:

- Import new service into Restaurant Component
- Call `getRestaurants()` method in component

### Importing Service into Component

We'll then import our new service and ResponseData interface into our restaurant component.

__src/app/restaurant/restaurant.component.ts__

@sourceref ./restaurant.component.ts
@highlight 2, 3, 5-8, 16-19, 20, 23-27

You should now see a list of restaurants when you navigate to <a href="http://localhost:4200/restaurants" target="\_blank">localhost:4200/restaurants</a>! You may have noticed in our markup there's another use of routerLink:

```html
<a class="btn" [routerLink]="['/restaurants', restaurant.slug]">
  Details
</a>
```

One of the ways to create a link is to pass in the individual parts to the `routerLink` directive. This will generate the path `/restaurants/crab-cafe` for the "crab cafe" restaurant from it's slug.
