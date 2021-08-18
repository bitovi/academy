import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

import { RestaurantService, ResponseData, State, City } from './restaurant.service';
import { Restaurant } from './restaurant';

export interface Data<T> {
  value: T[];
  isPending: boolean;
}

@Component({
  selector: 'pmo-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.less']
})
export class RestaurantComponent implements OnInit, OnDestroy {
  form: FormGroup;

  restaurants: Data<Restaurant> = {
    value: [],
    isPending: false
  }

   states: Data<State> = {
    isPending: false,
    value: []
  };

  cities: Data<City> = {
    isPending: false,
    value: []
  };

  private unSubscribe = new Subject<void>();

  constructor(
    private restaurantService: RestaurantService,
    private fb: FormBuilder
    ) {
  }

  ngOnInit() {
    this.createForm();

    this.getStates();
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
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
    this.form.get('state').pipe(takeUntil(this.unSubscribe)).valueChanges.subscribe(val => {
      this.restaurants.value = [];
      if (val) {
        //only enable city if state has value
        this.form.get('city').enable({
          onlySelf: true,
          emitEvent: false
        });
        //if state has a value and has changed, clear previous city value
        if (state != val) {
          this.form.get('city').patchValue('');
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
      }
    });
    this.subscription = stateChanges;


    const cityChanges = this.form.get('city').valueChanges.subscribe(val => {
      if(val) {
        this.getRestaurants();
      }
    });
    this.subscription.add(cityChanges);
  }

  getStates() {
    this.restaurantService.getStates().subscribe((res: ResponseData<State>) => {
      this.states.value = res.data;
      this.states.isPending = false;
      this.form.get('state').enable();
    });
  }

  getCities(state:string) {
    this.cities.isPending = true;
    this.restaurantService.getCities(state).subscribe((res: ResponseData<City>) => {
      this.cities.value = res.data;
      this.cities.isPending = false;
      this.form.get('city').enable({
        onlySelf: true,
        emitEvent: false
      });
    });
  }

  getRestaurants() {
    this.restaurantService.getRestaurants().subscribe((res: ResponseData<Restaurant>) => {
      this.restaurants.value = res.data;
      this.restaurants.isPending = false;
    });
  }
}