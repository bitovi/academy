import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { RestaurantService, ResponseData, City, State } from './restaurant.service';
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

  public states: Data<State> = {
    value: [],
    isPending: true
  }

  public cities: Data<City> = {
    value: [],
    isPending: true
  }

  private subscription: Subscription;

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
    ) {
  }

  ngOnInit() {
    this.createForm();

    this.restaurantService.getStates().subscribe((res: ResponseData<State>) => {
      this.states.value = res.data;
      this.states.isPending = false;
      this.form.get('state').enable();
    });

    this.restaurantService.getCities("IL").subscribe((res: ResponseData<City>) => {
      this.cities.value = res.data;
      this.cities.isPending = false;
      this.form.get('city').enable();
    });

    this.restaurantService.getRestaurants("IL","Chicago").subscribe((res: ResponseData<Restaurant>) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
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
