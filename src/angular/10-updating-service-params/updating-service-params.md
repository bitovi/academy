@page angular/updating-service-params Updating Restaurant Service to use params
@parent angular 10

@description Updating Restaurant Service to use params

@body

## Overview

In this part, we will:

- Update getRestaurants service method to take params
- Add service methods to get states and cities
- Add call to get states on component init
- Refactor getting restaurants into own function
- Make calls to get cities and restaurants on input change events

## Changing http call to use params

Import HttpParams, add state and city params to getRestaurants method. Add new methods to get states, and cities(with a state param)

__src/app/restaurant/restaurant.service.ts__

@sourceref ./1-restaurant.service.ts

### Add getStates and getCities methods

__src/app/restaurant/restaurant.service.ts__

@sourceref ./2-restaurant.service.ts

__src/app/restaurant/restaurant.component.ts__

@sourceref ./3-restaurant.component.ts
@highlight 5, 26-34,47-57,66-67

## Updating Component to add new service methods

Next, We want our list of states available initially for the user to interact with, so we'll add the call to our `RestaurantService getStates` method in our `RestaurantComponent`. Let's also move the call to get restaurants into it's own function to call when we're ready.

__src/app/restaurant/restaurant.component.ts__

```typescript
import { Component, OnInit } from '@angular/core';
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
  public restaurants: Data<Restaurant> = {
    value: [],
    isPending: false
  }

  public states: Data<State> = {
    value: [],
    isPending: true
  }

  public cities: Data<City> = {
    value: [],
    isPending: true
  }
  config: Config;
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.createForm();
    this.states.isPending = true;
    this.restaurantService.getStates().subscribe((res: Config<State>) => { //HIGHLIGHT THIS LINE
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

  getRestaurants() { //HIGHLIGHT THIS LINE
    this.restaurants.isPending = true;
    this.restaurantService.getRestaurants().subscribe((res: Config) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
  }
}
```

## Make calls for cities and restaurants when inputs change

__src/app/restaurant/restaurant.component.ts__

```typescript
import { Component, OnInit } from '@angular/core';
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
  public restaurants: Data<Restaurant> = {
    value: [],
    isPending: false
  }

  public states: Data<State> = {
    value: [],
    isPending: true
  }

  public cities: Data<City> = {
    value: [],
    isPending: true
  }
  config: Config;
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
    this.createForm();
    this.states.isPending = true;
    this.restaurantService.getStates().subscribe((res: Config<State>) => { //HIGHLIGHT THIS LINE
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
    let state:string;
    this.form.get('state').valueChanges.subscribe(val => {
      if (val) {
        //only enable city if state has value
        this.form.get('city').enable({
          onlySelf: true,
          emitEvent: false
        });
        //if state has a value and has changed, clear previous city value
        if (state != val) {
          this.form.get('city').patchValue('');
          this.restaurants.value = [];
        }
        //fetch cities based on state val
        this.getCities(val);
        state = val;
      }
      else {
        //disable city if no value
        this.form.get('city').disable({
          onlySelf: true,
          emitEvent: false
        });
        state = '';
        //clear restaurant list
        this.restaurants.value = [];
      }
    });

    this.form.get('city').valueChanges.subscribe(val => {
      if (val) {
        //make new call to get restaurants with state and city
        this.getRestaurants(state, val);
      }
    });
  }

  getCities(state:string) {
    this.cities.isPending = true;
    this.restaurantService.getCities(state).subscribe((res: Config<City>) => {
      this.cities.value = res.data;
      this.cities.isPending = false;
      this.form.get('city').enable({
        onlySelf: true,
        emitEvent: false
      });
    });
  }

  getRestaurants(state: string, city: string) { //HIGHLIGHT THIS LINE
    this.restaurants.isPending = true;
    this.restaurantService.getRestaurants().subscribe((res: Config) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
  }
}
```
