@page angular/updating-service-params Updating Restaurant Service to use params
@parent angular 10

@description Updating Restaurant Service to use params

@body 

## Overview

In this part, we will:

- Create subscription to form changes
- Use onDestroy to unsubscribe from form changes

__src/app/restaurant/restaurant.component.ts__

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

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
export class RestaurantComponent implements OnInit, OnDestroy {
  form: FormGroup;

  public restaurants: Data<Restaurant> = {
    value: [],
    isPending: false
  }
  private subscription: Subscription;


  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
    ) {
  }

  ngOnInit() {
    this.createForm();
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.form = this.fb.group({
      state: {value: '', disabled: true},
      city: {value: '', disabled: true},
    });

    this.onChanges();
  }

  onChanges(): void {
    const stateChanges = this.form.get('state').valueChanges.subscribe(val => {
      console.log('state', val);
    });
    this.subscription = stateChanges;


    const cityChanges = this.form.get('city').valueChanges.subscribe(val => {
      console.log('city', val);
    });
    this.subscription.add(cityChanges);

  }
}
```

##PASTING THIS HERE FOR NOW

Next, We want our list of states available initially for the user to interact with, so we'll add the call to our `RestaurantService getStates` method in our `RestaurantComponent`. Let's also move the call to get restaurants into it's own function to call when we're ready. 

__src/app/restaurant/restaurant.component.ts__

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
