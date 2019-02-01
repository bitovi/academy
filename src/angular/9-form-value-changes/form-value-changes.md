@page angular/form-value-changes Listening to Form Value Changes
@parent angular 9

@description Listening to Form Value Changes

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