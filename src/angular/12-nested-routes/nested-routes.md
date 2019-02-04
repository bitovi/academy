@page angular/nested-routes Nested Restaurant Routes
@parent angular 12

@description Creating nested restaurant routes

@body

## Overview

In this part, we will:

- Create a restaurant detail component
- Rename the new component & update it's declaration
- Add a route path with custom param
- Add a get restaurant method to restaurant class
- Get restaurant slug from route param in component
- Get restaurant data from service based on slug

## Create the Restaurant Detail Component

The restaurant detail component will display information about the restaurant, and include a link to order from the menu, which we'll build the component for later. 

```bash
ng g component restaurant/detail
```

Add markup:

__src/app/restaurant/detail/detail.component.html__

@sourceref ./detail.component.html


For clarity, let's rename the component class name to be `RestaurantDetailComponent`.

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
@highlight 2, 16, 21

## Adding getRestaurant method to serivce

We need to add one more method to our restaurant service to get a specific restaurant based on the slug. 

__src/app/restaurant/restaurant.service.ts__

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Restaurant } from './restaurant';

export interface Config<T> {
  data: Array<T>;
}

export interface State {
  name: string;
  short: string;
}

export interface City {
  name: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  getRestaurants(state:string, city: string) { //HIGHLIGHT THIS LINE
    let options = { params: new HttpParams().set('filter[address.state]', state).set('filter[address.city]', city) };
    return this.httpClient.get<Config<Restaurant>>('/api/restaurants', options);
  }

  getStates() {
    return this.httpClient.get<Config<State>>('/api/states');
  }

  getCities(state:string) {
    const options = { params: new HttpParams().set('state', state)};
    return this.httpClient.get<Config<City>>('/api/cities', options);
  }

  getRestaurant(slug: string) {
    return this.httpClient.get<Restaurant>('/api/restaurants/' + slug + '?');
  }
}
```

## Make call to get restaurant in component

Now we can make a call in our restaurant detail component to get the restaurant data.

__src/app/restaurant/detail/detail.component.ts__

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RestaurantService } from '../restaurant.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'pmo-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.restaurantService.getRestaurant(slug)
     .subscribe((data:Restaurant) => { //HIGHLIGHT LINE
       this.restaurant = data;
       this.isLoading = false;
      });
  }

  getUrl(image:string): string {
    // THIS IS A DIFFERENT WAY TO HANDLE THE IMAGE PATH
    return image.replace('node_modules/place-my-order-assets', './assets')
  }

}
```

Now when we navigate to  <a href="http://localhost:4200/restaurant/crab-place" target="_blank">localhost:4200/restaurant/crab-place</a> we'll see the detail view of the Crab Place restaurant
