@page angular/state-city-options Creating city & state options for filtering restaurants
@parent angular 8

@description Creating city & state options for filtering restaurants

@body 

## Overview

In this part, we will:

- Import ReactiveFormsModule into our root app
- Create a reactive form in our Restaurant Component
- Create a form in our markup and connect inputs to reactive form

## Importing a New Module

We need to import reactiveForms in our root app module.

__src/app/app.module.ts__

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

## Creating Reactive Forms

We're going to use select boxes to handle our user's input. Angular's Reactive Forms API provides a clean way to get data from user input and do work based on it. We create a basic form in our `RestaurantComponent` by importing the API and creating a new form:

__src/app/restaurant/restaurant.component.ts__


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
  }

}
```

## Updating markup

Update the ``restaurant.component.html`` file to be:

__src/app/restaurant/restaurant.component.html__


```html
<div class="restaurants">
  <h2 class="page-header">Restaurants</h2>
  <form class="form" [formGroup]="form">
    <div class="form-group">
      <label>State</label>
      <select class="formControl" formControlName="state">
        <option value="" *ngIf="states.isPending">Loading...</option>
        <ng-container *ngIf="!states.isPending">
          <option value="">Choose a state</option>
          <option *ngFor="let state of states.value" value="{{state?.short}}"> {{state?.name}}</option>
        </ng-container>
      </select>
    </div>
    <div class="form-group">
      <label>City</label>
      <select class="formControl" formControlName="city">
        <option value="" *ngIf="cities.isPending">Loading...</option>
        <ng-container *ngIf="!cities.isPending">
          <option value="">Choose a city</option>
          <option *ngFor="let city of cities.value" value="{{city.name}}"> {{city.name}}</option>
        </ng-container>
      </select>
    </div>
  </form>

  <div class="restaurant loading" *ngIf="restaurants.isPending"></div>
  <ng-container *ngIf="restaurants.value.length">
    <div class="restaurant" *ngFor="let restaurant of restaurants.value">

      <img src="{{restaurant.images.thumbnail | imageUrl}}" width="100" height="100">
      <h3>{{restaurant.name}}</h3>

      <div class="address" *ngIf="restaurant.address">
        {{restaurant.address.street}}<br />{{restaurant.address.city}}, {{restaurant.address.state}} {{restaurant.address.zip}}
      </div>

      <div class="hours-price">
        $$$<br />
        Hours: M-F 10am-11pm
        <span class="open-now">Open Now</span>
      </div>

      <a class="btn" [routerLink]="['/restaurants', restaurant.slug]">
        Details
      </a>
      <br />
    </div>
  </ng-container>
</div>
```