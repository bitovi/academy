@page angular/nested-routes Creating nested restaurant routes
@parent angular 11

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

```bash
ng g component restaurant/detail
```

Add markup:

__src/app/restaurant/detail/detail.component.ts__

```html
<ng-container *ngIf="isLoading">
  <div class="loading"></div>
</ng-container>
<ng-container *ngIf="!isLoading">
  <div class="restaurant-header" [ngStyle]="{'background-image': 'url('+ getUrl(restaurant.images.banner) + ')'}">
  <div class="background">
    <h2>{{restaurant.name}}</h2>

    <div class="address" *ngIf="restaurant.address" >
      {{restaurant.address.street}}<br />{{restaurant.address.city}}, {{restaurant.address.state}} {{restaurant.address.zip}}
    </div>

    <div class="hours-price">
      $$$<br />
      Hours: M-F 10am-11pm
      <span class="open-now">Open Now</span>
    </div>

    <br />
  </div>
</div>

<div class="restaurant-content">
  <h3>The best food this side of the Mississippi</h3>

  <p class="description">
    <img src="{{restaurant.images.owner | imageUrl}}" />
    Description for {{restaurant.name}}
  </p>
  <p class="order-link">
    <a class="btn" [routerLink]="['/restaurants', restaurant.slug, 'order']">
      Order from {{restaurant.name}}
    </a>
  </p>
</div>
</ng-container>
```


For clarity, let's rename the component class name to be `RestaurantDetailComponent`.

__src/app/restaurant/detail/detail.component.ts__

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pmo-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class RestaurantDetailComponent implements OnInit { //HIGHLIGHT LINE

  constructor(

  ) { }

  ngOnInit() {

  }
}
```

We'll also have to update the component name where it was automatically declared in the app root module.

__src/app/app.module.ts__

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { HomeComponent } from './home/home.component';
import { ImageUrlPipe } from './image-url.pipe';
import { RestaurantDetailComponent } from './restaurant/detail/detail.component'; //HIGHLIGHT LINE


@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    HomeComponent,
    ImageUrlPipe,
    RestaurantDetailComponent //HIGHLIGHT LINE
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Creating a route for restaurant/{{restaurant-slug}}

__src/app/app-routing.module.ts__

```typescript
import { HomeComponent } from './home/home.component';
import { RestaurantComponent } from './restaurant/restaurant.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'restaurants',
    component: RestaurantComponent,
  },
    {
    path: 'restaurants/:slug',
    component: RestaurantDetailComponent,
  }
];
```

## Getting restaurant slug from the route

__src/app/restaurant/detail/detail.component.ts__

We need to get the slug from the route to determine which restaurant to fetch. We import `ActivatedRoute` into our component, and call `this.route.snapshot.paramMap.get('slug')` to get the slug. 

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
  }

}
```

## Adding getRestaurant method to serivce

We need to add one more method to our restaurant service to get a specific restaurant.

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
