@page angular/pull-restaurant-data-into-view Pulling restaurant data into our view
@parent angular 7

@description Pulling Restaurant Data into Our View

@body 

## Overview

In this part, we will:

- Import new service into Restaurant Component
- Call `getRestaurants()` method in component

### Importing Service into Component

We'll then import our new service into our restaurant component.

__src/app/restaurant/restaurant.component.ts__

```typescript
import { Component, OnInit } from '@angular/core';
import { RestaurantService, Config } from './restaurant.service';
import { Restaurant } from './restaurant';

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit {
  public restaurants: {
    value: Restaurant[];
    isPending: boolean;
  }
  config: Config;
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.restaurants.isPending = true;

    this.restaurantService.getRestaurants().subscribe((res: Config) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
  }
}
``` 

You should now see a list of restaurants when you navigate to <a href="http://localhost:4200/restaurants" target="_blank">localhost:4200/restaurants</a>! You may have noticed in our markup there's another use of routerLink:

```html
<a class="btn" [routerLink]="['/restaurants', restaurant.slug]">
  Details
</a>
```

One of the ways to create a link is to pass in the individual parts to the `routerLink` directive. This will generate the path `/restaurants/crab-cafe` for the "crab cafe" restaurant from it's slug.