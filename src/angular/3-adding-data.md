@page angular/adding-data Adding Data
@parent angular 2

@description Adding Data

@body 


## Building our Restaurants List

We've done some work to create a Place My Order API for use in this app.

```bash
npm install place-my-order-api@1 --save
```

Next make add an api script to your ``package.json``

```json
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "api": "place-my-order-api --port 7070"
  }
```
Double check the api is working by running ``npm run api`` and navigating to <a href="http://localhost:7070/restaurants" target="_blank">localhost:7070/restaurants</a>. You should see a JSON list of restaurant data.


Finally, we'll create a proxy file at the root of our Angular project to access our API for local development purposes. 

```bash
touch proxy.conf.json
```

```json
{
  "/api": {
    "target": "http://localhost:7070",
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "logLevel": "debug",
    "changeOrigin": true
  }
}
```

The next time we serve our app, we'll run it with the proxy config ``ng serve --proxy-config proxy.conf.json``

For making HTTP requests to interact with an API, Angular provides a HttpClient Module. To use it we'll need to import it in the root module of our app and include it the imports array.

```typescript
// src/app/app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    HomeComponent
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

Let's start by creating an interface to tell Typescript what we expect a restaurant object to look like:

```bash
touch src/app/restaurant/restaurant.ts
```

```typescript
interface Item {
    name: string;
    price: number;
}

interface Menu {
  lunch: Array<Item>;
  dinner: Array<Item>;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface Images {
  thumbnail: string;
  owner: string;
  banner: string;
}

export class Restaurant {
  name: string;
  slug: string;
  images: Images;
  menu: Menu;
  address: Address;
  _id: string;
}
```

Now that we have our interface defined, we'll create a Service to handle getting our restaurant data. Services are classes with narrow purposes that don't typically involve view-related functionality.

```bash
ng g service restaurant/restaurant
```

In our newly created service file, we'll need to import HttpClient, and Observable from RxJS. 

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Restaurant } from './restaurant';

export interface Config {
  data: Restaurant[];
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient: HttpClient) { }

  getRestaurants() {
    return this.httpClient.get<Config>('/api/restaurants');
  }
}
```

We'll then import our new service into our restaurant component.

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

You should now see a list of restaurants when you navigate to <a href="http://localhost:4200/restaurants" target="_blank">localhost:4200/restaurants</a>! You may have noticed in our markup there's another use of routerLink

```html
<a class="btn" [routerLink]="['/restaurants', restaurant.slug]">
  Details
</a>
```
<!-- 
We'll now build out the view for an individual restaurant. Let's start with creating a component for our restaurant detail view.

```bash
ng g component restaurant/detail
``` -->