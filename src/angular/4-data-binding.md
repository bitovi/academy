@page angular-setup Data Binding
@parent angular 1

@description Data Binding

@body

## Data Binding

Let's empower our user to be able to select restaurants based on their city. There will be a dropdown to allow a user to pick their state, and a second dropdown populated by cities in those state. 

![Place My Order App city state picker](../static/img/restaurant-list.png "Place My Order App city state picker")

We can start by adding two new methods to our ``RestaurantService``. 

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
  
  getStates() {
    return this.httpClient.get<Config<State>>('/api/states');
  }

  getCities(state:string) {
    const options = { params: new HttpParams().set('state', state)};
    return this.httpClient.get<Config<City>>('/api/cities', options);
  }

  getRestaurants(state:string, city: string) {
    let options = { params: new HttpParams().set('filter[address.state]', state).set('filter[address.city]', city) };
    return this.httpClient.get<Config<Restaurant>>('/api/restaurants', options);
  }

  getRestaurant(slug: string) {
    return this.httpClient.get<Restaurant>('/api/restaurants/' + slug + '?');
  }
}
```

We're going to use select boxes to handle our user's input. Angular's Reactive Forms API provides a clean way to get data from user input and do work based on it. We create a basic form in our `RestaurantComponent` by importing the API and creating a new form, and listening to changes on the inputs:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { RestaurantService, Config, City, State } from './restaurant.service';
import { Restaurant } from './restaurant';

export interface Data<T> {
  value: Array<T>;
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit {
  form: FormGroup;

  public restaurants: Data<Restaurant> = {
    value: [],
    isPending: false
  }

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
    ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      state: {value: '', disabled: true},
      city: {value: '', disabled: true},
    });

    this.onChanges();
  }

  onChanges(): void {
    this.form.get('state').valueChanges.subscribe(val => {
      console.log('state', val);
    });

    this.form.get('city').valueChanges.subscribe(val => {
      console.log('city', val);
    });
  }
}
```

We also need to import reactiveForms in our root app module.

```typescript
import { ReactiveFormsModule } from '@angular/forms';

...
@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Next, We want our list of states available initially for the user to interact with, so we'll add the call to our `RestaurantService getStates` method in our `RestaurantComponent`. Let's also move the call to get restaurants into it's own function to call when we're ready. 

```typescript
import { Component, OnInit } from '@angular/core';
import { RestaurantService, Config } from './restaurant.service';
import { Restaurant } from './restaurant';


export interface Data<T> {
  value: Array<T>;
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit {
  public restaurants: Data<Restaurant> = {
    value: [],
    isPending: false
  }

   public states: Data<State> = {
    value: [],
    isPending: true
  }
  config: Config;
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.createForm();
    this.states.isPending = true;
    this.restaurantService.getStates().subscribe((res: Config<State>) => {
      this.states.value = res.data;
      this.states.isPending = false;
    });
  }

  createForm() {
    this.form = this.fb.group({
      state: {value: '', disabled: true},
      city: {value: '', disabled: true},
    });

    this.onChanges();
  }

  onChanges(): void {
    this.form.get('state').valueChanges.subscribe(val => {
      console.log('state', val);
    });

    this.form.get('city').valueChanges.subscribe(val => {
      console.log('city', val);
    });
  }

  getRestaurants() {
    this.restaurants.isPending = true;
    this.restaurantService.getRestaurants().subscribe((res: Config) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
  }

}
```